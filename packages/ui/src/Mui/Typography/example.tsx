import React from "react";
import { Typography, TypographyPresets } from "./index";

const TypographyExample = () => {
  return (
    <div className="p-8 space-y-8 max-w-4xl">
      {/* 标题示例 */}
      <section>
        <Typography.Title level={1} className="mb-6">
          Typography 组件示例
        </Typography.Title>

        <div className="space-y-4">
          <Typography.Title level={1} copyable>
            可复制的主标题 (H1)
          </Typography.Title>
          <Typography.Title level={2} editable>
            可编辑的副标题 (H2)
          </Typography.Title>
          <Typography.Title level={3} type="primary">
            主色调标题 (H3)
          </Typography.Title>
          <Typography.Title level={4} type="success">
            成功色标题 (H4)
          </Typography.Title>
          <Typography.Title level={5} type="warning">
            警告色标题 (H5)
          </Typography.Title>
        </div>
      </section>

      {/* 段落示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          段落组件
        </Typography.Title>

        <Typography.Paragraph spacing="relaxed">
          这是一个宽松间距的段落。Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Typography.Paragraph>

        <Typography.Paragraph spacing="normal">
          这是一个正常间距的段落。Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography.Paragraph>

        <Typography.Paragraph spacing="tight" type="secondary">
          这是一个紧凑间距的次要色段落。Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography.Paragraph>
      </section>

      {/* 文本样式示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          文本样式
        </Typography.Title>

        <div className="space-y-2">
          <Typography.Paragraph>
            <Typography.Text>普通文本 </Typography.Text>
            <Typography.Text strong>粗体文本 </Typography.Text>
            <Typography.Text italic>斜体文本 </Typography.Text>
            <Typography.Text underline>下划线文本 </Typography.Text>
            <Typography.Text delete>删除线文本 </Typography.Text>
            <Typography.Text mark>高亮文本 </Typography.Text>
            <Typography.Text code>代码文本</Typography.Text>
          </Typography.Paragraph>

          <Typography.Paragraph>
            <Typography.Text keyboard>Ctrl</Typography.Text> +
            <Typography.Text keyboard>C</Typography.Text> 复制
          </Typography.Paragraph>

          <Typography.Paragraph>
            <Typography.Text type="danger">错误文本 </Typography.Text>
            <Typography.Text type="warning">警告文本 </Typography.Text>
            <Typography.Text type="success">成功文本 </Typography.Text>
            <Typography.Text type="secondary">次要文本 </Typography.Text>
            <Typography.Text disabled>禁用文本</Typography.Text>
          </Typography.Paragraph>
        </div>
      </section>

      {/* 链接示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          链接组件
        </Typography.Title>

        <div className="space-y-2">
          <Typography.Paragraph>
            访问{" "}
            <Typography.Link href="https://react.dev" target="_blank">
              React 官网
            </Typography.Link>{" "}
            了解更多信息。
          </Typography.Paragraph>

          <Typography.Paragraph>
            <Typography.Link href="#" underline={false}>
              无下划线链接
            </Typography.Link>
          </Typography.Paragraph>
        </div>
      </section>

      {/* 尺寸示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          文本尺寸
        </Typography.Title>

        <div className="space-y-2">
          <Typography.Text size="xs">超小号文本 (xs)</Typography.Text>
          <br />
          <Typography.Text size="sm">小号文本 (sm)</Typography.Text>
          <br />
          <Typography.Text size="base">基础文本 (base)</Typography.Text>
          <br />
          <Typography.Text size="lg">大号文本 (lg)</Typography.Text>
          <br />
          <Typography.Text size="xl">超大号文本 (xl)</Typography.Text>
          <br />
          <Typography.Text size="2xl">2倍大文本 (2xl)</Typography.Text>
          <br />
          <Typography.Text size="3xl">3倍大文本 (3xl)</Typography.Text>
        </div>
      </section>

      {/* 字重示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          字体粗细
        </Typography.Title>

        <div className="space-y-2">
          <Typography.Text weight="light">细体文本 (light)</Typography.Text>
          <br />
          <Typography.Text weight="normal">正常文本 (normal)</Typography.Text>
          <br />
          <Typography.Text weight="medium">中等文本 (medium)</Typography.Text>
          <br />
          <Typography.Text weight="semibold">
            半粗体文本 (semibold)
          </Typography.Text>
          <br />
          <Typography.Text weight="bold">粗体文本 (bold)</Typography.Text>
        </div>
      </section>

      {/* 预设样式示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          预设样式
        </Typography.Title>

        <div className="space-y-4">
          <TypographyPresets.heroTitle>
            英雄标题样式
          </TypographyPresets.heroTitle>
          <TypographyPresets.sectionTitle>
            章节标题样式
          </TypographyPresets.sectionTitle>
          <TypographyPresets.cardTitle>
            卡片标题样式
          </TypographyPresets.cardTitle>

          <TypographyPresets.bodyText>
            这是正文文本的预设样式，适合大部分内容展示场景。
          </TypographyPresets.bodyText>

          <TypographyPresets.captionText>
            这是说明文字的预设样式
          </TypographyPresets.captionText>

          <TypographyPresets.errorText>
            这是错误提示的预设样式
          </TypographyPresets.errorText>

          <div>
            使用{" "}
            <TypographyPresets.inlineCode>
              console.log()
            </TypographyPresets.inlineCode>
            打印日志，或按{" "}
            <TypographyPresets.keyboardKey>F12</TypographyPresets.keyboardKey>
            打开开发者工具。
          </div>
        </div>
      </section>

      {/* 响应式示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          响应式文本
        </Typography.Title>

        <Typography.Paragraph ellipsis>
          这是一个很长的文本，在小屏幕上会被截断并显示省略号。Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </Typography.Paragraph>
      </section>

      {/* 组合使用示例 */}
      <section>
        <Typography.Title level={2} className="mb-4">
          组合使用示例
        </Typography.Title>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
          <Typography.Title level={3} className="mb-3">
            产品特性
          </Typography.Title>

          <Typography.Paragraph>我们的产品具有以下特性：</Typography.Paragraph>

          <ul className="space-y-2 ml-4">
            <li>
              <Typography.Text strong>高性能</Typography.Text>：
              <Typography.Text type="secondary">
                基于现代框架构建，响应速度快
              </Typography.Text>
            </li>
            <li>
              <Typography.Text strong>易用性</Typography.Text>：
              <Typography.Text type="secondary">
                直观的用户界面，上手简单
              </Typography.Text>
            </li>
            <li>
              <Typography.Text strong>可扩展</Typography.Text>：
              <Typography.Text type="secondary">
                模块化设计，支持自定义扩展
              </Typography.Text>
            </li>
          </ul>

          <Typography.Paragraph className="mt-4">
            了解更多信息，请查看
            <Typography.Link href="/docs">使用文档</Typography.Link>或{" "}
            <Typography.Text code>npm install @fastest/ui</Typography.Text>
            开始使用。
          </Typography.Paragraph>
        </div>
      </section>
    </div>
  );
};

export default TypographyExample;
