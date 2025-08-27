import apiClient from "./base/apiClient";
import type { MediaUploadData, NearbyPostsQuery, PostCommentData, PostCommentProps, PostCommentResponseData, PostCreateData, PostData, PostLikeData } from "../core/models/api/post.model";
import type { BaseResponse, PaginatedResponse } from "../core/models/api/response.model";
import type { BaseQuery } from "../core/models/api/query.model";


const createPost = async (body: PostCreateData): Promise<BaseResponse<PostData>> => {
    const response = await apiClient.post<BaseResponse<PostData>>(
        "/posts/create", body
    );
    return response.data;
}

const fetchPosts = async (body: BaseQuery): Promise<PaginatedResponse<PostData>> => {
    let url = '/posts?';
    if(body.page){url += `&page=${body.page}`};
    if(body.pageSize){url += `&pageSize=${body.pageSize}`};

    const response = await apiClient.get<PaginatedResponse<PostData>>(url);
    return response.data;
}

const fetchNearbyPosts = async (body: NearbyPostsQuery): Promise<PaginatedResponse<PostData>> => {
    let url = `/posts/nearby?latitude=${body.latitude}&longitude=${body.longitude}`;
    if(body.page){url += `&page${body.page}`};
    if(body.pageSize){url += `&pageSize${body.pageSize}`};
    if(body.radius){url += `&radius${body.radius}`};

    const response = await apiClient.get<PaginatedResponse<PostData>>(url);
    return response.data;
}

const likePost = async (postId: number): Promise<BaseResponse<PostLikeData>> => {
    const response = await apiClient.post<BaseResponse<PostLikeData>>(`/posts/${postId}/like`);
    return response.data;
}

const fetchComments = async (postId: number): Promise<PaginatedResponse<PostCommentData>> => {
    const response = await apiClient.get<PaginatedResponse<PostCommentData>>(`/comments/${postId}`);
    return response.data;
}

const commentPost = async (body: PostCommentProps): Promise<BaseResponse<PostCommentResponseData>> => {
    const response = await apiClient.post<BaseResponse<PostCommentResponseData>>(`/posts/comment`, body);
    return response.data;
}

const uploadMedia = async (body: FormData): Promise<BaseResponse<MediaUploadData>> => {
    const response = await apiClient.post<BaseResponse<MediaUploadData>>("/upload/media", body);
    return response.data;
}

const postApi = {
    createPost,
    fetchPosts,
    fetchNearbyPosts,
    likePost,
    fetchComments,
    commentPost,
    uploadMedia
}

export default postApi;