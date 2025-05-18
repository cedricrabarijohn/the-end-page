export const PAGES_ROUTES = {
    HOME: '/',
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REGISTER: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    DASHBOARD: {
        ROOT: '/dashboard',
        PAGE: {
            EDIT: '/dashboard/page/edit',
        }
    },
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
        GET_DATAS: '/api/user/datas',
        GET_PROFILE: '/api/user/profile',
        UPDATE_PROFILE: '/api/user/profile/update',
        PAGES: {
            CREATE: '/api/user/pages/create',
            DELETE: '/api/user/pages/delete',
            GET: '/api/user/pages/get',
        }
    }
};

export const COOKIES = {
    TOKEN: 'jwt-token',
    CHECK_AUTH: 'check-auth',
};