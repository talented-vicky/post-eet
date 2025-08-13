import type { CommentData, PostData } from "./post.model";

export interface User {
    id: number;
    usename: string;
    email: string;
    comments: CommentData[];
    posts: PostData[];
}

export interface UserDashboard {
    id: number;
    postCount: number;
    totalComments: number;
    username: string;
    email: string;
    anylytics: AnalyticsData;
    recentPosts: RecentPostsData
}

interface AnalyticsData {
    totalViews: number;
    totalLikes: number;
}

interface RecentPostsData {
    id: number;
    title: string;
    content: string;
    likes: number;
    views: number;
    createdAt: Date;
}