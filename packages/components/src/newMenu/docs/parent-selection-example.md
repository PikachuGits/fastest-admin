# 父级菜单选中效果示例

## 功能说明

现在菜单系统支持完整的父级选中效果：

- **菜单项父级选中**: 当选中某个子菜单项时，其父级菜单项也会显示选中状态
- **分组标题选中**: 当分组下任何菜单项被选中时，分组标题（SubHeader）也会显示选中状态

## 工作原理

### 菜单项选中逻辑

1. **选中逻辑**: 使用 `shouldMenuItemShowSelected` 函数来判断菜单项是否应该显示选中状态
2. **递归检查**: 函数会递归检查菜单项的所有子项，如果任何子项被选中，父项也会显示选中状态
3. **直接选中**: 如果菜单项本身被选中，也会显示选中状态

### 分组标题选中逻辑

1. **分组检查**: 使用 `isMenuSectionContainsSelected` 函数来判断分组是否包含选中项
2. **全面扫描**: 函数会检查分组下所有菜单项（包括嵌套子项），如果任何项被选中，分组标题就会显示选中状态

## 测试场景

### 场景 1：选中子菜单项

- 选中 "Profile" (id: 111)
- 预期结果：
  - "Profile" 显示选中状态
  - "用户列表" (id: 11) 也显示选中状态
  - "用户管理" 分组标题也显示选中状态

### 场景 2：选中父菜单项

- 选中 "用户列表" (id: 11)
- 预期结果：
  - "用户列表" 显示选中状态
  - "用户管理" 分组标题也显示选中状态

### 场景 3：选中无关菜单项

- 选中 "公司列表" (id: 21)
- 预期结果：
  - "公司列表" 显示选中状态
  - "公司管理" 分组标题显示选中状态
  - "用户列表" 不显示选中状态
  - "用户管理" 分组标题不显示选中状态

## 代码示例

```typescript
import { shouldMenuItemShowSelected, isMenuSectionContainsSelected } from "../utils/menuUtils";

// 菜单项选中状态
const isMenuItemSelected = shouldMenuItemShowSelected(item, selected);

// 分组标题选中状态
const isSubHeaderSelected = isMenuSectionContainsSelected(section, selected);

// 传递给组件
<MenuItem
  item={item}
  selected={isMenuItemSelected}
  // ... 其他属性
/>

<SubHeader
  title={section.subheader}
  selected={isSubHeaderSelected}
  // ... 其他属性
/>
```

## 相关文件

- `utils/menuUtils.ts` - 选中逻辑工具函数
- `Menu.tsx` - 主菜单组件
- `components/SubHeader/SubHeader.tsx` - 分组标题组件
- `components/MenuItem/MenuItemGroup.tsx` - 菜单项组组件
- `components/MenuItem/MenuFloating.tsx` - 悬浮菜单组件
- `types/index.ts` - 类型定义文件
