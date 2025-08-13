import apiClient from "./base/apiClient";

import type { LoginParams, signUpParams } from "../core/models/api/auth.api.model";
import type { BaseResponse } from "../core/models/api/response.model";
import type { User } from "../core/models/api/user.model";


const login = async (body: LoginParams) : Promise<BaseResponse<string>> => {
    const response = await apiClient.post<BaseResponse<string>>(
        '/auth/login', 
        body
    );
    return response.data;
}

const signUp = async (body: signUpParams) : Promise<BaseResponse<User>> => {
    const response = await apiClient.post<BaseResponse<User>>(
        '/auth/signup', 
        body
    );
    return response.data;
}

const authApi = {
    login,
    signUp,
}

export default authApi;