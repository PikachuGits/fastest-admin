import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { sxStyled } from "@components/utils/sx";
import { MenuItemSx } from "../../styles/Menu.sx";
import { Iconify } from "@components/iconify";
import type { MenuItem as MenuItemType } from "../../types";

/**
 * MenuItemLeaf 组件属性接口
 * MenuItemLeaf component props interface
 */
export interface MenuItemLeafProps {
  /** 菜单项数据 Menu item data */
  item: MenuItemType;
  /** 菜单层级 Menu level */
  level?: number;
  /** 是否为最后一项 Whether is last item */
  isLast?: boolean;
  /** 菜单项点击回调 Menu item click callback */
  onClick?: (item: MenuItemType) => void;
  /** 是否选中 Whether selected */
  selected?: boolean;
  /** 是否禁用 Whether disabled */
  disabled?: boolean;
  /** 自定义样式 Custom styles */
  sx?: any;

  [key: string]: any;
}

/**
 * MenuItemLeaf 组件 - 专门用于渲染叶子菜单项（无子项的菜单项）
 * MenuItemLeaf component - Specialized for rendering leaf menu items (menu items without children)
 */
export const MenuItemLeaf = ({
  item,
  level = 0,
  isLast = false,
  onClick,
  selected = false,
  disabled = false,
  sx = {},
  ...props
}: MenuItemLeafProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(item);
    }
  };

  // 根据层级计算缩进
  const paddingLeft = level * 16 + 16; // 每层级缩进16px，基础缩进16px

  return (
    <Box
      sx={sxStyled(
        MenuItemSx,
        {
          marginBottom: isLast ? 0 : 1, // 最后一项不需要底部间距
        },
        sx
      )}
    >
      <ListItem disablePadding>
        <ListItemButton
          onClick={handleClick}
          disabled={disabled}
          selected={selected}
          sx={{
            paddingLeft: `${paddingLeft}px`,
            paddingY: 1,
            borderRadius: (theme) => theme.spacing(1),
            "&:hover": {
              backgroundColor: (theme) => theme.palette.action.hover,
            },
            "&.Mui-selected": {
              backgroundColor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.primary.main,
              },
            },
            "&.Mui-disabled": {
              opacity: 0.5,
            },
          }}
        >
          {item.icon && (
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Iconify icon={item.icon as any} width={20} />
            </ListItemIcon>
          )}

          <ListItemText
            primary={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: selected ? 600 : 400,
                  fontSize: 14,
                }}
              >
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    fontSize: 12,
                    display: "block",
                    mt: 0.5,
                  }}
                >
                  {item.caption}
                </Typography>
              )
            }
          />

          {/* 信息徽章 */}
          {item.info && (
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.error.main,
                color: (theme) => theme.palette.error.contrastText,
                borderRadius: "50%",
                minWidth: 20,
                height: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                ml: 1,
              }}
            >
              {Array.isArray(item.info) ? item.info[1] : item.info}
            </Box>
          )}
        </ListItemButton>
      </ListItem>
    </Box>
  );
};

export default MenuItemLeaf;
