// ScalableText.tsx
import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

// 定义组件的 Props 类型
interface ScalableTextProps {
  /**
   * The text content to display.
   */
  children: React.ReactNode;
  /**
   * The scaling factor. 1 is normal size, <1 is smaller, >1 is larger.
   * @default 1
   */
  scale?: number;
  /**
   * The width of the component's visible area.
   * @default '300px'
   */
  width?: string | number;
  /**
   * The height of the component's visible area.
   * @default '60px'
   */
  height?: string | number;
  /**
   * The sx prop for custom styling of the outer container.
   */
  sx?: SxProps<Theme>;
  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign?: "center" | "left" | "right";
}

/**
 * A component that displays text centered, allows scaling,
 * and shows an ellipsis for overflow. When scaled down, it
 * can reveal more text content.
 */
export const ScalableText: React.FC<ScalableTextProps> = ({
  children,
  scale = 1,
  width = "100%",
  height = "100%",
  textAlign = "center",
  sx,
}) => {
  // 确保 width 是一个有效的 CSS 值字符串
  const containerWidth = typeof width === "number" ? `${width}px` : width;

  // 用于获取容器实际宽度的 ref
  const clipperRef = useRef<HTMLDivElement>(null);

  // 存储容器实际像素宽度
  const [actualWidth, setActualWidth] = useState<number | null>(null);

  // 获取容器实际宽度
  useEffect(() => {
    const updateWidth = () => {
      if (clipperRef.current) {
        const rect = clipperRef.current.getBoundingClientRect();
        setActualWidth(rect.width);
      }
    };

    // 初始获取宽度
    updateWidth();

    // 监听窗口大小变化
    const handleResize = () => {
      updateWidth();
    };

    window.addEventListener("resize", handleResize);

    // 使用 ResizeObserver 监听容器自身大小变化（如果支持的话）
    let resizeObserver: ResizeObserver | null = null;
    if (window.ResizeObserver && clipperRef.current) {
      resizeObserver = new ResizeObserver(updateWidth);
      resizeObserver.observe(clipperRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [containerWidth]); // 当 containerWidth 改变时重新计算

  return (
    // 1. 外部容器 (Clipper Box)
    // 职责：定义视窗大小、裁剪溢出内容、并使用 Flexbox 将内部元素居中。
    <Box
      ref={clipperRef}
      className="scalable-text-clipper"
      sx={{
        width: containerWidth,
        height,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx, // 应用外部传入的自定义样式
      }}
    >
      {/* 2. 缩放层 (Scale Wrapper) */}
      {/* 职责：只负责应用 transform: scale 变换。 */}
      <Box
        className="scalable-text-scaler"
        sx={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.3s ease", // 平滑过渡效果
        }}
      >
        {/* 3. 内容层 (Text Content) */}
        {/* 职责：宽度进行“逆向补偿”计算，并实现文本溢出省略。 */}
        <Box
          className="scalable-text-content"
          sx={{
            // 核心原理：宽度进行逆向补偿
            // 当 scale=0.5, width 扩大2倍; 当 scale=2, width 缩小一半。
            // 这样缩放后，视觉宽度总是等于外部容器宽度。
            width: actualWidth
              ? `${actualWidth / scale}px` // 使用实际像素宽度进行计算
              : `calc(${containerWidth} / ${scale})`, // 降级方案
            // textAlign: "center",
            textAlign,
            // 省略号三件套
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
