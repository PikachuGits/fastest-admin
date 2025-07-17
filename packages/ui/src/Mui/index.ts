// Typography 组件和相关导出
export { Typography, TypographyPresets } from "./Typography";
export type { 
  BaseTypographyProps,
  TitleProps, 
  ParagraphProps,
  TextProps,
  LinkProps 
} from "./Typography";

// 为了向后兼容，也提供一个别名
export { Typography as FastTypography } from "./Typography";