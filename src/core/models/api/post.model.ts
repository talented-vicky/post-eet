export interface PostData {
    id: number;
    title: string;
    content: string;
    views: number;
    likes: number;
    userId: number;
    username: string;
    email: string;
}

export interface PostLikeData {
    postId: number,
    postLike: number,
}

export interface PostCreateData {
    title: string;
    content: string;
}

export interface MediaUploadData {
    url: string;
    id: string;   
}