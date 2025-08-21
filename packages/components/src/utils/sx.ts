import type { SxProps, Theme } from "@mui/material";

/**
 * 统一的 Sx 合并工具类型。
 * 与 MUI 的 `SxProps<Theme>` 保持一致，兼容对象、函数与数组形式。
 */
export type AnySx = SxProps<Theme>;

/**
 * 深度拍平 sx 片段数组，并过滤掉 false/null/undefined。
 * 仅拍平数组结构，不做对象深合并，交由 MUI 的 sx 合并策略处理。
 */
const flattenSx = (
  items: Array<AnySx | false | null | undefined>
): AnySx[] => {
  const result: AnySx[] = [];
  const walk = (value: AnySx | false | null | undefined) => {
    if (!value) return;
    if (Array.isArray(value)) {
      for (const v of value) walk(v as AnySx);
    } else {
      result.push(value);
    }
  };
  for (const item of items) walk(item);
  return result;
};

/**
 * 组合多个 sx 片段（对象/函数/数组），自动：
 * - 深度拍平嵌套数组
 * - 过滤掉 false/null/undefined（便于条件合并）
 * - 0/1 项时返回对象/函数本身，>=2 项时返回数组
 *
 * 合并优先级说明：MUI 对数组形式从左到右合并，右侧会覆盖左侧冲突字段。
 * 因此 `sxStyled(base, override)` 中的 `override` 将覆盖 `base` 的相同键。
 *
 * 用法示例：
 *   sx={sxStyled(base)}
 *   sx={sxStyled(base, cond && { opacity: 1 })}
 *   sx={sxStyled(base, [extra1, extra2], { color: 'red' })}
 */
export const sxStyled = (
  ...parts: Array<AnySx | false | null | undefined>
): AnySx => {
  const normalized = flattenSx(parts);
  if (normalized.length === 0) return {};
  if (normalized.length === 1) return normalized[0] as AnySx;
  return normalized as AnySx;
};

