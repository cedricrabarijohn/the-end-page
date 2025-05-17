import { API_ROUTES } from "@/globals";
import { encryptObject } from "@/utils/encryption";
import axios from "axios";

export const register = async (firstname: string, lastname: string, email: string, password: string) => {
    const response = await axios.post(API_ROUTES.AUTH.REGISTER, {
        data: encryptObject({
            firstname,
            lastname,
            email,
            password,
        })
    });
    return response;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(API_ROUTES.AUTH.LOGIN, {
        data: encryptObject({
            email,
            password,
        })
    });
    return response;
};
