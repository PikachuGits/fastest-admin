import { ListItemButton, ListItemText } from "@mui/material";
import { sxStyled } from "@components/utils/sx";
import { MenuItemSx } from "../../styles/Menu.sx";
import { MenuItemIcon } from "./MenuItemIcon";
import { MenuItemContent } from "./MenuItemContent";
import { MenuItemActions } from "./MenuItemActions";
import type { SxProps } from "@mui/system";
import styles from "../../styles/index.module.less";

export interface MenuItemProps {
  item: any;
  textStyles?: any;
  open?: boolean;
  selected?: boolean;
  onClick?: () => void;
  isLast?: boolean;
  sx?: SxProps;
  level?: number;
}

export const MenuItem = (props: MenuItemProps) => {
  const {
    item,
    textStyles,
    open = false,
    selected = false,
    onClick,
    isLast = false,
    sx,
    level = 0,
  } = props;

  // 从item.info提取badge信息
  const badge = item.info?.[1] || null;
  const badgeColor = "default";
  const collapsed = false; // 根据实际需要设置
  const hasSubItems = !!(item.children && item.children.length > 0);

  return (
    <ListItemButton
      onClick={onClick}
      selected={selected}
      className={styles["fast-menu-item-container-sub-child"]}
      data-level={level === 0 ? "false" : "true"}
      sx={{
        padding: (theme) => theme.spacing(1, 1),
        marginBottom: isLast ? 1 : 0,
        borderRadius: (theme) => theme.spacing(0.5),
        backgroundColor: selected ? "action.selected" : "transparent",
        height: "40px",
        ...sx,
      }}
    >
      {/* 菜单项图标 Menu item icon */}
      {item.icon && (
        <MenuItemIcon
          iconName={item.icon}
          sx={{
            minWidth: "24px",
            marginRight: "12px",
          }}
        />
      )}
      {/* 菜单项文本内容 Menu item text content */}
      <MenuItemContent
        title={item.title}
        caption={item.caption}
        collapsed={collapsed}
        sx={sxStyled(textStyles, {})}
      />
      {/* 右侧操作区域 Right action area */}
      <MenuItemActions
        badge={badge}
        badgeColor={badgeColor}
        hasSubItems={hasSubItems}
        open={open}
      />
    </ListItemButton>
  );
};

export default MenuItem;
