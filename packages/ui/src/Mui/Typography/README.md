# Typography 组件

一个功能丰富、可定制的文字排版组件集合，支持多种样式和交互功能。

## 🚀 特性

- ✅ **多组件支持**：Title、Paragraph、Text、Link
- ✅ **丰富的样式选项**：颜色、尺寸、字重、装饰
- ✅ **交互功能**：可复制、可编辑标题
- ✅ **响应式设计**：支持暗色模式
- ✅ **TypeScript 支持**：完整的类型定义
- ✅ **预设样式**：常用场景的快捷样式

## 📦 安装

```bash
npm install @fastest/ui
```

## 🎯 基础使用

### Title 标题

```tsx
import { Typography } from '@fastest/ui';

// 基础标题
<Typography.Title level={1}>主标题</Typography.Title>
<Typography.Title level={2}>副标题</Typography.Title>

// 可复制标题
<Typography.Title level={1} copyable>
  可复制的标题
</Typography.Title>

// 可编辑标题
<Typography.Title level={2} editable>
  可编辑的标题
</Typography.Title>

// 带颜色的标题
<Typography.Title level={3} type="primary">
  主色调标题
</Typography.Title>
```

### Paragraph 段落

```tsx
// 基础段落
<Typography.Paragraph>
  这是一个普通的段落文本。
</Typography.Paragraph>

// 不同间距的段落
<Typography.Paragraph spacing="tight">紧凑间距</Typography.Paragraph>
<Typography.Paragraph spacing="normal">正常间距</Typography.Paragraph>
<Typography.Paragraph spacing="relaxed">宽松间距</Typography.Paragraph>

// 带颜色的段落
<Typography.Paragraph type="secondary">
  次要色段落
</Typography.Paragraph>
```

### Text 文本

```tsx
// 基础文本样式
<Typography.Text>普通文本</Typography.Text>
<Typography.Text strong>粗体文本</Typography.Text>
<Typography.Text italic>斜体文本</Typography.Text>
<Typography.Text underline>下划线文本</Typography.Text>
<Typography.Text delete>删除线文本</Typography.Text>
<Typography.Text mark>高亮文本</Typography.Text>
<Typography.Text code>代码文本</Typography.Text>

// 键盘按键样式
<Typography.Text keyboard>Ctrl</Typography.Text>

// 不同颜色
<Typography.Text type="danger">错误文本</Typography.Text>
<Typography.Text type="warning">警告文本</Typography.Text>
<Typography.Text type="success">成功文本</Typography.Text>

// 不同尺寸
<Typography.Text size="xs">超小文本</Typography.Text>
<Typography.Text size="lg">大号文本</Typography.Text>

// 不同字重
<Typography.Text weight="light">细体</Typography.Text>
<Typography.Text weight="bold">粗体</Typography.Text>
```

### Link 链接

```tsx
// 基础链接
<Typography.Link href="https://example.com">
  外部链接
</Typography.Link>

// 新窗口打开
<Typography.Link href="https://example.com" target="_blank">
  新窗口链接
</Typography.Link>

// 无下划线链接
<Typography.Link href="#" underline={false}>
  无下划线链接
</Typography.Link>
```

## 🎨 样式属性

### 通用属性

| 属性        | 类型                                                                       | 默认值  | 说明            |
| ----------- | -------------------------------------------------------------------------- | ------- | --------------- |
| `type`      | `'secondary' \| 'warning' \| 'danger' \| 'success' \| 'primary' \| 'info'` | -       | 文本颜色类型    |
| `size`      | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`                 | -       | 文本尺寸        |
| `weight`    | `'light' \| 'normal' \| 'medium' \| 'semibold' \| 'bold'`                  | -       | 字体粗细        |
| `disabled`  | `boolean`                                                                  | `false` | 禁用状态        |
| `className` | `string`                                                                   | -       | 自定义 CSS 类名 |

### Title 专有属性

| 属性       | 类型                    | 默认值  | 说明       |
| ---------- | ----------------------- | ------- | ---------- |
| `level`    | `1 \| 2 \| 3 \| 4 \| 5` | `1`     | 标题级别   |
| `copyable` | `boolean`               | `false` | 是否可复制 |
| `editable` | `boolean`               | `false` | 是否可编辑 |

### Paragraph 专有属性

| 属性      | 类型                               | 默认值     | 说明     |
| --------- | ---------------------------------- | ---------- | -------- |
| `spacing` | `'tight' \| 'normal' \| 'relaxed'` | `'normal'` | 段落间距 |

### Text 专有属性

| 属性        | 类型      | 默认值  | 说明         |
| ----------- | --------- | ------- | ------------ |
| `strong`    | `boolean` | `false` | 粗体         |
| `italic`    | `boolean` | `false` | 斜体         |
| `underline` | `boolean` | `false` | 下划线       |
| `delete`    | `boolean` | `false` | 删除线       |
| `mark`      | `boolean` | `false` | 高亮         |
| `code`      | `boolean` | `false` | 代码样式     |
| `keyboard`  | `boolean` | `false` | 键盘按键样式 |
| `ellipsis`  | `boolean` | `false` | 文本省略     |

### Link 专有属性

| 属性        | 类型      | 默认值    | 说明           |
| ----------- | --------- | --------- | -------------- |
| `href`      | `string`  | -         | 链接地址       |
| `target`    | `string`  | `'_self'` | 打开方式       |
| `underline` | `boolean` | `true`    | 是否显示下划线 |

## 🔧 预设样式

为了提高开发效率，我们提供了一些常用的预设样式：

```tsx
import { TypographyPresets } from '@fastest/ui';

