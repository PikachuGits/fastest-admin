// src/api/services.ts
import request from '@/server/request';

export const fetchUserProfile = () => {
    return request.get('/user/profile');
};

export const login = (data: { username: string; password: string }) => {
    return request.post('/auth/login', data);
};
