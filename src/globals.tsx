export const PAGES_ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    DASHBOARD: '/dashboard',
}

export const API_ROUTES = {
    AUTH: {
        LOGIN: '/api/auth/login',
        LOGOUT: '/api/auth/logout',
        REGISTER: '/api/auth/register',
        FORGOT_PASSWORD: '/api/auth/forgot-password',
        RESET_PASSWORD: '/api/auth/reset-password',
    },
    DASHBOARD: {
        GET_DATA: '/api/dashboard/data',
    },
    USER: {
        GET_PROFILE: '/api/user/profile',
        UPDATE_PROFILE: '/api/user/profile/update',
    }
};