// Bị lỗi chưa dùng được
import * as request from '~/until/httpRequest';
export const login = async (username, password) => {
    try {
        return await request.post(
            'auth/login',
            JSON.stringify({ username: username, password: password }),
            {
                username: username,
                password: password,
            },
        );
    } catch (error) {
        return error.response.data;
    }
};
