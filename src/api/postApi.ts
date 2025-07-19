import apiClient from "./base/apiClient";
import type { MediaUploadData, PostCreateData, PostData, PostLikeData } from "../core/models/api/post.model";
import type { BaseResponse, PaginatedResponse } from "../core/models/api/response.model";


const createPost = async (body: PostCreateData) : Promise<BaseResponse<PostData>> => {
    const response = await apiClient.post<BaseResponse<PostData>>(
        "/posts/create", body
    );
    return response.data;
}

const fetchPosts = async () : Promise<PaginatedResponse<PostData>> => {
    const response = await apiClient.get<PaginatedResponse<PostData>>('/posts');
    return response.data;
}

const likePost = async (postId: number) : Promise<BaseResponse<PostLikeData>> => {
    const response = await apiClient.post<BaseResponse<PostLikeData>>(`/posts/${postId}/like`);
    return response.data;
}

const uploadMedia = async (body: FormData): Promise<BaseResponse<MediaUploadData>> => {
    const response = await apiClient.post<BaseResponse<MediaUploadData>>("/upload/media", body);
    return response.data;
}

const postApi = {
    createPost,
    fetchPosts,
    likePost,
    uploadMedia
}

export default postApi;