/**
 * 主题系统迁移助手
 * Theme System Migration Helper
 * 
 * 提供从旧主题系统迁移到统一主题系统的工具函数
 * 
 * @module MigrationHelper
 * @version 1.0.0
 * @author Trae AI
 */

import type { Theme } from '@mui/material/styles';
import { designTokens, colorTokens, darkColorTokens } from './design-tokens';

// 临时定义 LayoutConfig 接口
interface LayoutConfig {
  headerHeight: number;
  sidebarWidth: number;
  contentPadding: number;
}

// ----------------------------------------------------------------------

/**
 * 旧主题配置接口
 * Legacy Theme Configuration Interface
 */
export interface LegacyThemeConfig {
  /** 主色 */
  primaryColor?: string;
  /** 辅助色 */
  secondaryColor?: string;
  /** 主题模式 */
  mode?: 'light' | 'dark';
  /** 字体配置 */
  typography?: {
    fontFamily?: string;
    fontSize?: number;
  };
  /** 间距配置 */
  spacing?: number;
  /** 自定义颜色 */
  customColors?: Record<string, string>;
}

/**
 * 迁移结果接口
 * Migration Result Interface
 */
export interface MigrationResult {
  /** 是否成功 */
  success: boolean;
  /** 转换后的主题覆盖配置 */
  themeOverrides?: Partial<Theme>;
  /** 建议的布局配置 */
  layoutConfig?: Partial<LayoutConfig>;
  /** 迁移警告 */
  warnings: string[];
  /** 迁移建议 */
  suggestions: string[];
}

// ----------------------------------------------------------------------

/**
 * 从旧主题配置迁移到新的统一主题系统
 * Migrate from legacy theme configuration to unified theme system
 * 
 * @param legacyConfig - 旧主题配置
 * @returns 迁移结果
 * 
 * @example
 * ```typescript
 * const legacyConfig = {
 *   primaryColor: '#1976d2',
 *   secondaryColor: '#dc004e',
 *   mode: 'light',
 *   typography: {
 *     fontFamily: 'Roboto',
 *     fontSize: 14,
 *   },
 * };
 * 
 * const result = migrateLegacyTheme(legacyConfig);
 * if (result.success) {
 *   // 使用 result.themeOverrides 配置新主题
 * }
 * ```
 */
export function migrateLegacyTheme(legacyConfig: LegacyThemeConfig): MigrationResult {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  try {
    const themeOverrides: Partial<Theme> = {};

    // 迁移颜色配置
    if (legacyConfig.primaryColor || legacyConfig.secondaryColor) {
      themeOverrides.palette = {} as any;

      if (legacyConfig.primaryColor && isValidColor(legacyConfig.primaryColor)) {
        (themeOverrides.palette as any).primary = {
          main: legacyConfig.primaryColor,
        };
        suggestions.push(`主色已迁移: ${legacyConfig.primaryColor}`);
      }

      if (legacyConfig.secondaryColor && isValidColor(legacyConfig.secondaryColor)) {
        (themeOverrides.palette as any).secondary = {
          main: legacyConfig.secondaryColor,
        };
        suggestions.push(`辅助色已迁移: ${legacyConfig.secondaryColor}`);
      }
    }

    // 迁移字体配置
    if (legacyConfig.typography) {
      themeOverrides.typography = {} as any;

      if (legacyConfig.typography.fontFamily) {
        (themeOverrides.typography as any).fontFamily = legacyConfig.typography.fontFamily;
        suggestions.push(`字体已迁移: ${legacyConfig.typography.fontFamily}`);
      }

      if (legacyConfig.typography.fontSize && legacyConfig.typography.fontSize > 0) {
        (themeOverrides.typography as any).fontSize = legacyConfig.typography.fontSize;
        suggestions.push(`字体大小已迁移: ${legacyConfig.typography.fontSize}px`);
      }
    }

    // 迁移间距配置
    if (legacyConfig.spacing && legacyConfig.spacing !== 8) {
      (themeOverrides as any).spacing = legacyConfig.spacing;
      warnings.push(`自定义间距值 ${legacyConfig.spacing}px 可能与设计令牌不兼容`);
      suggestions.push('建议使用标准的 8px 间距基准');
    }

    // 处理自定义颜色
    if (legacyConfig.customColors && Object.keys(legacyConfig.customColors).length > 0) {
      warnings.push('检测到自定义颜色配置，需要手动迁移到设计令牌系统');
      suggestions.push('请在 design-tokens.ts 中定义自定义颜色');
    }

    // 建议的布局配置
    const layoutConfig: Partial<LayoutConfig> = {
      headerHeight: 64,
      sidebarWidth: 280,
      contentPadding: 24,
    };

    return {
      success: true,
      themeOverrides,
      layoutConfig,
      warnings,
      suggestions,
    };
  } catch (error) {
    return {
      success: false,
      warnings: [`迁移失败: ${error instanceof Error ? error.message : '未知错误'}`],
      suggestions: ['请检查旧主题配置格式是否正确'],
    };
  }
}

// ----------------------------------------------------------------------

