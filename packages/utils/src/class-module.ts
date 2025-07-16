type StateProps = Record<string, boolean | [boolean, string?]>;
/**
 * 合并类名和状态类名
 * @param className
 * @param state
 */
export function classes_merge(className?: string | (string | undefined | null)[] | null, state?: StateProps): string {
    const base = Array.isArray(className) ? className.filter(Boolean) : className ? [className] : [];

    const dynamic = state
        ? Object.entries(state).flatMap(([key, value]) => {
            if (typeof value === 'boolean') {
                return value ? [key] : [];
            }
            if (Array.isArray(value) && value[0]) {
                return value[1] ? [value[1]] : [key];
            }
            return [];
        })
        : [];

    return [...base, ...dynamic].join(' ');
}

/**
 * 从 styles 对象中动态获取类名并返回一个拼接后的字符串
 * @param styles
 * @param classesString
 */
export function classes_module(styles: Record<string, string>, ...classesString: (string | false | undefined | null)[]) {
    return classesString
        .flatMap(item => (item ? item.split(' ') : [])) // 分割类名字符串为数组
        .map(item => item && (styles[item] || item)) // 从 styles 中获取类名，或者保留原始类名
        .filter(Boolean) // 过滤掉无效值
        .join(' '); // 拼接成字符串
}
