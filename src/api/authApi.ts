import apiClient from "./base/apiClient";
import type { LoginReq, LoginRes } from "../core/models/api/auth.api.model";
import type { BaseResponse } from "../core/models/api/response.model";


const login = async (body: LoginReq) : Promise<BaseResponse<LoginRes>> => {
    const response = await apiClient.post<BaseResponse<LoginRes>>(
        '/auth/login', 
        body
    );
    return response.data;
}


const authApi = {
    login,
}

export default authApi;