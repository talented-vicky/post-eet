import apiClient from "./base/apiClient";
import type { LoginReq } from "../core/models/api/auth.api.model";
import type { BaseResponse } from "../core/models/api/response.model";


const login = async (body: LoginReq) : Promise<BaseResponse<string>> => {
    const response = await apiClient.post<BaseResponse<string>>(
        '/auth/login', 
        body
    );
    return response.data;
}

const authApi = {
    login,
}

export default authApi;