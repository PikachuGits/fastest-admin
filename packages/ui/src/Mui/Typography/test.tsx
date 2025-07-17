// 测试导出是否正常工作
import React from "react";

// 测试从 Mui 目录导入
import { Typography, TypographyPresets } from "../index";
import type { TitleProps, TextProps } from "../index";

// 测试从根目录导入（模拟用户使用方式）
// import { Typography, TypographyPresets } from '@fastest/ui';

const TypographyTest: React.FC = () => {
  const titleProps: TitleProps = {
    level: 1,
    copyable: true,
    children: "测试标题",
  };

  const textProps: TextProps = {
    strong: true,
    type: "primary",
    children: "测试文本",
  };

  return (
    <div className="p-4">
      <Typography.Title {...titleProps} />
      <Typography.Text {...textProps} />

      <TypographyPresets.heroTitle>英雄标题测试</TypographyPresets.heroTitle>

      <Typography.Paragraph>
        这是一个测试段落，用于验证 Typography 组件是否正常工作。
      </Typography.Paragraph>

      <Typography.Link href="#" target="_blank">
        测试链接
      </Typography.Link>
    </div>
  );
};

export default TypographyTest;
