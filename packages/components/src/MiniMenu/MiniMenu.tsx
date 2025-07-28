/**
 * MiniMenu 组件
 * 
 * 这是一个功能丰富的导航菜单组件，支持多级嵌套、折叠展开、状态管理等功能。
 * 从编译后的 HTML 代码转换而来，完全兼容 MUI 设计系统。
 * 
 * 主要特性：
 * - 支持无限层级的嵌套导航
 * - 可折叠的导航分组
 * - 支持图标、标签、禁用状态
 * - 完整的 TypeScript 类型支持
 * - 使用 Iconify 图标系统
 * 
 * @author Trae AI
 * @version 1.0.0
 */

import React, { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Collapse,
  Divider,
  Box,
  Chip,
} from '@mui/material';
import { Iconify } from '@fastest/components';

/**
 * 导航项接口定义
 */
interface NavItem {
  /** 导航项标题 */
  title: string;
  /** 导航项图标 */
  icon?: React.ReactNode;
  /** 链接地址 */
  href?: string;
  /** 副标题/说明文字 */
  caption?: string;
  /** 信息标签（数字或文字） */
  info?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子导航项 */
  children?: NavItem[];
}

/**
 * 导航分组接口定义
 */
interface NavSection {
  /** 分组标题 */
  title: string;
  /** 分组内的导航项列表 */
  items: NavItem[];
}

/**
 * 导航数据配置
 * 定义了完整的导航结构，包括两个主要分组：Marketing 和 Travel
 */
const navData: NavSection[] = [
  {
    title: 'Marketing',
    items: [
      {
        title: 'Landing',
        icon: <Iconify icon="solar:home-angle-bold-duotone" />,
        href: 'https://minimals.cc/components/extra/navigation-bar',
        info: '+2',
      },
      {
        title: 'Services',
        icon: <Iconify icon="solar:settings-bold-duotone" />,
        href: 'https://minimals.cc/components/extra/navigation-bar',
        caption: 'Only admin can see this item.',
      },
      {
        title: 'Blog',
        icon: <Iconify icon="solar:pen-bold" />,
        caption: 'Only admin / manager can see this item.',
        info: '+3',
        children: [],
      },
    ],
  },
  {
    title: 'Travel',
    items: [
      {
        title: 'About',
        icon: <Iconify icon="eva:search-fill" />,
        href: 'https://minimals.cc/components/extra/navigation-bar',
        info: '+4',
      },
      {
        title: 'Contact',
        icon: <Iconify icon="solar:share-bold" />,
        href: 'https://minimals.cc/components/extra/navigation-bar',
        disabled: true,
      },
      {
        title: 'Level',
        icon: <Iconify icon="custom:menu-duotone" />,
        children: [
          {
            title: 'Level 2a',
            icon: <Iconify icon="solar:bell-bing-bold-duotone" />,
            caption: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            children: [
              {
                title: 'Level 3a',
                href: 'https://minimals.cc/components/extra/navigation-bar',
              },
              {
                title: 'Level 3b',
                children: [
                  {
                    title: 'Level 4a',
                    href: 'https://minimals.cc/components/extra/navigation-bar',
                    disabled: true,
                  },
                  {
                    title: 'Level 4b',
                    href: 'https://minimals.cc/components/extra/navigation-bar',
                  },
                ],
              },
              {
                title: 'Level 3c',
                href: 'https://minimals.cc/components/extra/navigation-bar',
              },
            ],
          },
          {
            title: 'Level 2b',
            icon: <Iconify icon="eva:done-all-fill" />,
            href: 'https://minimals.cc/components/extra/navigation-bar',
          },
          {
            title: 'Level 2c',
            icon: <Iconify icon="solar:clock-circle-outline" />,
            href: 'https://minimals.cc/components/extra/navigation-bar',
          },
        ],
      },
      {
        title: 'More',
        icon: <Iconify icon="eva:more-vertical-fill" />,
        href: 'https://minimals.cc/components/extra/navigation-bar',
      },
    ],
  },
];

/**
 * 导航项组件属性接口
 */
interface NavItemComponentProps {
  /** 导航项数据 */
  item: NavItem;
  /** 嵌套层级，用于控制缩进 */
  level?: number;
  /** 是否为激活状态 */
  isActive?: boolean;
  /** 是否展开（用于有子项的导航） */
  isOpen?: boolean;
  /** 切换展开状态的回调函数 */
  onToggle?: () => void;
}

/**
 * 导航项组件
 * 
 * 负责渲染单个导航项，支持多级嵌套和交互功能
 */
const NavItemComponent: React.FC<NavItemComponentProps> = ({
  item,
  level = 0,
  isActive = false,
  isOpen = false,
  onToggle,
}) => {
  // 判断是否有子项
  const hasChildren = item.children && item.children.length > 0;
  // 本地展开状态（当没有外部控制时使用）
  const [localOpen, setLocalOpen] = useState(false);
  // 子项的展开状态管理
  const [childrenState, setChildrenState] = useState<Record<number, boolean>>({});

  /**
   * 处理导航项点击事件
   */
  const handleClick = () => {
    if (hasChildren) {
      if (onToggle) {
        onToggle();
      } else {
        setLocalOpen(!localOpen);
      }
    }
  };

  /**
   * 处理子项的展开/折叠切换
   */
  const handleChildToggle = (index: number) => {
    setChildrenState(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // 确定当前的展开状态（优先使用外部控制）
  const open = onToggle ? isOpen : localOpen;

  /**
   * 渲染信息标签
   * 根据信息类型自动选择颜色
   */
  const renderInfo = () => {
    if (!item.info) return null;
    
    // 判断是否为数字类型，以 + 开头的数字显示为错误色
    const isNumeric = typeof item.info === 'number' || /^\+\d+$/.test(item.info.toString());
    const color = isNumeric ? (item.info.toString().startsWith('+') ? 'error' : 'info') : 'default';
    
    return (
      <Chip
        label={item.info}
        size="small"
        color={color}
        sx={{ ml: 1, fontSize: '12px', height: '24px' }}
      />
    );
  };

  /**
   * 按钮通用属性配置
   * 包括样式、状态和交互逻辑
   */
  const buttonProps = {
    disabled: item.disabled,
    onClick: handleClick,
    sx: {
      // 根据层级设置左边距，实现缩进效果
      pl: level > 0 ? 3 + level * 2 : 1.5,
      // 根据层级设置最小高度
      minHeight: level > 0 ? 36 : 44,
      borderRadius: 1,
      // 激活状态样式
      ...(isActive && {
        bgcolor: 'action.selected',
        color: 'primary.main',
        fontWeight: 600,
      }),
      // 禁用状态样式
      ...(item.disabled && {
        opacity: 0.48,
        pointerEvents: 'none',
      }),
    },
  };

  return (
    <>
      <ListItem disablePadding>
        {hasChildren ? (
          <ListItemButton {...buttonProps}>
            {item.icon && level === 0 && (
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.title}
              secondary={item.caption}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
              }}
              secondaryTypographyProps={{
                fontSize: 12,
                color: 'text.disabled',
              }}
            />
            {renderInfo()}
            {open ? <Iconify icon="eva:arrow-ios-upward-fill" /> : <Iconify icon="eva:arrow-ios-downward-fill" />}
          </ListItemButton>
        ) : (
          <ListItemButton
            {...buttonProps}
            component={item.href ? 'a' : 'div'}
            href={item.href}
          >
            {item.icon && level === 0 && (
              <ListItemIcon sx={{ minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText
              primary={item.title}
              secondary={item.caption}
              primaryTypographyProps={{
                fontSize: 14,
                fontWeight: isActive ? 600 : 500,
              }}
              secondaryTypographyProps={{
                fontSize: 12,
                color: 'text.disabled',
              }}
            />
            {renderInfo()}
          </ListItemButton>
        )}
      </ListItem>

      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children!.map((child, index) => (
              <NavItemComponent
                key={index}
                item={child}
                level={level + 1}
                isActive={child.title === 'Level 4b'} // Example active state
                isOpen={childrenState[index]}
                onToggle={() => handleChildToggle(index)}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

/**
 * 导航分组组件属性接口
 */
interface NavSectionProps {
  /** 分组数据 */
  section: NavSection;
  /** 是否展开 */
  isExpanded?: boolean;
  /** 切换展开状态的回调函数 */
  onToggle?: () => void;
}

/**
 * 导航分组组件
 * 
 * 负责渲染导航分组标题和内容，支持折叠展开功能
 */
const NavSection: React.FC<NavSectionProps> = ({ section, isExpanded = true, onToggle }) => {
  return (
    <ListItem disablePadding>
      <Box sx={{ width: '100%' }}>
        <ListSubheader
          component="div"
          sx={{
            px: 2,
            py: 1,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: 'text.disabled',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              color: 'text.primary',
            },
          }}
          onClick={onToggle}
        >
          <Iconify
            icon="eva:arrow-ios-downward-fill"
            sx={{
              fontSize: 16,
              transition: 'transform 0.3s',
              transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
            }}
          />
          {section.title}
        </ListSubheader>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {section.items.map((item, index) => (
              <NavItemComponent
                key={index}
                item={item}
                isActive={item.title === 'Level'} // Example active state
              />
            ))}
          </List>
        </Collapse>
      </Box>
    </ListItem>
  );
};

/**
 * MiniMenu 组件属性接口
 */
interface MiniMenuProps {
  /** 自定义样式 */
  sx?: object;
}

/**
 * MiniMenu 主组件
 * 
 * 这是导航菜单的主容器组件，管理所有分组的状态和渲染
 */
const MiniMenu: React.FC<MiniMenuProps> = ({ sx }) => {
  // 管理各个分组的展开状态
  const [sectionStates, setSectionStates] = useState<Record<number, boolean>>({
    0: true, // Marketing 分组默认展开
    1: true, // Travel 分组默认展开
  });

  /**
   * 处理分组的展开/折叠切换
   */
  const handleSectionToggle = (index: number) => {
    setSectionStates(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        maxWidth: 320,
        width: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      <Box component="nav" sx={{ flex: 1 }}>
        <List sx={{ p: 0 }}>
          {navData.map((section, index) => (
            <NavSection
              key={index}
              section={section}
              isExpanded={sectionStates[index]}
              onToggle={() => handleSectionToggle(index)}
            />
          ))}
        </List>
      </Box>

      <Divider sx={{ my: 2 }} />

      <ListItemButton
        component="a"
        href="https://minimals.cc/components/extra/navigation-bar"
        sx={{
          borderRadius: 1,
          minHeight: 44,
        }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Iconify icon="solar:bell-bing-bold-duotone" />
        </ListItemIcon>
        <ListItemText
          primary="Chat"
          secondary="Praesent porttitor nulla vitae posuere"
          primaryTypographyProps={{
            fontSize: 14,
            fontWeight: 500,
          }}
          secondaryTypographyProps={{
            fontSize: 12,
            color: 'text.disabled',
          }}
        />
      </ListItemButton>
    </Paper>
  );
};

export default MiniMenu;
export type { NavItem, NavSection, MiniMenuProps };