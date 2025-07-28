import React from 'react';
import {
  StyledNumberChip,
  type NumberChipProps,
  type NumberChipColor,
} from './NumberChip.styles';

// ==================== 主组件 Main Component ====================

/**
 * 数字芯片组件
 * Number chip component
 * 
 * 用于显示数字标识的小型芯片组件
 * A small chip component for displaying numeric identifiers
 */
export const NumberChip = ({ number, color = "default" }: NumberChipProps) => {
  return (
    <StyledNumberChip
      label={`+${number}`}
      size="small"
      chipColor={color}
    />
  );
};

// 导出类型
export type { NumberChipProps, NumberChipColor };
