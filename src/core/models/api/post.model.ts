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
}

export interface PostCommentData {
    id: string;
    content: string;
    username: string;
    commentedAt: string;
}

export interface PostCommentProps {
    postId: number;
    content: string;
}

export interface PostCommentResponseData {
    id: number;
}

export interface MediaUploadData {
    url: string;
    id: string;   
}