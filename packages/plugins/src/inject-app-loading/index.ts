import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { join, resolve, isAbsolute, dirname } from 'node:path';
import type { Plugin, UserConfig } from 'vite';
import { fileURLToPath } from 'node:url';

// 辅助函数：读取 package.json
async function readPackageJSON(cwd: string): Promise<{ version: string }> {
  try {
    const pkgPath = resolve(cwd, 'package.json');
    const pkgContent = await fsp.readFile(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgContent);
    return { version: pkg.version || 'unknown' };
  } catch (error) {
    console.warn('[vite-plugin-app-loading] Failed to read package.json:', error);
    return { version: 'unknown' };
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fallbackDefaultTemplatePath = join(__dirname, 'default-loading.html');

/**
 * 替换模板变量，如 <%= LOADING_APP_TITLE %>
 */
function replaceTemplateVars(template: string, vars: Record<string, string>): string {
  return template.replace(/<%=\s*(\w+)\s*%>/g, (_, key) => vars[key] ?? '');
}

/**
 * 加载 loading HTML 模板
 * 默认获取 default-loading.html，如果配置了自定义模板就加载配置的模板
 */
async function getLoadingRawByHtmlTemplate(
  userTemplate?: string,
  customDefaultTemplatePath?: string,
): Promise<string | undefined> {
  // 1. 如果用户配置了自定义模板，优先使用自定义模板
  if (userTemplate) {
    const templatePathToTry = isAbsolute(userTemplate)
      ? userTemplate
      : resolve(process.cwd(), userTemplate); // 在 Node.js 环境中解析

    if (fs.existsSync(templatePathToTry)) {
      console.log(`[vite-plugin-app-loading] 使用配置的自定义模板: ${templatePathToTry}`);
      return await fsp.readFile(templatePathToTry, 'utf-8');
    } else {
      console.warn(`[vite-plugin-app-loading] 配置的自定义模板未找到: ${templatePathToTry}，将使用默认模板。`);
    }
  }

  // 2. 使用默认模板（插件内置的 default-loading.html）
  const effectiveFallbackPath = customDefaultTemplatePath || fallbackDefaultTemplatePath;

  if (fs.existsSync(effectiveFallbackPath)) {
    console.log(`[vite-plugin-app-loading] 使用默认模板: ${effectiveFallbackPath}`);
    return await fsp.readFile(effectiveFallbackPath, 'utf-8');
  }

  // 3. 都没找到
  console.error('[vite-plugin-app-loading] 未找到任何可用的 loading.html 模板文件。');
  return undefined;
}

/**
 * 插件参数类型
 */
export interface ThemeColors {
  primary?: string;
  light?: string;
  dark?: string;
}

/**
 * 插件参数类型
 */
export interface PluginOptions {
  /** 可选：自定义模板路径，相对 process.cwd() 或绝对路径 */
  loadingTemplate?: string;
  /** 可选：默认模板绝对路径（覆盖插件目录中的 default-loading.html） */
  defaultTemplatePath?: string;
  /** 可选：HTML 中的标题变量 <%= LOADING_APP_TITLE %> 替换值 */
  title?: string;

  desc?: string;
  /** 可选：Vite 环境变量对象，用于获取 VITE_APP_NAMESPACE */
  env?: Record<string, any>;
  /** 可选：自定义主题色 */
  themeColors?: ThemeColors;
}

/**
 * 插件工厂
 */
export function vitePluginAppLoading(options: PluginOptions = {}): Plugin {
  let loadingHtmlContent: string | undefined;
  let appNamespace: string = options.env?.VITE_APP_NAMESPACE ?? 'app';

  return {
    name: 'vite-plugin-app-loading',

    // buildStart 钩子用于加载模板内容和预处理主题脚本
    async buildStart(opts) {
      try {
        const title = options.title ?? process.env.LOADING_APP_TITLE ?? 'Loading...';
        const desc = options.desc ?? process.env.LOADING_APP_TITLE_DESC ?? '';
        const rawTemplate = await getLoadingRawByHtmlTemplate(
          options.loadingTemplate,
          options.defaultTemplatePath,
        );
        if (rawTemplate) {
          const themeColors = options.themeColors ?? {};

          // 预处理主题脚本，避免在 transformIndexHtml 中进行异步操作
          const isBuild = process.env.NODE_ENV === 'production';
          const { version } = await readPackageJSON(process.cwd());
          const envRaw = isBuild ? 'prod' : 'dev';
          const cacheNameKey = `'${appNamespace}-${version}-${envRaw}-preferences-theme'`;

          const themeScript = `
          <script data-app-loading="theme-injector">
            try {
              var theme = localStorage.getItem(${cacheNameKey});
              if (theme && /dark/.test(theme)) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              console.warn('[vite-plugin-app-loading] Failed to apply theme:', e);
            }
          </script>
        `;

          const replacedTemplate = replaceTemplateVars(rawTemplate, {
            LOADING_APP_TITLE: title,
            LOADING_APP_TITLE_DESC: desc
          });

          // 将主题脚本、样式和模板内容组合在一起
          loadingHtmlContent = themeScript + replacedTemplate;
        } else {
          loadingHtmlContent = undefined;
        }
      } catch (err) {
        console.error('[vite-plugin-app-loading] 插件初始化失败:', err);
        loadingHtmlContent = undefined;
      }
    },

    // transformIndexHtml 钩子用于注入预处理好的内容
    transformIndexHtml(html: string): string {
      if (!loadingHtmlContent) {
        return html;
      }

      const insertBefore = '</body>';
      if (html.includes(insertBefore)) {
        return html.replace(insertBefore, `${loadingHtmlContent}${insertBefore}`);
      } else {
        console.warn('[vite-plugin-app-loading] HTML 中未找到 </body>，将直接追加内容');
        return html + loadingHtmlContent;
      }
    },
  };
}