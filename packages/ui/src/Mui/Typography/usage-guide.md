# Typography 组件快速使用指南

## 🚀 快速开始

### 1. 导入组件

```typescript
// 从 @fastest/ui 导入
import { Typography, TypographyPresets } from "@fastest/ui";

// 导入类型（TypeScript 项目）
import type {
  TitleProps,
  ParagraphProps,
  TextProps,
  LinkProps,
} from "@fastest/ui";
```

### 2. 基础使用

```tsx
function App() {
  return (
    <div>
      {/* 标题 */}
      <Typography.Title level={1} copyable>
        我的应用标题
      </Typography.Title>

      {/* 段落 */}
      <Typography.Paragraph spacing="relaxed">
        这是应用的描述文字，支持多种样式和排版选项。
      </Typography.Paragraph>

      {/* 文本样式 */}
      <Typography.Text strong type="primary">
        重要提示
      </Typography.Text>

      {/* 链接 */}
      <Typography.Link href="/docs" target="_blank">
        查看文档
      </Typography.Link>
    </div>
  );
}
```

### 3. 预设样式

```tsx
function Hero() {
  return (
    <section>
      <TypographyPresets.heroTitle>
        欢迎使用我们的产品
      </TypographyPresets.heroTitle>

      <TypographyPresets.bodyText>
        这里是产品的详细介绍...
      </TypographyPresets.bodyText>
    </section>
  );
}
```

### 4. 类型安全

```tsx
import type { TitleProps } from "@fastest/ui";

const CustomTitle: React.FC<TitleProps> = (props) => {
  return <Typography.Title {...props} className="custom-styling" />;
};
```

## 🎯 常用模式

### 文章标题和内容

```tsx
<article>
  <Typography.Title level={1} copyable>
    文章标题
  </Typography.Title>

  <Typography.Text type="secondary" size="sm">
    发布时间：2024年1月1日
  </Typography.Text>

  <Typography.Paragraph spacing="relaxed">文章正文内容...</Typography.Paragraph>
</article>
```

### 错误提示

```tsx
<TypographyPresets.errorText>
  请检查输入信息是否正确
</TypographyPresets.errorText>
```

### 代码说明

```tsx
<Typography.Paragraph>
  运行 <TypographyPresets.inlineCode>npm start</TypographyPresets.inlineCode>
  启动开发服务器，或按
  <TypographyPresets.keyboardKey>Ctrl+C</TypographyPresets.keyboardKey>
  停止服务。
</Typography.Paragraph>
```

## 🔧 自定义主题

如果需要自定义样式，可以通过 className 覆盖默认样式：

```tsx
<Typography.Title
  level={1}
  className="text-gradient bg-gradient-to-r from-purple-500 to-pink-500"
>
  渐变色标题
</Typography.Title>
```

## 📱 响应式使用

```tsx
<Typography.Title level={1} className="text-2xl md:text-4xl lg:text-6xl">
  响应式标题
</Typography.Title>
```

## ⚡ 性能提示

1. 使用预设样式可以减少重复代码
2. 合理使用 `ellipsis` 属性处理长文本
3. 避免过度嵌套组件
4. 对于大量文本，考虑使用虚拟滚动

更多详细信息请查看完整的 [README.md](./README.md)。
