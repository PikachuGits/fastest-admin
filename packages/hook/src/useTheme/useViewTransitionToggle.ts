import { useCallback, useEffect } from "react";

export function useViewTransitionToggle(
    isDark: boolean,
    setIsDark: (v: boolean) => void,
    className: string = "dark"
) {
    // 初始化时设置类名
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add(className);
        } else {
            root.classList.remove(className);
        }
    }, []); // 只在组件挂载时执行一次

    const toggleTheme = useCallback((event: MouseEvent) => {
        const isAppearanceTransition =
            // @ts-expect-error: startViewTransition is experimental
            document.startViewTransition &&
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!isAppearanceTransition || !event) {
            setIsDark(!isDark);
            // 没有 View Transition 时立即切换类名
            const root = document.documentElement;
            if (!isDark) {
                root.classList.add(className);
            } else {
                root.classList.remove(className);
            }
            return;
        }

        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        // 保存当前状态，用于动画方向判断
        const currentIsDark = isDark;
        const newIsDark = !isDark;

        const transition = document.startViewTransition(async () => {
            setIsDark(newIsDark);
            // 在 View Transition 回调中切换类名
            const root = document.documentElement;
            if (newIsDark) {
                root.classList.add(className);
            } else {
                root.classList.remove(className);
            }
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`
            ];

            document.documentElement.animate(
                {
                    clipPath: currentIsDark ? [...clipPath].reverse() : clipPath
                },
                {
                    duration: 450,
                    easing: "ease-in",
                    pseudoElement: currentIsDark
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)"
                }
            );
        });
    }, [isDark, setIsDark, className]);

    return toggleTheme;
}