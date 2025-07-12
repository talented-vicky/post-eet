import type { BaseResponse } from "../core/models/api/response.model";
import type { UserDashboard } from "../core/models/api/user.model";
import apiClient from "./base/apiClient";


const getUserDashboard = async () : Promise<BaseResponse<UserDashboard>> => {
    const response = await apiClient.get<BaseResponse<UserDashboard>>('/users/dashboard');
    return response.data;
}

const userApi = {
    getUserDashboard,
}

export default userApi;