import React from "react";
import clsx from "clsx";

// type 映射到颜色
const typeClassMap: Record<string, string> = {
  secondary: "text-gray-500",
  warning: "text-yellow-600",
  danger: "text-red-600",
  success: "text-green-600",
  primary: "text-blue-600",
  info: "text-cyan-600",
};

// 标题级别对应的样式
const titleLevelStyles: Record<number, string> = {
  1: "text-4xl font-bold leading-tight",
  2: "text-3xl font-bold leading-tight",
  3: "text-2xl font-semibold leading-tight",
  4: "text-xl font-semibold leading-tight",
  5: "text-lg font-medium leading-tight",
};

interface BaseTypographyProps extends React.HTMLAttributes<HTMLElement> {
  type?: keyof typeof typeClassMap;
  underline?: boolean;
  delete?: boolean;
  code?: boolean;
  mark?: boolean;
  strong?: boolean;
  italic?: boolean;
  disabled?: boolean;
  ellipsis?: boolean;
  as?: React.ElementType;
  children?: React.ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  // 允许传递链接相关属性
  href?: string;
  target?: string;
  rel?: string;
}

const sizeClassMap: Record<string, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
};

const weightClassMap: Record<string, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const BaseTypography = ({
  type,
  underline,
  delete: del,
  code,
  mark,
  strong,
  italic,
  disabled,
  ellipsis,
  as: Component = "span",
  className,
  children,
  size,
  weight,
  ...rest
}: BaseTypographyProps) => {
  const classes = clsx(
    // 基础样式
    "transition-colors duration-200",
    // 类型颜色
    type && typeClassMap[type],
    // 尺寸
    size && sizeClassMap[size],
    // 字重
    weight && weightClassMap[weight],
    // 文本装饰
    {
      "line-through": del,
      underline: underline,
      italic: italic,
      "font-bold": strong,
      "opacity-50 cursor-not-allowed": disabled,
      "truncate ": ellipsis,
      "bg-yellow-200 dark:bg-yellow-800 px-1 rounded-sm": mark,
      "font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded-sm text-sm border":
        code,
    },
    className
  );

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};

// Title 组件
interface TitleProps extends Omit<BaseTypographyProps, "as"> {
  level?: 1 | 2 | 3 | 4 | 5;
  copyable?: boolean;
  editable?: boolean;
}

const Title = ({
  level = 1,
  copyable = false,
  editable = false,
  children,
  className,
  ...props
}: TitleProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [content, setContent] = React.useState(children as string);

  const handleCopy = React.useCallback(() => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
      // TODO: 可以添加toast提示
    }
  }, [content]);

  const handleEdit = React.useCallback(() => {
    if (editable) {
      setIsEditing(true);
    }
  }, [editable]);

  const handleSave = React.useCallback(() => {
    setIsEditing(false);
    // TODO: 可以添加onChange回调
  }, []);

  const tag = `h${level}` as React.ElementType;

  const titleClasses = clsx(
    titleLevelStyles[level],
    "mb-2",
    {
      "hover:bg-gray-50 dark:hover:bg-gray-800 rounded px-1 cursor-pointer":
        editable,
    },
    className
  );

  if (isEditing) {
    return (
      <input
        type="text"
        value={content as string}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleSave}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
        className={clsx(
          titleClasses,
          "border-none outline-none bg-transparent"
        )}
        autoFocus
      />
    );
  }

  return (
    <div className="group relative">
      <BaseTypography
        as={tag}
        className={titleClasses}
        onClick={handleEdit}
        {...props}
      >
        {content}
      </BaseTypography>

      {/* 操作按钮 */}
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
        {copyable && (
          <button
            onClick={handleCopy}
            className="p-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="复制"
          >
            📋
          </button>
        )}
        {editable && (
          <button
            onClick={handleEdit}
            className="p-1 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="编辑"
          >
            ✏️
          </button>
        )}
      </div>
    </div>
  );
};

// Paragraph 组件
interface ParagraphProps extends BaseTypographyProps {
  spacing?: "tight" | "normal" | "relaxed";
}

const Paragraph = ({
  spacing = "normal",
  className,
  ...props
}: ParagraphProps) => {
  const spacingClasses = {
    tight: "mb-1 leading-tight",
    normal: "mb-2 leading-normal",
    relaxed: "mb-4 leading-relaxed",
  };

  return (
    <BaseTypography
      as="p"
      className={clsx(spacingClasses[spacing], className)}
      {...props}
    />
  );
};

// Text 组件
interface TextProps extends BaseTypographyProps {
  keyboard?: boolean;
  link?: boolean;
  href?: string;
}

const Text = ({
  keyboard = false,
  link = false,
  href,
  className,
  ...props
}: TextProps) => {
  const textClasses = clsx(
    {
      "font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded border text-sm":
        keyboard,
      "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 cursor-pointer underline":
        link,
    },
    className
  );

  if (link && href) {
    return (
      <BaseTypography as="a" href={href} className={textClasses} {...props} />
    );
  }

  return <BaseTypography as="span" className={textClasses} {...props} />;
};

// Link 组件
interface LinkProps extends BaseTypographyProps {
  href?: string;
  target?: string;
  underline?: boolean;
}

const Link = ({
  href,
  target = "_self",
  underline = true,
  className,
  ...props
}: LinkProps) => {
  const linkClasses = clsx(
    "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer",
    {
      underline: underline,
      "no-underline hover:underline": !underline,
    },
    className
  );

  return (
    <BaseTypography
      as="a"
      href={href}
      target={target}
      className={linkClasses}
      {...props}
    />
  );
};

// Typography 组合
export const Typography = {
  Title,
  Paragraph,
  Text,
  Link,
  Base: BaseTypography,
};

// 导出类型
export type {
  BaseTypographyProps,
  TitleProps,
  ParagraphProps,
  TextProps,
  LinkProps,
};

// 预设样式组合
export const TypographyPresets = {
  // 标题预设
  heroTitle: (props: TitleProps) => (
    <Title
      level={1}
      size="3xl"
      weight="bold"
      className="text-center mb-6"
      {...props}
    />
  ),

  sectionTitle: (props: TitleProps) => (
    <Title level={2} size="2xl" weight="semibold" className="mb-4" {...props} />
  ),

  cardTitle: (props: TitleProps) => (
    <Title level={3} size="lg" weight="medium" className="mb-2" {...props} />
  ),

  // 文本预设
  bodyText: (props: ParagraphProps) => (
    <Paragraph size="base" spacing="normal" {...props} />
  ),

  captionText: (props: TextProps) => (
    <Text size="sm" type="secondary" {...props} />
  ),

  errorText: (props: TextProps) => <Text size="sm" type="danger" {...props} />,

  // 代码预设
  inlineCode: (props: TextProps) => <Text code size="sm" {...props} />,

  keyboardKey: (props: TextProps) => <Text keyboard size="sm" {...props} />,
};