// 标题预设
<TypographyPresets.heroTitle>英雄标题</TypographyPresets.heroTitle>
<TypographyPresets.sectionTitle>章节标题</TypographyPresets.sectionTitle>
<TypographyPresets.cardTitle>卡片标题</TypographyPresets.cardTitle>

// 文本预设
<TypographyPresets.bodyText>正文内容</TypographyPresets.bodyText>
<TypographyPresets.captionText>说明文字</TypographyPresets.captionText>
<TypographyPresets.errorText>错误提示</TypographyPresets.errorText>

// 代码预设
<TypographyPresets.inlineCode>console.log()</TypographyPresets.inlineCode>
<TypographyPresets.keyboardKey>F12</TypographyPresets.keyboardKey>
```

## 🌙 暗色模式支持

所有组件都支持暗色模式，会自动根据系统主题切换颜色：

```tsx
// 这些样式会自动适配暗色模式
<Typography.Text mark>高亮文本</Typography.Text>
<Typography.Text code>代码文本</Typography.Text>
<Typography.Link href="#">链接文本</Typography.Link>
```

## 🎯 高级用法

### 组合使用

```tsx
<Typography.Paragraph>
  欢迎使用我们的产品！请查看
  <Typography.Link href="/docs">使用文档</Typography.Link>， 或者按 <Typography.Text
    keyboard
  >
    F1
  </Typography.Text> 获取帮助。 你也可以运行 <Typography.Text code>
    npm start
  </Typography.Text>
  来启动开发服务器。
</Typography.Paragraph>
```

### 自定义样式

```tsx
<Typography.Title
  level={2}
  className="text-gradient bg-gradient-to-r from-blue-500 to-purple-600"
>
  渐变色标题
</Typography.Title>

<Typography.Text
  className="border-2 border-dashed border-gray-300 p-2 rounded"
>
  带边框的文本
</Typography.Text>
```

### 响应式设计

```tsx
<Typography.Title
  level={1}
  className="text-2xl md:text-4xl lg:text-6xl"
>
  响应式标题
</Typography.Title>

<Typography.Paragraph ellipsis>
  这是一段很长的文本，在小屏幕上会自动截断并显示省略号...
</Typography.Paragraph>
```

## 📝 最佳实践

1. **语义化标签**：使用正确的标题级别保持文档结构清晰
2. **颜色使用**：谨慎使用颜色类型，避免过度装饰
3. **响应式**：在移动端注意文本的可读性
4. **可访问性**：确保足够的颜色对比度
5. **性能**：避免过度嵌套和重复样式

## 🔧 类型支持

```typescript
import type {
  BaseTypographyProps,
  TitleProps,
  ParagraphProps,
  TextProps,
  LinkProps,
} from "@fastest/ui";

// 自定义组件示例
const CustomTitle: React.FC<TitleProps> = (props) => {
  return <Typography.Title {...props} className="custom-title" />;
};
```

## 🎬 完整示例

查看 [example.tsx](./example.tsx) 了解所有功能的完整演示。

## 📋 更新日志

- **v1.0.0**: 初始版本，支持基础排版功能
- **v1.1.0**: 新增可复制、可编辑功能
- **v1.2.0**: 新增预设样式和更多定制选项
- **v1.3.0**: 优化暗色模式支持和响应式设计
