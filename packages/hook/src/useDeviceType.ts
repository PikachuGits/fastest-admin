import { useEffect, useMemo, useState } from 'react';

/**
 * 设备类型枚举
 * - mobile: 移动设备（手机）
 * - tablet: 平板设备
 * - desktop: 桌面设备（电脑）
 */
type DeviceType = 'mobile' | 'tablet' | 'desktop';

/**
 * 设备信息接口
 */
interface DeviceInfo {
    /** 设备类型 */
    type: DeviceType;
    /** 是否支持触摸 */
    isTouch: boolean;
}

/**
 * 解析用户代理字符串以确定设备类型
 * @param ua - 用户代理字符串
 * @returns 设备类型
 */
const parseUserAgent = (ua: string): DeviceType => {
    ua = ua.toLowerCase();

    // 检测移动设备
    if (/mobile|iphone|ipod|android.*mobile/.test(ua)) {
        return 'mobile';
    } 
    // 检测平板设备
    else if (/ipad|tablet|android(?!.*mobile)/.test(ua)) {
        return 'tablet';
    } 
    // 默认为桌面设备
    else {
        return 'desktop';
    }
};

/**
 * 异步检测设备类型
 * 优先使用现代的 User-Agent Client Hints API，
 * 如果不支持则回退到传统的 userAgent 解析
 * @returns Promise<DeviceType> 设备类型
 */
const detectDeviceType = async (): Promise<DeviceType> => {
    // SSR 环境下的回退处理
    if (typeof navigator === 'undefined') return 'desktop';

    // 尝试使用现代的 User-Agent Client Hints API
    if ((navigator as any).userAgentData?.getHighEntropyValues) {
        try {
            const data = await (navigator as any).userAgentData.getHighEntropyValues([
                'platform',
                'model',
                'mobile',
            ]);
            if (data.mobile) {
                // 特殊处理 iPad（在新版本中可能被标记为移动设备）
                if (/ipad/i.test(data.model)) return 'tablet';
                return 'mobile';
            } else {
                return 'desktop';
            }
        } catch {
            // API 调用失败时回退到传统方法
        }
    }

    // 回退到传统的 userAgent 解析
    return parseUserAgent(navigator.userAgent);
};

/**
 * 检测设备是否支持触摸
 * 通过多种方式检测触摸支持，确保兼容性
 * @returns boolean 是否支持触摸
 */
const isTouchDevice = (): boolean => {
    // SSR 环境下的回退处理
    if (typeof window === 'undefined') return false;
    
    return (
        // 检测触摸事件支持
        'ontouchstart' in window ||
        // 检测现代浏览器的触摸点数量
        (navigator as any).maxTouchPoints > 0 ||
        // 检测 IE/Edge 的触摸点数量
        (navigator as any).msMaxTouchPoints > 0
    );
};

/**
 * 设备类型检测 Hook
 * 
 * 用于检测当前设备的类型和触摸支持情况。
 * 支持 SSR，在服务端渲染时会返回默认值。
 * 
 * @returns DeviceInfo 包含设备类型和触摸支持信息
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { type, isTouch } = useDeviceType();
 *   
 *   if (type === 'mobile') {
 *     return <MobileLayout />;
 *   } else if (type === 'tablet') {
 *     return <TabletLayout />;
 *   } else {
 *     return <DesktopLayout />;
 *   }
 * }
 * ```
 */
export const useDeviceType = (): DeviceInfo => {
    // 设备类型状态，默认为桌面设备
    const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
    // 触摸支持状态，默认为不支持
    const [touch, setTouch] = useState(false);

    useEffect(() => {
        // 异步检测设备类型
        detectDeviceType().then(setDeviceType);
        // 同步检测触摸支持
        setTouch(isTouchDevice());
    }, []);

    // 使用 useMemo 优化性能，避免不必要的重新渲染
    return useMemo(() => {
        return {
            type: deviceType,
            isTouch: touch,
        };
    }, [deviceType, touch]);
};