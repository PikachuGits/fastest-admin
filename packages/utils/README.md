# Utils Package

这个包提供了一些实用的工具函数。

## class-module.ts

### classes_merge

合并类名和状态类名的工具函数。

#### 参数

- `className` (可选): 基础类名，可以是字符串、字符串数组或 null
- `state` (可选): 状态对象，键为类名，值为布尔值或 [布尔值, 可选字符串] 的元组

#### 返回值

返回合并后的类名字符串。

#### 使用示例

```typescript
import { classes_merge } from '@packages/utils';

// 基础用法
const result1 = classes_merge('btn');
console.log(result1); // 'btn'

// 使用数组类名
const result2 = classes_merge(['btn', 'primary', null, undefined]);
console.log(result2); // 'btn primary'

// 使用状态对象
const result3 = classes_merge('btn', {
  'active': true,
  'disabled': false,
  'loading': [true, 'btn-loading']
});
console.log(result3); // 'btn active btn-loading'

// 复合使用
const result4 = classes_merge(['btn', 'primary'], {
  'hover': true,
  'focus': [false],
  'error': [true, 'btn-error']
});
console.log(result4); // 'btn primary hover btn-error'
```

### classes_module

从 CSS Modules 样式对象中动态获取类名并返回拼接后的字符串。

#### 参数

- `styles`: CSS Modules 样式对象
- `...classesString`: 可变参数，类名字符串（可以包含空格分隔的多个类名）

#### 返回值

返回处理后的类名字符串。

#### 使用示例

```typescript
import { classes_module } from '@packages/utils';
import styles from './Button.module.css';

// 假设 styles 对象如下：
// {
//   'btn': 'Button_btn__abc123',
//   'primary': 'Button_primary__def456',
//   'large': 'Button_large__ghi789'
// }

// 基础用法
const result1 = classes_module(styles, 'btn');
console.log(result1); // 'Button_btn__abc123'

// 多个类名
const result2 = classes_module(styles, 'btn primary');
console.log(result2); // 'Button_btn__abc123 Button_primary__def456'

// 使用多个参数
const result3 = classes_module(styles, 'btn', 'primary large');
console.log(result3); // 'Button_btn__abc123 Button_primary__def456 Button_large__ghi789'

// 处理不存在的类名（会保留原始类名）
const result4 = classes_module(styles, 'btn custom-class');
console.log(result4); // 'Button_btn__abc123 custom-class'

// 处理 falsy 值
const result5 = classes_module(styles, 'btn', false, undefined, null, 'primary');
console.log(result5); // 'Button_btn__abc123 Button_primary__def456'

// 在 React 组件中的实际使用
function Button({ variant, size, className }) {
  return (
    <button 
      className={classes_module(
        styles, 
        'btn', 
        variant && `btn-${variant}`, 
        size && `btn-${size}`,
        className
      )}
    >
      Click me
    </button>
  );
}
```

## 安装和使用

```bash
# 在 monorepo 中，这个包会被自动链接
# 在其他应用中使用：
import { classes_merge, classes_module } from '@packages/utils';
```