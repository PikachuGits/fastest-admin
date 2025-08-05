import { useState, useEffect } from "react";

export function AppInitializer({ children }: { children: React.ReactNode }) {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const init = async () => {
            // 模拟异步任务：获取配置、用户信息、权限、语言包等
            await Promise.all([
                // fetchAppConfig(),
                // checkAuthToken(),
                // loadLocaleResources(),
            ]);
            setInitialized(true);
        };
        init();
    }, []);

    if (!initialized) {
        return <div>1</div>; // 初始加载界面
    }

    return <>{children}</>;
}