// 类型定义
export interface LayoutPreferences {
    app: {
      name: string;
      layout: 'sidebar' | 'header' | 'mixed' | 'sidebar-mixed';
      contentCompact: boolean;
      contentCompactWidth: number;
      contentPadding: number;
      isMobile: boolean;
      zIndex: number;
    };
    theme: {
      mode: 'light' | 'dark';
      semiDarkSidebar: boolean;
      semiDarkHeader: boolean;
    };
    header: {
      enable: boolean;
      height: number;
      hidden: boolean;
      mode: 'fixed' | 'static';
    };
    sidebar: {
      enable: boolean;
      width: number;
      collapsed: boolean;
      collapseWidth: number;
      collapsedShowTitle: boolean;
      hidden: boolean;
      expandOnHover: boolean;
      fixed: boolean;
    };
    tabbar: {
      enable: boolean;
      height: number;
      showIcon: boolean;
    };
    footer: {
      enable: boolean;
      height: number;
      fixed: boolean;
    };
    logo: {
      enable: boolean;
      source: string;
      fit: 'contain' | 'cover' | 'fill';
    };
    navigation: {
      accordion: boolean;
      styleType: 'default' | 'rounded';
    };
    breadcrumb: {
      enable: boolean;
      showHome: boolean;
      showIcon: boolean;
      hideOnlyOne: boolean;
      styleType: 'default' | 'background';
    };
    widget: {
      sidebarToggle: boolean;
      lockScreen: boolean;
    };
    transition: {
      loading: boolean;
    };
  }
  
  export interface MenuRecord {
    name: string;
    path: string;
    icon?: React.ReactNode;
    children?: MenuRecord[];
    meta?: {
      title?: string;
      hidden?: boolean;
      keepAlive?: boolean;
    };
  }
  
  export interface BasicLayoutProps {
    preferences: LayoutPreferences;
    menus: MenuRecord[];
    children?: React.ReactNode;
    onPreferencesChange?: (prefs: Partial<LayoutPreferences>) => void;
    onClearPreferencesAndLogout?: () => void;
    onLogoClick?: () => void;
    slots?: {
      userDropdown?: React.ReactNode;
      notification?: React.ReactNode;
      extra?: React.ReactNode;
      lockScreen?: React.ReactNode;
      logoText?: React.ReactNode;
      headerLeft?: React.ReactNode[];
      headerRight?: React.ReactNode[];
    };
  }