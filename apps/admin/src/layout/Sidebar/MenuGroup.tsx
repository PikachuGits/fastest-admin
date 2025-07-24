import React, { useState } from 'react';
import {
  Box,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  type SxProps,
  type Theme,
} from '@mui/material';
import { Iconify } from '@fastest/components';

interface MenuItem {
  title: string;
  path: string;
  icon?: string;
  info?: string[];
  roles?: string[];
  caption?: string;
  children?: MenuItem[];
}

interface MenuGroup {
  subheader: string;
  items: MenuItem[];
}

interface MenuData {
  navItems: MenuGroup[];
}

interface MenuItemProps {
  item: MenuItem;
  level?: number;
}

interface MenuGroupProps {
  group: MenuGroup;
}

interface SidebarMenuProps {
  menuData: MenuData;
}
const StyledListItemButton = styled(ListItemButton)<{
  level?: number;
  selected?: boolean;
  hasSubItems?: boolean;
}>(({ theme, level = 0, selected, hasSubItems }) => ({
  margin: theme.spacing(0.5),
  padding: "4px 8px 4px 12px",
  minHeight: 44,
  backgroundColor: selected ? "#E8F5E8" : "transparent",
  borderRadius: theme.spacing(1),
  marginLeft: level * 1 + theme.spacing(0.5),
  "&:hover": {
    backgroundColor: selected ? "#E8F5E8" : "#F5F5F5",
  },
  "& .MuiListItemIcon-root": {
    minWidth: 24,
    marginRight: theme.spacing(1.5),
  },
  "& .MuiListItemText-primary": {
    color: selected ? "#2E7D32" : "#212121",
  },
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: "#757575",
  },
}));

const StyledListItemText = styled(ListItemText)({
  flex: "1 1 auto",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  maxHeight: 40,
  // padding: "0 8px 0 0",
  margin: 0,
  "& .MuiListItemText-secondary": {
    fontSize: "12px",
    color: "#757575",
    lineHeight: 1
  },
  "& .MuiListItemText-primary": {
    fontSize: "14px",
    color: "#212121",
    fontWeight: 500
  }
});

const ArrowIcon = ({
  open,
  className,
  ...props
}: {
  open: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Iconify
      icon={"eva:arrow-ios-downward-fill"}
      className={`transition-all duration-300 ease-in-out ${open ? "rotate-0" : "rotate-[-90deg]"
        } ${className}`}
      sx={{ color: "#757575" }}
      {...props}
    />
  );
};
// 递归菜单项组件
const MenuItemComponent: React.FC<MenuItemProps> = ({ item, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    // '1px solid #e0e0e0'
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', borderRadius: 1 }} >
      <StyledListItemButton
        level={level}
        selected={false}
        hasSubItems={hasChildren}
        onClick={handleToggle}
        // border: '1px solid #e0e0e0' 244,240,234
        sx={{
          color: '#FFF !important',
          // background: "rgba(212, 170, 170, 0.8)"
          backgroundColor: 'rgba(255,255,255, 0.8)'
        }}
      >
        {item.icon && (
          <ListItemIcon>
            <Iconify
              icon={item.icon as any}
              className="w-full h-full"
              sx={{
                color: "#757575",
              }}
            />
          </ListItemIcon>
        )}
        <StyledListItemText
          primary={
            item.title && (
              <span className="text-sm truncate">{item.title}</span>
            )
          }
          secondary={
            item.caption && (
              <span className="inline-block text-xs truncate w-full">
                {item.caption}
              </span>
            )
          }
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {item.info && item.info.length > 1 && (
            <Box
              component="span"
              sx={{
                px: 1,
                py: 0.25,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                borderRadius: 1,
                fontSize: '0.75rem',
              }}
            >
              {item.info[1]}
            </Box>
          )}
          {hasChildren && <ArrowIcon open={isOpen} />}
        </Box>
      </StyledListItemButton>

      {hasChildren && (
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {item.children!.map((child, index) => (
              <MenuItemComponent
                key={`${child.path}-${index}`}
                item={child}
                level={level + 1}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

// 菜单组组件
const MenuGroupComponent: React.FC<MenuGroupProps> = ({ group }) => {
  return (
    // border: '1px solid #e0e0e0',
    <Box sx={{ mb: 3, borderRadius: 1, }}>
      {/* <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
        {group.subheader}
      </Typography> */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {group.items.map((item, index) => (
          <MenuItemComponent
            key={`${item.path}-${index}`}
            item={item}
          />
        ))}
      </Box>
    </Box>
  );
};

// 主菜单组件
const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuData }) => {
  return (
    <Box sx={{ width: '100%', py: 2 }}>
      {menuData.navItems.map((group, index) => (
        <MenuGroupComponent
          key={`${group.subheader}-${index}`}
          group={group}
        />
      ))}
    </Box>
  );
};

export default SidebarMenu;
export type { MenuData, MenuGroup, MenuItem };