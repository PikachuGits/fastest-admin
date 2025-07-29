// 通用工具类型定义

/**
 * 深度可选类型
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度必需类型
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 排除 null 和 undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 函数类型
 */
export type Fn = () => void;
export type AnyFn = (...args: any[]) => any;

/**
 * 对象键值类型
 */
export type ObjectKeys<T> = keyof T;
export type ObjectValues<T> = T[keyof T];

/**
 * 字符串字面量联合类型
 */
export type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;

/**
 * 数组元素类型
 */
export type ArrayElement<T> = T extends (infer U)[] ? U : never;

/**
 * Promise 解包类型
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;