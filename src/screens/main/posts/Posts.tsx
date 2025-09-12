import { useEffect, useState } from "react";

import Title from "../../../components/common/Title";
import Sidebar from "../../../components/navigation/Sidebar";
import CommentDialog from "../../../components/dialogs/CommentDialog";

import tempImg from '../../../assets/images/bg/post-eet.webp';
import heartImg from '../../../assets/icons/post/heart.svg';
import heartLikedImg from '../../../assets/icons/post/heart-liked.svg';
import showImg from '../../../assets/icons/post/show.svg';
import chatImg from '../../../assets/icons/post/chat.svg';

import type { NearbyPostsQuery, PostData } from "../../../core/models/api/post.model";

import { useNotifStore } from "../../../core/store/notif.store";
import { useCommentStore } from "../../../core/store/comment.store";

import postApi from "../../../api/postApi";
import type { BaseQuery } from "../../../core/models/api/query.model";
import { TextButton } from "../../../components/common/TextButton";
import { useNavigate } from "react-router-dom";


function Posts() {
    const navigate = useNavigate();
    const { showNotif } = useNotifStore();
    const { showPost } = useCommentStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [queryParams, setQueryParams] = useState<BaseQuery>({ page: 1, pageSize: 3 });
    const [locationParams, setLocationParams] = useState<NearbyPostsQuery>({ page: 1, pageSize: 3, latitude: 1.327, longitude: 4.567 });
    const [selectedPostId, setSelectedPostId] = useState<number>(0);
    const [postData, setPostData] = useState<PostData[]>([]);


    useEffect(() => {
        const apiCalls = [fetchPosts(queryParams)];
        Promise.all(apiCalls);
    }, [])


    const handleLoadPosts = async () => {
        const newParams = { page: queryParams.page + 1, pageSize: 3 }
        setQueryParams(newParams);
        fetchPosts(newParams, true)
    }

    const handlePostLike = async (postId: number) => {
        try {
            const res = await postApi.likePost(postId);
            if (res.status) {
                fetchPosts(queryParams);
                showNotif("Success", `${res.message}`, "notif");
            }
        } catch (error: any) {
            showNotif(`${error?.response?.statusText}`, `${error?.response?.data?.message}`, "error");
            navigate('/login');
        }
    }

    const fetchPosts = async (params: BaseQuery, appending = false) => {
        setIsLoading(true);
        try {
            const res = await postApi.fetchPosts(params);
            if (res.data) {
                setPostData(prevPosts => appending ? [...prevPosts, ...res.data] : res.data)
            }
        } catch (error) {
            showNotif("Error", "Error Loading Posts", "error");
        } finally {
            setIsLoading(false)
        }
    }

    const fetchNearbyPosts = async (params: NearbyPostsQuery) => {
        setIsLoading(true);
        try {
            params.latitude = 3.223; params.longitude = 5.331;
            const res = await postApi.fetchNearbyPosts(params);
            if (res.data) {
                console.log(res.data);
            }
        } catch (error) {
            showNotif("Error", "Error Fetching Nearby Posts", "error");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex w-[95vw] gap-2 text-gray-main bg-white border border-gray-100 shadow-xl rounded-xl p-3">
            <Sidebar />
            <CommentDialog postId={selectedPostId} />
            <div className="w-4/5 flex flex-col">
                <Title text="All Posts" />
                <div className="flex p-3 bg-gray-light rounded-xl h-full">
                    <div className="w-1/2 h-[85vh] overflow-auto">
                        {
                            postData.map((post, ind) => (
                                <div
                                    key={ind}
                                    className="flex flex-col bg-white rounded-lg mb-3 p-3"
                                >
                                    <div className="flex gap-2 justify-end items-center">
                                        <span>Like</span>
                                        <img src={heartImg} alt="like" onClick={() => handlePostLike(post.id)} className="w-4 cursor-pointer"></img>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        {post.imageUrls.length === 0 ? (
                                            <img src={tempImg} alt="img" className="w-56 rounded-lg"></img>
                                        ) : (
                                            <div className="flex overflow-auto scrollbar-hide">
                                                {post.imageUrls.map((image, ind) => (
                                                    <img key={ind} src={image.url} alt="img" className="w-64 rounded-lg"></img>
                                                ))}
                                            </div>
                                        )}
                                        <span>{post.title}</span>
                                        <span>{post.content}</span>
                                        <span>{post.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1">
                                            <img src={showImg} alt="view" className="w-4"></img>
                                            <span>{post.views}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <img src={heartLikedImg} alt="view" className="w-4"></img>
                                            <span>{post.likes}</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-1 w-5 cursor-pointer"
                                            onClick={() => {
                                                setSelectedPostId(post.id);
                                                showPost();
                                            }}
                                        >
                                            <img src={chatImg} alt="chat" ></img>
                                            <span className="text-sm">{post.comments}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <TextButton
                            label="load more"
                            disabled={isLoading} loading={isLoading}
                            onclick={handleLoadPosts}
                        />
                    </div>
                    <div className="w-1/2">
                        <div>Trending Posts</div>
                        <div>Nearby Posts</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts;