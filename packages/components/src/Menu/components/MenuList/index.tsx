import {
  Collapse,
  List,
  styled,
  useTheme,
  type ListProps,
} from "@mui/material";
import { useState, useCallback, type ReactElement } from "react";
import { MenuItem } from "../MenuItem";
import { GroupHeader } from "../GroupHeader";
import menuData from "../../data/menu-data.json";
import "../../styles/index.less";

const ListBox = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
  padding: 0,
}));

// 新的类型定义，匹配更新后的JSON结构
interface NavItem {
  title: string;
  path: string;
  icon?: string;
  info?: [string, string]; // [infoKey, badge]
  roles?: string[];
  caption?: string;
  children?: NavItem[];
}

interface NavSection {
  subheader?: string;
  items: NavItem[];
}

interface NavData {
  navItems: NavSection[];
}

// 图标映射，将JSON中的图标键映射到实际的图标名称
const iconMap: Record<string, string> = {
  "icon.landing": "solar:home-angle-bold-duotone",
  "icon.services": "solar:settings-bold-duotone",
  "icon.blog": "solar:pen-bold",
  "icon.about": "solar:shield-keyhole-bold-duotone",
  "icon.tour": "eva:arrow-ios-forward-fill",
  "icon.menu": "eva:more-vertical-fill",
  "icon.level2a": "solar:cart-3-bold",
  "icon.level2b": "solar:cart-3-bold",
  "icon.level2c": "solar:cart-3-bold",
};

// 解析info数组，返回数字标记
const parseInfoBadge = (info?: [string, string]): number | undefined => {
  if (!info || !info[1]) return undefined;
  const badge = info[1];
  if (badge.startsWith("+")) {
    const num = parseInt(badge.substring(1));
    return isNaN(num) ? undefined : num;
  }
  return undefined;
};

const ContainerBox = styled("div")(({ theme }) => ({}));

// 获取标记颜色
const getBadgeColor = (badge?: number): "default" | "primary" | "success" => {
  if (!badge) return "default";
  if (badge <= 2) return "primary";
  return "success";
};

export default function MenuList(props: any) {
  // 初始化展开状态 - 从数据结构中智能设置默认展开状态
  const initializeOpenStates = useCallback((data: NavData) => {
    const states: Record<string, boolean> = {};

    const processItems = (items: NavItem[], path = "") => {
      items.forEach((item, index) => {
        const itemPath = path ? `${path}.${index}` : `${index}`;

        if (item.children && item.children.length > 0) {
          // 默认展开第一层有子项的菜单项
          states[itemPath] = path === "" || item.title === "Level";
          processItems(item.children, itemPath);
        }
      });
    };

    data.navItems.forEach((section, sectionIndex) => {
      processItems(section.items, `section-${sectionIndex}`);
    });

    return states;
  }, []);

  // 查找默认选中项
  const findDefaultSelected = useCallback((data: NavData): string => {
    // 默认选中"Level"项
    for (
      let sectionIndex = 0;
      sectionIndex < data.navItems.length;
      sectionIndex++
    ) {
      const section = data.navItems[sectionIndex];
      if (!section || !section.items) continue;

      for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
        const item = section.items[itemIndex];
        if (!item) continue;

        if (item.title === "Level") {
          return `section-${sectionIndex}.${itemIndex}`;
        }
      }
    }
    return "section-0.0"; // 默认值
  }, []);

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    initializeOpenStates(menuData as NavData)
  );
  const [selectedItem, setSelectedItem] = useState(() =>
    findDefaultSelected(menuData as NavData)
  );

  const toggleOpen = useCallback((key: string) => {
    setOpenStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleItemClick = useCallback((itemKey: string) => {
    setSelectedItem(itemKey);
  }, []);

  const renderNavItem = useCallback(
    (item: NavItem, itemPath: string, level: number = 0): ReactElement => {
      const isSelected = selectedItem === itemPath;

      const isOpen = openStates[itemPath] || false;
      const hasChildren = item.children && item.children.length > 0;
      const badge = parseInfoBadge(item.info);
      const actualIcon = item.icon ? item.icon : undefined;

      return (
        <ContainerBox key={itemPath}>
          <MenuItem
            icon={actualIcon as any}
            primary={item.title}
            secondary={item.caption}
            level={level}
            selected={isSelected}
            hasSubItems={hasChildren}
            open={isOpen}
            onToggle={hasChildren ? () => toggleOpen(itemPath) : undefined}
            onClick={() => handleItemClick(itemPath)}
            numberBadge={badge}
            badgeColor={getBadgeColor(badge)}
            disabled={false}
          />
          {hasChildren && (
            <Collapse
              in={isOpen}
              timeout="auto"
              unmountOnExit
              data-level={level == 0 ? "false" : "true"}
              sx={{
                paddingLeft: "24px",
              }}
            >
              <List
                component="div"
                disablePadding
                sx={{ paddingLeft: "12px" }}
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
    [selectedItem, openStates, toggleOpen, handleItemClick]
  );

  const renderNavSection = useCallback(
    (section: NavSection, sectionIndex: number): ReactElement => {
      const [isSubheaderOpen, setIsSubheaderOpen] = useState(true);

      return (
        <div key={`section-${sectionIndex}`}>
          {section.subheader && (
            <GroupHeader
              open={isSubheaderOpen}
              title={section.subheader}
              onClick={() => {
                console.log(isSubheaderOpen);
                setIsSubheaderOpen(!isSubheaderOpen);
              }}
            />
          )}
          <Collapse in={isSubheaderOpen} timeout="auto" unmountOnExit>
            <List sx={{ padding: 0 }}>
              {section.items.map((item, itemIndex) =>
                renderNavItem(item, `section-${sectionIndex}.${itemIndex}`, 0)
              )}
            </List>
          </Collapse>
        </div>
      );
    },
    [renderNavItem]
  );

  return (
    <ListBox component="nav" {...props}>
      {(menuData as NavData).navItems.map((section, index) => {
        console.log(section);
        return renderNavSection(section, index);
      })}
    </ListBox>
  );
}
