import { ListItemButton, ListItemText } from "@mui/material";
import { sxStyled } from "@components/utils/sx";
import { MenuItemSx } from "../../styles/Menu.sx";
import { MenuItemIcon } from "./MenuItemIcon";
import { MenuItemContent } from "./MenuItemContent";
import { MenuItemActions } from "./MenuItemActions";

export const MenuItem = (props: any) => {
  const badge = 1;
  const badgeColor = "default";
  const { item, textStyles, open } = props;
  const collapsed = true;
  const hasSubItems = true;

  return (
    <ListItemButton
      sx={{
        marginBottom: props.isLast ? 0 : 1,
        borderRadius: (theme) => theme.spacing(0.5),
        border: "1px solid red",
      }}
    >
      {/* 菜单项图标 Menu item icon */}
      {props.item.icon && <MenuItemIcon iconName={props.item.icon} sx={{}} />}
      {/* 菜单项文本内容 Menu item text content */}
      <MenuItemContent
        title={item.title}
        caption={item.caption}
        collapsed={collapsed}
        sx={sxStyled(textStyles, {
          border: "1px solid red",
        })}
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
