/**
 * @description 演示如何使用更新后的 Sidebar 组件和新的 NavData 类型
 * Demonstrates how to use the updated Sidebar component with new NavData types
 */

import React from "react";
import { Menu } from "./Menu";
import type { NavSection, NavData } from "./types";

// 示例 1: 使用新的 NavSection[] 格式（与 index.ts 文件结构一致）
const exampleNavSections: NavSection[] = [
  {
    subheader: "主要功能",
    items: [
      {
        title: "仪表板",
        path: "/dashboard",
        icon: "solar:home-angle-bold-duotone",
        info: ["dashboard.count", "+5"],
        roles: ["admin", "user"],
        caption: "查看系统概览",
      },
      {
        title: "用户管理",
        path: "/users",
        icon: "solar:users-group-rounded-bold-duotone",
        roles: ["admin"],
        children: [
          {
            title: "用户列表",
            path: "/users/list",
            caption: "管理系统用户",
          },
          {
            title: "权限设置",
            path: "/users/permissions",
            info: ["permissions.pending", "+2"],
          },
        ],
      },
    ],
  },
  {
    subheader: "系统设置",
    items: [
      {
        title: "基本设置",
        path: "/settings",
        icon: "solar:settings-bold-duotone",
      },
      {
        title: "日志管理",
        path: "/logs",
        icon: "solar:document-text-bold-duotone",
        info: ["logs.new", "+12"],
      },
    ],
  },
];

// 示例 2: 使用包装格式 NavData（向后兼容）
const exampleNavData: NavData = {
  navItems: exampleNavSections,
};

// 使用示例组件
export const SidebarUsageExample: React.FC = () => {
  return (
    <div style={{ width: "300px", height: "600px", border: "1px solid #ccc" }}>
      <h3 style={{ padding: "16px", margin: 0, backgroundColor: "#f5f5f5" }}>
        侧边栏菜单示例
      </h3>

      <Menu
        items={exampleNavSections}  {/* 使用新的 NavSection[] 格式 */}
        variant="sidebar"
        theme="light"
        size="medium"
        collapsible={false}
        accordion={false}
        onItemClick={(item) => {
          console.log("点击菜单项:", item);
        }}
        onItemSelect={(key, item) => {
          console.log("选中菜单项:", key, item);
        }}
        onItemToggle={(key, expanded) => {
          console.log("切换菜单项:", key, "展开状态:", expanded);
        }}
      />
      
      {/* 也可以使用包装格式：items={exampleNavData} */}
    </div>
  );
};

export default SidebarUsageExample;
