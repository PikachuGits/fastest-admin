// typography-utils.ts

// 默认字体族
const systemFontStack = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

/**
 * 设置字体族，自动追加系统字体栈
 * @param fontFamily - 主要字体族名，例如 "DM Sans"
 * @returns 完整的字体族字符串
 */
export function setFont(fontFamily?: string): string {
  return fontFamily ? `"${fontFamily}", ${systemFontStack}` : systemFontStack;
}

/**
 * 将 rem 单位（如 1.25）转换为 px 值（如 20）
 * @param rem - rem 值（如 "1.25"）
 * @returns 像素值（如 20）
 */
export function remToPx(rem: string): number {
  const parsed = parseFloat(rem);
  return Math.round(parsed * 16);
}

/**
 * 将像素值转换为 rem 字符串（如 20 -> "1.25rem"）
 * @param px - 像素值（必须为有效数字）
 * @returns rem 字符串（如 "1.25rem"）
 */
export function pxToRem(px: number): string {
  if (typeof px !== 'number' || isNaN(px)) {
    throw new Error(`Invalid pixel value: ${px}`);
  }
  return `${px / 16}rem`;
}
