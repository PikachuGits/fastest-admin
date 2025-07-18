import type { CommonColors } from '@mui/material/styles';

import type { ThemeCssVariables } from './types';
import type { PaletteColorNoChannels } from './core/palette';

// ----------------------------------------------------------------------

/**
 * 主题配置类型定义
 * 
 * 这个接口定义了整个应用主题系统的配置结构，包含了所有主题相关的设置项。
 * 通过 TypeScript 类型定义确保配置的类型安全性和一致性。
 * 
 * @interface ThemeConfig
 */
type ThemeConfig = {
  /** 
   * CSS 类名前缀
   * 
   * 用于避免样式冲突，所有生成的 CSS 类名都会添加此前缀
   */
  classesPrefix: string;

  /** 
   * CSS 变量配置
   * 
   * 定义 CSS 自定义属性的相关设置，支持动态主题切换
   */
  cssVariables: ThemeCssVariables;

  /** 
   * 字体家族配置
   * 
   * 定义应用中使用的主要和次要字体
   */
  fontFamily: Record<'primary' | 'secondary', string>;

  /** 
   * 布局配置
   * 
   * 定义应用的基础布局尺寸，包括头部、侧边栏、页脚等组件的尺寸
   */
  layout: {
    /** 头部导航栏高度 (px) */
    headerHeight: number;
    /** 侧边栏展开时的宽度 (px) */
    sidebarWidth: number;
    /** 侧边栏收起时的宽度 (px) */
    sidebarCollapsedWidth: number;
    /** 页脚高度 (px) */
    footerHeight: number;
    /** 内容区域的默认内边距 (px) */
    contentPadding: number;
  };

  /** 
   * 调色板配置
   * 
   * 定义应用的颜色系统，包括主色、辅助色、状态色等
   */
  palette: Record<'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error', PaletteColorNoChannels> & {
    /** 通用颜色 (黑白) */
    common: Pick<CommonColors, 'black' | 'white'>;
    /** 灰度色阶 */
    grey: Record<'50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900', string>;
  };
};

/**
 * 主题配置常量
 * 
 * 这个配置对象包含了应用的核心设计参数，用于保持整个应用的视觉一致性。
 * 所有的配置值都经过精心设计，符合现代 UI 设计规范。
 * 
 * @constant
 * @type {ThemeConfig}
 */
