import type { Plugin, ResolvedConfig } from 'vite';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { join, resolve, isAbsolute, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fallbackDefaultTemplatePath = join(__dirname, 'default-loading.html');

export interface ThemeColors {
  primary?: string;
  light?: string;
  dark?: string;
}

export interface PluginOptions {
  loadingTemplate?: string;
  defaultTemplatePath?: string;
  title?: string;
  desc?: string;
  env?: Record<string, any>;
  themeColors?: ThemeColors;
}

/** 读取 package.json 的 version（健壮） */
async function readPackageVersion(cwd: string): Promise<string> {
  try {
    const pkgPath = resolve(cwd, 'package.json');
    const pkgContent = await fsp.readFile(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgContent);
    return pkg.version ?? 'unknown';
  } catch (e) {
    return 'unknown';
  }
}

function replaceTemplateVars(template: string, vars: Record<string, string>): string {
  return template.replace(/<%=\s*(\w+)\s*%>/g, (_, key) => vars[key] ?? '');
}

async function loadTemplate(userTemplate?: string, customDefaultTemplatePath?: string, root = process.cwd()): Promise<string | undefined> {
  if (userTemplate) {
    const tryPath = isAbsolute(userTemplate) ? userTemplate : resolve(root, userTemplate);
    if (fs.existsSync(tryPath)) {
      return await fsp.readFile(tryPath, 'utf-8');
    } else {
      // fallback to default
    }
  }

  const effective = customDefaultTemplatePath ?? fallbackDefaultTemplatePath;
  if (fs.existsSync(effective)) {
    return await fsp.readFile(effective, 'utf-8');
  }

  return undefined;
}

/**
 * 插件工厂（推荐用法：import { vitePluginAppLoading } from '...'）
 */
export default function vitePluginAppLoading(options: PluginOptions = {}): Plugin {
  let loadingHtmlContent: string | undefined;
  let configResolved: ResolvedConfig | null = null;
  const appNamespace = options.env?.VITE_APP_NAMESPACE ?? 'app';

  return {
    name: 'vite-plugin-app-loading',
    enforce: 'pre',

    configResolved(config) {
      configResolved = config;
    },

    async buildStart() {
      try {
        const root = configResolved?.root ?? process.cwd();
        const mode = configResolved?.mode ?? process.env.NODE_ENV ?? 'development';
        const title = options.title ?? process.env.LOADING_APP_TITLE ?? 'Loading...';
        const desc = options.desc ?? process.env.LOADING_APP_TITLE_DESC ?? '';
        const rawTemplate = await loadTemplate(options.loadingTemplate, options.defaultTemplatePath, root);

        if (!rawTemplate) {
          // 若没有模板，保持 undefined（不注入）
          console.warn('[vite-plugin-app-loading] 未找到 loading 模板，跳过注入。');
          loadingHtmlContent = undefined;
          return;
        }

        const version = await readPackageVersion(root);
        const envRaw = mode === 'production' ? 'prod' : 'dev';
        const cacheNameKey = `${appNamespace}-${version}-${envRaw}-preferences-theme`;

        const themeColors = options.themeColors ?? {};
        const themeStyle = `<style id="app-loading-theme-colors">
                              :root {
                                --palette-primary-main: ${themeColors.primary ?? '#2196f3'};
                                --palette-primary-light: ${themeColors.light ?? '#64b5f6'};
                                --palette-primary-dark: ${themeColors.dark ?? '#1976d2'};
                              }
                              </style>
                              `;

        const themeScript = `<script data-app-loading="theme-injector">
                              try {
                                var theme = localStorage.getItem('${cacheNameKey}');
                                if (theme && /dark/.test(theme)) {
                                  document.documentElement.classList.add('dark');
                                } else {
                                  document.documentElement.classList.remove('dark');
                                }
                              } catch (e) {
                                console.warn('[vite-plugin-app-loading] Failed to apply theme:', e);
                              }
                            </script>`;

        const replaced = replaceTemplateVars(rawTemplate, {
          LOADING_APP_TITLE: title,
          LOADING_APP_TITLE_DESC: desc
        });

        // 将最终注入内容组合好（注意：已在 buildStart 完成）
        loadingHtmlContent = themeScript + themeStyle + replaced;
      } catch (err) {
        console.error('[vite-plugin-app-loading] 初始化失败:', err);
        loadingHtmlContent = undefined;
      }
    },

    // transformIndexHtml 支持返回 string 或 Promise<string>，这里直接同步返回准备好的内容
    transformIndexHtml(html: string): string {
      if (!loadingHtmlContent) return html;

      const insertBefore = '</body>';
      if (html.includes(insertBefore)) {
        return html.replace(insertBefore, `${loadingHtmlContent}${insertBefore}`);
      } else {
        return html + loadingHtmlContent;
      }
    },
  };
}