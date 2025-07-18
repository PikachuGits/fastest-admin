import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Typography, Paper } from '@mui/material';
import { MenuListRefactored } from '../components/MenuList/MenuListRefactored';
import type { MenuVariant, MenuStyleVariantType } from '../types';

/**
 * 菜单组件使用示例
 * 展示不同变体和配置的使用方法
 */
export const MenuExamples: React.FC = () => {
  const [currentVariant, setCurrentVariant] = useState<MenuVariant>('default');
  const [currentStyleVariant, setCurrentStyleVariant] = useState<MenuStyleVariantType>('standard');

  const handleItemClick = (path: string, item: any) => {
    console.log('Item clicked:', { path, item });
  };

  const handleItemToggle = (path: string, isOpen: boolean) => {
    console.log('Item toggled:', { path, isOpen });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        菜单组件示例
      </Typography>
      
      {/* 变体选择器 */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          菜单变体 (功能配置)
        </Typography>
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          {(['default', 'collapsed', 'double', 'admin', 'guest'] as MenuVariant[]).map((variant) => (
            <Button
              key={variant}
              variant={currentVariant === variant ? 'contained' : 'outlined'}
              onClick={() => setCurrentVariant(variant)}
            >
              {variant}
            </Button>
          ))}
        </ButtonGroup>
        
        <Typography variant="h6" gutterBottom>
          样式变体 (外观配置)
        </Typography>
        <ButtonGroup variant="outlined">
          {(['standard', 'collapsed', 'double', 'grid'] as MenuStyleVariantType[]).map((styleVariant) => (
            <Button
              key={styleVariant}
              variant={currentStyleVariant === styleVariant ? 'contained' : 'outlined'}
              onClick={() => setCurrentStyleVariant(styleVariant)}
            >
              {styleVariant}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* 当前配置说明 */}
      <Paper sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
        <Typography variant="subtitle1" gutterBottom>
          当前配置: {currentVariant} + {currentStyleVariant}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {getVariantDescription(currentVariant, currentStyleVariant)}
        </Typography>
      </Paper>

      {/* 菜单展示 */}
      <Paper sx={{ p: 2, display: 'inline-block' }}>
        <MenuListRefactored
          variant={currentVariant}
          styleVariant={currentStyleVariant}
          onItemClick={handleItemClick}
          onItemToggle={handleItemToggle}
        />
      </Paper>
    </Box>
  );
};

// 获取变体描述
function getVariantDescription(variant: MenuVariant, styleVariant: MenuStyleVariantType): string {
  const variantDescriptions = {
    default: '默认配置，适合大多数场景',
    collapsed: '收起状态，节省空间',
    double: '双列布局，展示更多内容',
    admin: '管理员模式，展开所有权限项',
    guest: '访客模式，限制访问权限',
  };
  
  const styleDescriptions = {
    standard: '标准单列样式，最大宽度360px',
    collapsed: '收起样式，宽度64px，只显示图标',
    double: '双列网格布局，最大宽度720px',
    grid: '网格布局，适合大屏展示',
  };
  
  return `${variantDescriptions[variant]} + ${styleDescriptions[styleVariant]}`;
}

export default MenuExamples;