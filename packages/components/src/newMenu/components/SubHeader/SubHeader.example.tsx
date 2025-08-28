/**
 * SubHeader 组件使用示例
 * SubHeader Component Usage Examples
 *
 * 展示如何在不同场景下使用 SubHeader 组件
 * Shows how to use SubHeader component in different scenarios
 */

import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { SubHeader } from "./SubHeader";
import { useMenuStore } from "@components/newMenu/stores";

/**
 * 基础使用示例
 * Basic usage example
 */
export const BasicSubHeaderExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        基础 SubHeader 示例
      </Typography>
      <SubHeader
        title="Dashboard"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        iconName="dashboard-outline"
      />
    </Paper>
  );
};

/**
 * 带图标和箭头的示例
 * Example with icon and arrow
 */
export const IconSubHeaderExample = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        带图标和箭头的 SubHeader
      </Typography>
      <SubHeader
        title="User Management"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        iconName="people-outline"
        showArrow={true}
      />
    </Paper>
  );
};

/**
 * 禁用状态示例
 * Disabled state example
 */
export const DisabledSubHeaderExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        禁用状态的 SubHeader
      </Typography>
      <SubHeader
        title="Disabled Section"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        iconName="lock-outline"
        disabled={true}
      />
    </Paper>
  );
};

/**
 * 响应式布局示例
 * Responsive layout example
 */
export const ResponsiveSubHeaderExample = () => {
  const [sections, setSections] = useState({
    analytics: false,
    settings: true,
    reports: false,
  });

  const { collapsed, toggleCollapsed } = useMenuStore();

  const toggleSection = (section: keyof typeof sections) => {
    setSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        响应式布局示例
      </Typography>
      <Box sx={{ mb: 2 }}>
        <button onClick={toggleCollapsed}>
          {collapsed ? "展开侧边栏" : "收起侧边栏"}
        </button>
      </Box>

      <Box sx={{ border: 1, borderColor: "divider", borderRadius: 1, p: 1 }}>
        <SubHeader
          title="Analytics"
          open={sections.analytics}
          onToggle={() => toggleSection("analytics")}
          iconName="bar-chart-outline"
          showArrow={true}
        />

        <SubHeader
          title="Settings"
          open={sections.settings}
          onToggle={() => toggleSection("settings")}
          iconName="settings-outline"
          showArrow={true}
        />

        <SubHeader
          title="Reports"
          open={sections.reports}
          onToggle={() => toggleSection("reports")}
          iconName="document-text-outline"
          showArrow={true}
        />
      </Box>
    </Paper>
  );
};

/**
 * 自定义样式示例
 * Custom styling example
 */
export const CustomStyledSubHeaderExample = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        自定义样式的 SubHeader
      </Typography>
      <SubHeader
        title="Custom Styled"
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        iconName="color-palette-outline"
        className="custom-subheader"
        showArrow={true}
      />
    </Paper>
  );
};

/**
 * 所有示例的组合展示
 * Combined display of all examples
 */
export const SubHeaderExamples = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        SubHeader 组件示例集合
      </Typography>

      <BasicSubHeaderExample />
      <IconSubHeaderExample />
      <DisabledSubHeaderExample />
      <ResponsiveSubHeaderExample />
      <CustomStyledSubHeaderExample />
    </Box>
  );
};

export default SubHeaderExamples;
