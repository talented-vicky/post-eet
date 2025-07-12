import apiClient from "./base/apiClient";
import type { PostData, PostLikeData } from "../core/models/api/post.model";
import type { BaseResponse, PaginatedResponse } from "../core/models/api/response.model";


const fetchPosts = async () : Promise<PaginatedResponse<PostData>> => {
    const response = await apiClient.get<PaginatedResponse<PostData>>('/posts');
    return response.data;
}

const likePost = async (postId: number) : Promise<BaseResponse<PostLikeData>> => {
    const response = await apiClient.post<BaseResponse<PostLikeData>>(`/posts/${postId}/like`);
    return response.data;
}

const postApi = {
    fetchPosts,
    likePost,
}

export default postApi;