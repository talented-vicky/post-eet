import type { BaseQuery } from "./query.model";

// ENUMS
export enum Visibility {
    Public = "Public",
    Private = "Private"
}

// DATA
export interface PostData {
    id: number;
    title: string;
    content: string;
    views: number;
    likes: number;
    comments: number;
    userId: number;
    username: string;
    email: string;
    imageUrls: PostImageData[];
}

interface PostImageData {
    id: number;
    url: string;
    postId: number;
    post: null;
}

export interface CommentData {
    id: number;
    content: string;
    username: string;
    commentedAt: string;
}

export interface PostLikeData {
    postId: number,
    postLike: number,
}

export interface PostCreateData {
    title: string;
    content: string;
    visibility: Visibility,
    latitude: number;
    longitude: number;
    imageUrls: string[];
}

export interface PostCommentData {
    id: string;
    content: string;
    username: string;
    commentedAt: string;
}

export interface PostCommentResponseData {
    id: number;
}

export interface MediaUploadData {
    url: string;
    id: string;   
}

// PROPS
export interface PostCommentProps {
    postId: number;
    content: string;
}

export interface NearbyPostsQuery extends BaseQuery {
    latitude: number;
    longitude: number;
    radius?: number;
}