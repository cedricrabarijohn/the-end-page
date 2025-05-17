const extraCookieOptions = "HttpOnly; Secure; SameSite=Strict";

export const addCookie = (name: string, value: string, expiration?: number, secured?: boolean) => {
    let cookieStr = `${name}=${value}; Path=/`;
    if (secured)
        cookieStr = `${cookieStr}; ${extraCookieOptions}`;
    if (expiration)
        cookieStr = `${cookieStr}; Max-Age=${expiration}`;
    return cookieStr;
};