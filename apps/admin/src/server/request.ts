import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'; // 👈 类型导入
// 可拓展的后端统一响应结构
interface ApiResponse<T = any> {
    code: number;
    message: string;
    data: T;
    errors?: Record<string, string>; // 字段错误结构
}

const request = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器：注入 token
request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 响应拦截器：解包 + 错误处理
request.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
        const { code, message, data, errors } = response.data;

        if (code === 200) {
            return data;
        } else {
            // 如果后端返回字段级错误，抛出整个响应体
            const error = new Error(message) as any;
            error.response = { code, message, errors };
            throw error;
        }
    },
    (error: AxiosError) => {
        // 网络错误处理
        if (!error.response) {
            alert('网络异常，请检查你的连接');
            return Promise.reject(error);
        }

        const status = error.response.status;

        if (status === 401) {
            alert('登录失效，请重新登录');
            // 可跳转登录页
        } else if (status >= 500) {
            alert('服务器异常，请稍后重试');
        }

        return Promise.reject(error);
    }
);

export default request;
