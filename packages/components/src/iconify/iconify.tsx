/**
 * Iconify 图标组件
 * 
 * 这是一个基于 @iconify/react 的封装组件，提供了以下核心功能：
 * 1. 类型安全：通过 TypeScript 确保只能使用已注册的图标
 * 2. 性能优化：自动注册图标集，避免在线加载导致的闪烁
 * 3. 样式集成：与 MUI 主题系统无缝集成
 * 4. 开发体验：提供清晰的警告信息和错误提示
 */

// ==================== 类型导入 Type Imports ====================
import type { IconProps } from "@iconify/react";
import type { IconifyName } from "./register-icons";

// ==================== 依赖导入 Dependencies ====================
import { Icon } from "@iconify/react";
import { useId } from "react";
import { classes_merge } from "@fastest/utils";
import { styled } from "@mui/material/styles";
import { iconifyClasses } from "./classes";
import { allIconNames, registerIcons } from "./register-icons";


// ==================== 样式组件 Styled Components ====================

/**
 * 样式化的图标根组件
 * 
 * 设计说明：
 * - 基于 @iconify/react 的 Icon 组件进行样式扩展
 * - 使用 MUI 的 styled 系统，确保与主题系统集成
 * - 保持最小化样式，大部分样式通过 sx 属性控制
 */
const IconRoot = styled(Icon)`
  /* 这里可以添加全局的图标样式，目前保持最小化 */
`;

// ==================== 类型定义 Type Definitions ====================

/**
 * Iconify 组件属性接口
 * 
 * 设计理念：
 * - 继承 IconRoot 的所有原生属性，保持 API 一致性
 * - 排除原始的 icon 属性，使用类型安全的 IconifyName
 * - 这样设计确保了类型安全，防止使用未注册的图标
 */
export type IconifyProps = React.ComponentProps<typeof IconRoot> &
  Omit<IconProps, "icon"> & {
    /** 图标名称，必须是已注册的图标类型，确保类型安全 */
    icon: IconifyName;
  };

// ==================== 主组件 Main Component ====================

/**
 * Iconify 图标组件
 * 
 * 核心设计原则：
 * 1. 类型安全：只允许使用预定义的图标名称
 * 2. 性能优化：自动处理图标注册，避免运行时加载
 * 3. 开发友好：提供清晰的警告和错误信息
 * 4. 样式一致：与项目主题系统集成
 * 
 * @param props - 组件属性
 * @returns 渲染的图标组件
 */
export function Iconify({
  className,
  icon,
  width = "100%", // 默认宽度设为100%，适应父容器
  height,
  sx,
  ...other
}: IconifyProps) {
  // ==================== Hooks ====================

  /**
   * 生成唯一ID
   * 用途：为每个图标实例提供唯一标识，避免SSR时的hydration问题
   */
  const id = useId();

  // ==================== 开发时警告 Development Warnings ====================

  /**
   * 检查图标是否已预注册
   * 
   * 设计目的：
   * - 在开发阶段提醒开发者注册图标，避免生产环境的性能问题
   * - 未注册的图标会在线加载，可能导致闪烁和性能问题
   * - 提供明确的解决方案和文档链接
   */
  if (!allIconNames.includes(icon)) {
    console.warn(
      [
        `图标 "${icon}" 当前通过在线方式加载，这可能导致闪烁效果。`,
        `为了确保更流畅的体验，请将您的图标集注册为离线使用。`,
        `更多信息请访问：https://docs.minimals.cc/icons/`,
      ].join("\n")
    );
  }

  // ==================== 图标注册 Icon Registration ====================

  /**
   * 确保图标已注册
   * 
   * 设计理念：
   * - 采用懒加载策略，只在需要时注册图标
   * - 使用单例模式，避免重复注册
   * - 确保所有图标在渲染前都已可用
   */
  registerIcons();

  // ==================== 组件渲染 Component Render ====================

  return (
    <IconRoot
      ssr // 启用服务端渲染支持，避免hydration不匹配
      id={id} // 唯一标识符，确保SSR一致性
      icon={icon} // 图标名称
      className={classes_merge([className, iconifyClasses.root])} // 合并样式类名
      sx={[
        {
          // 默认样式：防止图标在flex布局中收缩，保持inline-flex显示
          flexShrink: 0, // 防止在flex容器中被压缩
          display: "inline-flex", // 保持行内块级显示，便于对齐
        },
        // 处理sx属性：支持数组和单个对象两种格式
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other} // 透传其他属性，保持API灵活性
    />
  );
}