export const themeConfig: ThemeConfig = {
  /** **************************************
   * 基础配置
   * 
   * 定义主题系统的基础设置
   *************************************** */
  classesPrefix: 'fastest',

  /** **************************************
   * 字体配置
   * 
   * 定义应用中使用的字体家族
   * - primary: 主要字体，用于大部分文本内容
   * - secondary: 次要字体，用于特殊场景或强调
   *************************************** */
  fontFamily: {
    /** 
     * 主要字体 - DM Sans Variable
     * 
     * 现代化的无衬线字体，具有良好的可读性和多种字重支持
     */
    primary: 'DM Sans Variable',

    /** 
     * 次要字体 - Barlow
     * 
     * 简洁的几何字体，适合用于标题和强调文本
     */
    secondary: 'Barlow',
  },

  /** **************************************
   * 布局配置
   * 
   * 定义应用的基础布局尺寸，这些值会被用于：
   * - 计算内容区域的可用空间
   * - 设置组件的默认尺寸
   * - 响应式布局的断点计算
   * 
   * 支持应用层的布局需求，确保在不同屏幕尺寸下的一致性
   *************************************** */
  layout: {
    /**
     * 头部导航栏高度
     * 
     * 64px 是一个标准的头部高度，足够容纳导航元素
     * 同时不会占用过多的垂直空间
     */
    headerHeight: 64,

    /**
     * 侧边栏展开时的宽度
     * 
     * 280px 提供了足够的空间来显示导航菜单项，
     * 包括图标和文字标签
     */
    sidebarWidth: 280,

    /**
     * 侧边栏收起时的宽度
     * 
     * 64px 足够显示图标，同时保持最小的空间占用
     */
    sidebarCollapsedWidth: 64,

    /**
     * 页脚高度
     * 
     * 48px 适合显示版权信息、链接等页脚内容
     */
    footerHeight: 48,

    /**
     * 内容区域的默认内边距
     * 
     * 24px 提供了舒适的内容间距，既不会太拥挤也不会太稀疏
     */
    contentPadding: 24,
  },
  /** **************************************
   * 调色板配置
   * 
   * 定义应用的完整颜色系统，包括：
   * - 品牌色彩 (primary, secondary)
   * - 功能色彩 (info, success, warning, error)
   * - 中性色彩 (grey)
   * - 基础色彩 (black, white)
   * 
   * 每个颜色都包含完整的色阶，从最浅到最深，
   * 确保在不同场景下都有合适的颜色可用
   *************************************** */
  palette: {
    /**
     * 主色调 - 蓝色系
     * 
     * 代表品牌的主要颜色，用于主要按钮、链接等关键元素
     * 基于 Facebook 蓝色调整，具有良好的识别度和专业感
     */
    primary: {
      lighter: '#D0ECFE', // 最浅色调，用于背景和悬停状态
      light: '#73BAFB',   // 浅色调，用于次要元素
      main: '#1877F2',    // 主色调，品牌主色
      dark: '#0C44AE',    // 深色调，用于按下状态
      darker: '#042174',  // 最深色调，用于文本和边框
      contrastText: '#FFFFFF', // 对比文本颜色
    },
    /**
     * 辅助色 - 紫色系
     * 
     * 用于辅助元素、特殊功能按钮等，与主色形成良好的对比
     * 紫色代表创新和高端，适合科技产品
     */
    secondary: {
      lighter: '#EFD6FF', // 最浅紫色
      light: '#C684FF',   // 浅紫色
      main: '#8E33FF',    // 主紫色
      dark: '#5119B7',    // 深紫色
      darker: '#27097A',  // 最深紫色
      contrastText: '#FFFFFF', // 对比文本颜色
    },
    /**
     * 信息色 - 青色系
     * 
     * 用于信息提示、通知等，传达中性的信息内容
     * 青色给人清新、可信赖的感觉
     */
    info: {
      lighter: '#CAFDF5', // 最浅青色
      light: '#61F3F3',   // 浅青色
      main: '#00B8D9',    // 主青色
      dark: '#006C9C',    // 深青色
      darker: '#003768',  // 最深青色
      contrastText: '#FFFFFF', // 对比文本颜色
    },
    /**
     * 成功色 - 绿色系
     * 
     * 用于成功状态、确认操作等正面反馈
     * 绿色是通用的成功色，易于理解
     */
    success: {
      lighter: '#D3FCD2', // 最浅绿色
      light: '#77ED8B',   // 浅绿色
      main: '#22C55E',    // 主绿色
      dark: '#118D57',    // 深绿色
      darker: '#065E49',  // 最深绿色
      contrastText: '#ffffff', // 对比文本颜色
    },
    /**
     * 警告色 - 橙色系
     * 
     * 用于警告信息、需要注意的操作等
     * 橙色能够吸引注意力但不会过于激进
     */
    warning: {
      lighter: '#FFF5CC', // 最浅橙色
      light: '#FFD666',   // 浅橙色
      main: '#FFAB00',    // 主橙色
      dark: '#B76E00',    // 深橙色
      darker: '#7A4100',  // 最深橙色
      contrastText: '#1C252E', // 对比文本颜色（深色）
    },
    /**
     * 错误色 - 红色系
     * 
     * 用于错误状态、危险操作、删除确认等
     * 红色是通用的危险/错误色，具有强烈的警示作用
     */
    error: {
      lighter: '#FFE9D5', // 最浅红色
      light: '#FFAC82',   // 浅红色
      main: '#FF5630',    // 主红色
      dark: '#B71D18',    // 深红色
      darker: '#7A0916',  // 最深红色
      contrastText: '#FFFFFF', // 对比文本颜色
    },
    /**
     * 灰度色阶
     * 
     * 提供完整的灰度色彩系统，用于文本、边框、背景等
     * 从最浅的近白色到最深的近黑色，确保良好的层次感
     */
    grey: {
      '50': '#FCFDFD',   // 最浅灰 - 用于背景
      '100': '#F9FAFB',  // 极浅灰 - 用于卡片背景
      '200': '#F4F6F8',  // 浅灰 - 用于分割线
      '300': '#DFE3E8',  // 中浅灰 - 用于边框
      '400': '#C4CDD5',  // 中灰 - 用于禁用状态
      '500': '#919EAB',  // 标准灰 - 用于次要文本
      '600': '#637381',  // 中深灰 - 用于辅助文本
      '700': '#454F5B',  // 深灰 - 用于主要文本
      '800': '#1C252E',  // 极深灰 - 用于标题
      '900': '#141A21',  // 最深灰 - 用于重要文本
    },
    /**
     * 通用颜色
     * 
     * 基础的黑白色，用于最基本的颜色需求
     */
    common: {
      black: '#000000',  // 纯黑色
      white: '#FFFFFF'   // 纯白色
    },
  },
  /** **************************************
   * CSS 变量配置
   * 
   * 定义 CSS 自定义属性的相关设置，支持动态主题切换
   * 这些配置用于生成 CSS 变量，实现主题的动态切换功能
   *************************************** */
  cssVariables: {
    /**
     * CSS 变量前缀
     * 
     * 为空表示不添加前缀，所有 CSS 变量将直接使用 --variable-name 格式
     * 如果设置前缀，则会生成 --prefix-variable-name 格式
     */
    cssVarPrefix: '',

    /**
     * 颜色方案选择器
     * 
     * 用于区分不同主题模式（如亮色/暗色主题）的 HTML 属性
     * 通过 data-color-scheme 属性来切换不同的颜色方案
     */
    colorSchemeSelector: 'data-color-scheme',
  },
};
