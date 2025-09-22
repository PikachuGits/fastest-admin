import { Box, ListSubheader, Button } from "@mui/material";
import { Iconify, sxStyled, ScalableText } from "@fastest/components";
import {
  MenuArrowIconSx,
  MenuSubHeaderAnimateSx,
  MenuSubHeaderSx,
} from "@components/Sidebar/styles/Menu.sx";
import { MenuItemIcon } from "@components/Sidebar/components/MenuItem/MenuItemIcon";
import { useMenuStore } from "@components/Sidebar/stores";
import type { SubHeaderProps } from "@components/Sidebar/types";
import { alpha } from "@mui/material/styles";
import { classes_merge } from "@fastest/utils";
import { MenuBox } from "@components/Sidebar/styles/SubHeader.styles";

/**
 * SubHeader 组件 - 菜单分组标题组件
 * SubHeader Component - Menu section header component
 *
 * @description
 * 用于显示菜单分组的标题，支持展开/收起状态显示，
 * 并根据侧边栏折叠状态自动调整样式和布局。
 *
 * Used to display menu section titles, supports expand/collapse state display,
 * and automatically adjusts styles and layout based on sidebar collapse state.
 *
 * @features
 * - 🎯 集成 Zustand 状态管理，自动响应侧边栏折叠状态
 * - 🔄 支持展开/收起交互，带有平滑动画效果
 * - 📱 响应式设计，支持移动端适配
 * - ♿ 完整的可访问性支持（ARIA 属性、键盘导航）
 * - 🎨 自定义样式支持，可禁用状态处理
 * - 🏷️ 可选图标显示和箭头指示器
 *
 * @example
 * ```tsx
 * <SubHeader
 *   title="Dashboard"
 *   open={isOpen}
 *   onToggle={() => setIsOpen(!isOpen)}
 *   iconName="dashboard-outline"
 *   showArrow={true}
 * />
 * ```
 */
export const SubHeader = ({
  title,
  onToggle,
  open = false,
  tabIndex = 0,
  iconName,
  className,
  showArrow = true,
  disabled = false,
  selected = false,
}: SubHeaderProps) => {
  const { collapsed, isMobile } = useMenuStore();

  // 处理点击事件
  const handleClick = () => {
    if (!disabled) {
      onToggle();
    }
  };

  // 处理键盘事件
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!disabled && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <ListSubheader
      className={className}
      sx={sxStyled(
        MenuSubHeaderSx,
        collapsed || isMobile ? MenuSubHeaderAnimateSx : {},
        { mb: open ? 1 : 0, transition: "all 0.2s ease-in-out" }
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-expanded={open}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : tabIndex}
    >
      <Button
        sx={{
          height: "100%",
          width: "100%",
          minWidth: "auto",
          minHeight: "24px",
          padding: (theme) => theme.spacing(0.5),
          backgroundColor: (theme) =>
            selected ? alpha(theme.palette.primary.main, 0.2) : "transparent",
          borderRadius: (theme) => theme.spacing(1),
          "&:hover": {
            backgroundColor: (theme) =>
              selected
                ? alpha(theme.palette.primary.main, 0.2)
                : "action.hover",
          },
        }}
      >
        <Iconify
          sx={sxStyled(MenuArrowIconSx, {})}
          icon="eva:arrow-ios-downward-fill"
          className={` ${open ? "expanded" : "collapsed"} ${collapsed || isMobile ? "display-none" : "icon-arrow "
            }`}
        />

        <MenuBox
          selected={selected}
          disabled={disabled}
          collapsed={collapsed}
          isMobile={isMobile}
        >
          {iconName && (
            <MenuItemIcon
              className="icon-menu"
              sx={{
                height: "auto",
                minWidth: "24px",
                transition: "all 0.2s ease-in-out",
              }}
              iconName={iconName}
            />
          )}
          <Box
            className={"flex items-center justify-center"}
            sx={{
              transition: "opacity 0.2s ease-in-out",
              position: "relative",
              width: "100%",
              height: "20px",
              flex: 1,
              fontSize: "12px",
            }}
          >
            <ScalableText
              width={collapsed || isMobile ? "100%" : "90%"}
              height="100%"
              scale={collapsed || isMobile ? 0.9 : 1}
              textAlign={collapsed || isMobile ? "center" : "left"}
            >
              {title}
            </ScalableText>
          </Box>
        </MenuBox>
      </Button>
    </ListSubheader>
  );
};

export default SubHeader;
