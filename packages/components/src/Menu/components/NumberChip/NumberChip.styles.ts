import { styled, Chip } from '@mui/material';

// ==================== 类型定义 Type Definitions ====================

export type NumberChipColor = "default" | "primary" | "success";

export interface NumberChipProps {
  /** 显示的数字 Number to display */
  number: number;
  /** 颜色主题 Color theme */
  color?: NumberChipColor;
}

// ==================== 样式组件 Styled Components ====================

/**
 * 数字芯片样式组件
 * Number chip styled component
 */
export const StyledNumberChip = styled(Chip)<{ chipColor: NumberChipColor }>(({ theme, chipColor }) => {
  const chipColors = {
    default: { backgroundColor: "#F5F5F5", color: "#757575" },
    primary: { backgroundColor: "#E3F2FD", color: "#1976D2" },
    success: { backgroundColor: "#E8F5E8", color: "#2E7D32" },
  };

  return {
    height: 20,
    fontSize: "11px",
    fontWeight: 500,
    ...chipColors[chipColor],
    "& .MuiChip-label": {
      padding: "0 6px",
    },
  };
});