/**
 * 验证颜色值是否有效
 * Validate if color value is valid
 * 
 * @param color - 颜色值
 * @returns 是否有效
 */
export function isValidColor(color: string): boolean {
  // 简单的颜色格式验证
  const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^rgb\(|^rgba\(|^hsl\(|^hsla\(/;
  return colorRegex.test(color);
}

/**
 * 生成颜色调色板
 * Generate color palette from base color
 * 
 * @param baseColor - 基础颜色
 * @returns 调色板
 */
export function generateColorPalette(baseColor: string) {
  if (!isValidColor(baseColor)) {
    throw new Error(`无效的颜色值: ${baseColor}`);
  }

  // 这里可以集成颜色处理库来生成完整的调色板
  // 目前返回基础配置
  return {
    50: baseColor + '0D',   // 5% opacity
    100: baseColor + '1A',  // 10% opacity
    200: baseColor + '33',  // 20% opacity
    300: baseColor + '4D',  // 30% opacity
    400: baseColor + '66',  // 40% opacity
    500: baseColor,         // base color
    600: baseColor,         // slightly darker
    700: baseColor,         // darker
    800: baseColor,         // much darker
    900: baseColor,         // darkest
  };
}

// ----------------------------------------------------------------------

/**
 * 分析现有 CSS 变量并生成迁移建议
 * Analyze existing CSS variables and generate migration suggestions
 * 
 * @param cssText - CSS 文本内容
 * @returns 迁移建议
 */
export function analyzeCssVariables(cssText: string): {
  variables: Record<string, string>;
  suggestions: string[];
} {
  const variables: Record<string, string> = {};
  const suggestions: string[] = [];

  // 提取 CSS 变量
  const variableRegex = /--([\w-]+):\s*([^;]+);/g;
  let match;

  while ((match = variableRegex.exec(cssText)) !== null) {
    const [, name, value] = match;
    if (!name || !value) {
      continue;
    }
    variables[name] = value.trim();
  }

  // 分析变量并生成建议
  Object.entries(variables).forEach(([name, value]) => {
    if (name && value && typeof name === 'string' && typeof value === 'string') {
      if (name.includes('color') || name.includes('bg') || name.includes('text')) {
        suggestions.push(`颜色变量 --${name}: ${value} 可以迁移到设计令牌系统`);
      }

      if (name.includes('spacing') || name.includes('margin') || name.includes('padding')) {
        suggestions.push(`间距变量 --${name}: ${value} 可以使用统一的间距系统`);
      }

      if (name.includes('font') || name.includes('text')) {
        suggestions.push(`字体变量 --${name}: ${value} 可以迁移到字体令牌`);
      }

      if (name.includes('radius') || name.includes('border')) {
        suggestions.push(`边框变量 --${name}: ${value} 可以使用统一的边框令牌`);
      }
    }
  });

  return { variables, suggestions };
}

// ----------------------------------------------------------------------

/**
 * 生成迁移报告
 * Generate migration report
 * 
 * @param results - 迁移结果数组
 * @returns 格式化的迁移报告
 */
export function generateMigrationReport(results: MigrationResult[]): string {
  const totalMigrations = results.length;
  const successfulMigrations = results.filter(r => r.success).length;
  const totalWarnings = results.reduce((sum, r) => sum + r.warnings.length, 0);
  const totalSuggestions = results.reduce((sum, r) => sum + r.suggestions.length, 0);

  let report = `# 主题迁移报告\n\n`;
  report += `## 概览\n\n`;
  report += `- 总迁移数: ${totalMigrations}\n`;
  report += `- 成功迁移: ${successfulMigrations}\n`;
  report += `- 失败迁移: ${totalMigrations - successfulMigrations}\n`;
  report += `- 警告数量: ${totalWarnings}\n`;
  report += `- 建议数量: ${totalSuggestions}\n\n`;

  if (totalWarnings > 0) {
    report += `## ⚠️ 警告\n\n`;
    results.forEach((result, index) => {
      if (result.warnings.length > 0) {
        report += `### 迁移 ${index + 1}\n\n`;
        result.warnings.forEach(warning => {
          report += `- ${warning}\n`;
        });
        report += `\n`;
      }
    });
  }

  if (totalSuggestions > 0) {
    report += `## 💡 建议\n\n`;
    results.forEach((result, index) => {
      if (result.suggestions.length > 0) {
        report += `### 迁移 ${index + 1}\n\n`;
        result.suggestions.forEach(suggestion => {
          report += `- ${suggestion}\n`;
        });
        report += `\n`;
      }
    });
  }

  report += `## 下一步\n\n`;
  report += `1. 检查并解决所有警告\n`;
  report += `2. 应用建议的配置更改\n`;
  report += `3. 测试主题在不同模式下的表现\n`;
  report += `4. 更新相关文档和代码注释\n`;

  return report;
}

// ----------------------------------------------------------------------

/**
 * 导出迁移助手工具
 */
export const migrationHelper = {
  migrateLegacyTheme,
  isValidColor,
  generateColorPalette,
  analyzeCssVariables,
  generateMigrationReport,
};

export default migrationHelper;