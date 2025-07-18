import React, { useCallback, type ReactElement } from 'react';
import {
  Collapse,
  List,
  styled,
  type SxProps,
  type Theme,
} from '@mui/material';
import { MenuItem } from '../MenuItem';
import { GroupHeader } from '../GroupHeader';
import { useMenuState } from '../../hooks/useMenuState';
import { parseInfoBadge, getBadgeColor, parseIcon, hasPermission } from '../../utils/menuHelpers';
import { getMenuConfig, getMenuStyle } from '../../config/menuVariants';
import menuData from '../../data/menu-data.json';
import type { 
  NavItem, 
  NavSection, 
  NavData, 
  MenuListProps,
  MenuStyleVariant 
} from '../../types';
import '../../styles/index.less';

// 动态样式化的List组件
const StyledList = styled(List)<{ styleConfig: MenuStyleVariant }>(({ theme, styleConfig }) => ({
  width: styleConfig.width,
  maxWidth: styleConfig.maxWidth,
  minWidth: styleConfig.minWidth,
  bgcolor: 'background.paper',
  padding: 0,
  display: styleConfig.layout === 'double' ? 'grid' : 'block',
  gridTemplateColumns: styleConfig.layout === 'double' ? '1fr 1fr' : 'none',
  gap: styleConfig.layout === 'double' ? theme.spacing(2) : 0,
}));

const ContainerBox = styled('div')<{ styleConfig: MenuStyleVariant }>(({ theme, styleConfig }) => ({
  minHeight: styleConfig.itemHeight,
  marginBottom: theme.spacing(styleConfig.spacing / 8),
}));

/**
 * 重构后的MenuList组件
 * 支持多种变体和配置
 */
export const MenuListRefactored: React.FC<MenuListProps> = ({
  data = menuData as NavData,
  config,
  variant = 'default',
  styleVariant = 'standard',
  onItemClick,
  onItemToggle,
  className,
  style,
  ...props
}) => {
  // 获取配置
  const menuConfig = config || getMenuConfig(variant);
  const styleConfig = getMenuStyle(styleVariant);
  
  // 使用状态管理hook
  const {
    openStates,
    selectedItem,
    toggleOpen,
    handleItemClick: defaultHandleItemClick,
  } = useMenuState(data, menuConfig);

  // 处理菜单项点击
  const handleItemClick = useCallback((itemPath: string, item: NavItem) => {
    defaultHandleItemClick(itemPath);
    onItemClick?.(itemPath, item);
  }, [defaultHandleItemClick, onItemClick]);

  // 处理菜单项展开/折叠
  const handleItemToggle = useCallback((itemPath: string) => {
    const newState = !openStates[itemPath];
    toggleOpen(itemPath);
    onItemToggle?.(itemPath, newState);
  }, [openStates, toggleOpen, onItemToggle]);

  // 渲染菜单项
  const renderNavItem = useCallback(
    (item: NavItem, itemPath: string, level: number = 0): ReactElement => {
      const isSelected = selectedItem === itemPath;
      const isOpen = openStates[itemPath] || false;
      const hasChildren = item.children && item.children.length > 0;
      const badge = parseInfoBadge(item.info);
      const actualIcon = parseIcon(item.icon);
      
      // 权限检查
      if (menuConfig.enableRoleBasedAccess && 
          !hasPermission(item.roles, menuConfig.userRoles)) {
        return <React.Fragment key={itemPath} />;
      }

      return (
        <ContainerBox key={itemPath} styleConfig={styleConfig}>
          <MenuItem
            icon={styleConfig.showIcons ? actualIcon as any : undefined}
            primary={item.title}
            secondary={item.caption}
            level={level}
            selected={isSelected}
            hasSubItems={hasChildren}
            open={isOpen}
            onToggle={hasChildren && styleConfig.collapsible ? 
              () => handleItemToggle(itemPath) : undefined}
            onClick={() => handleItemClick(itemPath, item)}
            numberBadge={styleConfig.showBadges ? badge : undefined}
            badgeColor={getBadgeColor(badge)}
            disabled={false}
          />
          
          {hasChildren && styleConfig.collapsible && (
            <Collapse
              in={isOpen}
              timeout="auto"
              unmountOnExit
              data-level={level === 0 ? "false" : "true"}
              sx={{
                paddingLeft: styleVariant === 'collapsed' ? 0 : "24px",
              }}
            >
              <List
                component="div"
                disablePadding
                sx={{ 
                  paddingLeft: styleVariant === 'collapsed' ? 0 : "12px" 
                }}
                className="fast-menu-item-container-sub"
              >
                {item.children!.map((child, childIndex) =>
                  renderNavItem(child, `${itemPath}.${childIndex}`, level + 1)
                )}
              </List>
            </Collapse>
          )}
        </ContainerBox>
      );
    },
    [selectedItem, openStates, handleItemToggle, handleItemClick, menuConfig, styleConfig]
  );

  // 渲染菜单分组
  const renderNavSection = useCallback(
    (section: NavSection, sectionIndex: number): ReactElement => {
      const [isSubheaderOpen, setIsSubheaderOpen] = React.useState(true);

      return (
        <div key={`section-${sectionIndex}`}>
          {section.subheader && styleVariant !== 'collapsed' && (
            <GroupHeader
              open={isSubheaderOpen}
              title={section.subheader}
              onClick={() => setIsSubheaderOpen(!isSubheaderOpen)}
            />
          )}
          
          <Collapse 
            in={styleVariant === 'collapsed' || isSubheaderOpen} 
            timeout="auto" 
            unmountOnExit
          >
            <List sx={{ padding: 0 }}>
              {section.items.map((item, itemIndex) =>
                renderNavItem(item, `section-${sectionIndex}.${itemIndex}`, 0)
              )}
            </List>
          </Collapse>
        </div>
      );
    },
    [renderNavItem, styleConfig]
  );

  return (
    <StyledList 
      styleConfig={styleConfig}
      className={className}
      style={style}
      {...props}
    >
      {data.navItems.map((section, index) => 
        renderNavSection(section, index)
      )}
    </StyledList>
  );
};

export default MenuListRefactored;