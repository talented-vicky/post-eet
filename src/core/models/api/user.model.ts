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