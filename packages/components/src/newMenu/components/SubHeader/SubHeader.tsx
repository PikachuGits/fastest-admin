import { Box, ListSubheader, Button } from "@mui/material";
import { Iconify, sxStyled } from "@fastest/components";
import {
  MenuArrowIconSx,
  MenuSubHeaderAnimateSx,
  MenuSubHeaderSx,
} from "@components/newMenu/styles/Menu.sx";
import { MenuItemIcon } from "@components/newMenu/components/MenuItem/MenuItemIcon";
import { useMenuStore } from "@components/newMenu/stores";
import type { SubHeaderProps } from "@components/newMenu/types";

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
        collapsed || isMobile ? MenuSubHeaderAnimateSx : {}
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
          // display: "inline-flex",
          height: "80%",
          width: "100%",
          padding: 0,
          // left: 0,
          backgroundColor: "transparent",
          borderRadius: (theme) => theme.spacing(1),
          // ":hover": {
          //   backgroundColor: "transparent",
          //   border: "none",
          // },
        }}
      >
        <Iconify
          sx={sxStyled(MenuArrowIconSx, {})}
          icon="eva:arrow-ios-downward-fill"
          className={` ${open ? "expanded" : "collapsed"} ${
            collapsed || isMobile ? "display-none" : "icon-arrow "
          }`}
        />
        <Box
          className={`flex items-center w-full flex-wrap ${
            collapsed || isMobile ? "justify-center " : "justify-start"
          }`}
          sx={{
            width: "100%",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              color: disabled ? "inherit" : "primary.main",
              ".icon-menu": {
                color: disabled ? "inherit" : "primary.main",
              },
            },
          }}
        >
          {iconName && (
            <MenuItemIcon
              className="icon-menu"
              sx={{
                minWidth: "24px",
                // marginRight: collapsed || isMobile ? "10px" : "0px",
                transition: "all 0.2s ease-in-out",
              }}
              iconName={iconName}
            />
          )}
          <Box
            className={` w-auto`}
            style={{
              transition: "opacity 0.2s ease-in-out",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <span
              className={`text-xs text-center ${
                collapsed || isMobile ? "scale-75" : "scale-100 pl-2"
              } `}
            >
              {title}
            </span>
          </Box>
        </Box>
      </Button>
    </ListSubheader>
  );
};

export default SubHeader;
