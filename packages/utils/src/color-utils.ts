// color-utils.ts

/**
 * 将十六进制颜色（如 #00B8D9）转换为 RGB 通道字符串（如 "0 184 217"）
 */
export function hexToRgbChannel(hex: string): string {
  if (!hex) throw new Error('Hex color is undefined!');
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
}

/**
 * 接收一个调色板对象，自动为每个颜色添加对应的 Channel 版本（如 primaryChannel）。
 * 保证每个 Channel 字段都有值（非 undefined）。
 */
export function createPaletteChannel<T extends Record<string, string>>(
  palette: T,
): T & {
  [K in keyof T as `${string & K}Channel`]: string;
} {
  const result: Record<string, string> = {};

  Object.entries(palette).forEach(([key, value]) => {
    if (!value) {
      throw new Error(`Missing value for palette key: "${key}"`);
    }

    result[`${key}Channel`] = hexToRgbChannel(value);
  });

  return {
    ...palette,
    ...result,
  } as T & {
    [K in keyof T as `${string & K}Channel`]: string;
  };
}

/**
 * 将 RGB 通道或 CSS 变量（如 var(--xxxChannel)）转为 rgba 颜色字符串
 */
export function varAlpha(color: string, opacity: number = 1): string {
  if (!color) throw new Error('[Alpha]: Color is undefined!');

  const isUnsupported = color.startsWith('#') || color.startsWith('rgb') || (!color.includes('var') && color.includes('Channel'));

  if (isUnsupported) {
    throw new Error(
      [
        `[Alpha]: Unsupported color format "${color}"`,
        'Supported formats are:',
        '- RGB channels: "0 184 217"',
        '- CSS variables with "Channel" suffix: "var(--palette-common-blackChannel, #000000)"',
        'Unsupported formats are:',
        '- Hex: "#00B8D9"',
        '- RGB: "rgb(0, 184, 217)"',
        '- RGBA: "rgba(0, 184, 217, 1)"',
      ].join('\n'),
    );
  }

  return `rgba(${color} / ${opacity})`;
}
