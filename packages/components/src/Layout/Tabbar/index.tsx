import React, { useState } from 'react';
import { Tabs, Tab, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface TabItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  closable?: boolean;
}

interface TabbarProps {
  height: number;
  showIcon: boolean;
  theme: 'light' | 'dark';
}

const LayoutTabbar: React.FC<TabbarProps> = ({ height, showIcon, theme }) => {
  const [activeTab, setActiveTab] = useState('/dashboard');
  const [tabs, setTabs] = useState<TabItem[]>([
    { label: 'Dashboard', value: '/dashboard', closable: false },
    { label: 'User Management', value: '/user', closable: true },
    { label: 'Settings', value: '/settings', closable: true },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleTabClose = (value: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setTabs(tabs.filter((tab) => tab.value !== value));
    if (activeTab === value && tabs.length > 1) {
      const index = tabs.findIndex((tab) => tab.value === value);
      const nextTab = tabs[index + 1] || tabs[index - 1];
      setActiveTab(nextTab.value);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height,
        display: 'flex',
        alignItems: 'center',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ flex: 1 }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {showIcon && tab.icon}
                <span>{tab.label}</span>
                {/* {tab.closable && (
                  <IconButton
                    size="small"
                    onClick={(e) => handleTabClose(tab.value, e)}
                    sx={{ ml: 1, p: 0.25 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )} */}
              </Box>
            }
            value={tab.value}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default LayoutTabbar;
