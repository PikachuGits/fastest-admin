import React from "react";
import { Box, List, Paper, Popper } from "@mui/material";
import { MenuItem } from "../";
import { shouldMenuItemShowSelected } from "../../utils/menuUtils";

interface MenuFloatingProps {
  collapsed: boolean;
  activeMenus: Array<{
    id: string;
    anchorEl: HTMLElement;
    items: any[];
    level: number;
    title?: string;
  }>;
  selected: string | null;
  onPopperMouseEnter: () => void;
  onMenuMouseLeave: () => void;
  onMenuItemMouseEnter: (
    event: React.MouseEvent<HTMLElement>,
    item: any,
    level: number
  ) => void;
  onItemClick: (item: any) => void;
  onClickAway: () => void;
}

export const MenuFloating: React.FC<MenuFloatingProps> = ({
  collapsed,
  activeMenus,
  selected,
  onPopperMouseEnter,
  onMenuMouseLeave,
  onMenuItemMouseEnter,
  onItemClick,
  onClickAway,
}) => {
  // 渲染单级菜单项
  const renderMenuItems = (items: any[], level: number = 0) => {
    return items.map((item, itemIndex) => (
      <Box
        key={itemIndex}
        onMouseEnter={(e) => onMenuItemMouseEnter(e, item, level)}
      >
        <MenuItem
          item={item}
          open={false}
          selected={shouldMenuItemShowSelected(item, selected)}
          onClick={() => {
            onItemClick(item);
            onClickAway(); // 点击后关闭悬浮菜单
          }}
          sx={{
            position: "relative",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>
    ));
  };

  // 只在收起状态且有激活菜单时显示
  if (!collapsed || activeMenus.length === 0) {
    return null;
  }

  return (
    <Box>
      {activeMenus.map((menu, menuIndex) => (
        <Popper
          key={menu.id}
          open={true}
          anchorEl={menu.anchorEl}
          placement={"right-start"}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 10], // [x, y] 偏移
              },
            },
          ]}
          sx={{
            zIndex: 1300 + menuIndex,
            padding: 0,
          }}
        >
          <Paper
            elevation={8}
            onMouseEnter={onPopperMouseEnter}
            onMouseLeave={onMenuMouseLeave}
            sx={{
              minWidth: 200,
              maxWidth: 300,
              maxHeight: 400,
              overflow: "auto",
              backgroundColor: (theme) => theme.palette.background.default,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: (theme) => theme.spacing(1),
              padding: 0,
            }}
          >
            <Box
              sx={{
                margin: 0,
              }}
            >
              <List
                dense
                sx={{
                  padding: (theme) => theme.spacing(0.5, 0, 0.5, 0),
                }}
              >
                {renderMenuItems(menu.items, menu.level)}
              </List>
            </Box>
          </Paper>
        </Popper>
      ))}
    </Box>
  );
};
