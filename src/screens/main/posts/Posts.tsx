import { useEffect, useState } from "react";

import Title from "../../../components/common/Title";
import Sidebar from "../../../components/navigation/Sidebar";
import loaderSpinner from "../../../components/common/Loader";
import CommentDialog from "../../../components/dialogs/CommentDialog";

import tempImg from '../../../assets/images/bg/post-eet.webp';
import heartImg from '../../../assets/icons/post/heart.svg';
import heartLikedImg from '../../../assets/icons/post/heart-liked.svg';
import showImg from '../../../assets/icons/post/show.svg';
import chatImg from '../../../assets/icons/post/chat.svg';

import type { PostData } from "../../../core/models/api/post.model";

import { useNotifStore } from "../../../core/store/notif.store";
import { useCommentStore } from "../../../core/store/comment.store";

import postApi from "../../../api/postApi";


function Posts() {
    const { MoonLoaderr } = loaderSpinner;
    const { showNotif } = useNotifStore();
    const { showPost } = useCommentStore();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedPostId, setSelectedPostId] = useState<number>(0);
    const [postData, setPostData] = useState<PostData[]>([]);


    useEffect(() => {
        const apiCalls = [fetchPosts()];
        Promise.all(apiCalls);
    }, [])


    const handlePostLike = async (postId: number) => {
        try {
            const res = await postApi.likePost(postId);
            if (res.status) {
                fetchPosts();
                showNotif("Success", `${res.message}`, "notif");
            }
        } catch (error: any) {
            showNotif(`${error?.response?.statusText}`, `${error?.response?.data?.message}`, "error");
        }
    }

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const res = await postApi.fetchPosts();
            if (res.data) { setPostData(res.data); }
        } catch (error) {
            showNotif("Error", "Error Loading Posts", "error");
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex gap-2 text-gray-main bg-white border border-gray-100 shadow-xl rounded-xl p-3">
            <Sidebar />
            <CommentDialog postId={selectedPostId} />
            {isLoading ? (
                <div className="w-4/5 flex justify-center items-center">
                    <MoonLoaderr />
                </div>
            ) : (
                <div className="w-4/5 flex flex-col">
                    <Title text="All Posts" />
                    <div className="flex p-3 bg-gray-light rounded-xl h-full">
                        <div className="w-1/2 h-[85vh] overflow-auto">
                            {postData.map((post, ind) => (
                                <div
                                    key={ind}
                                    className="flex flex-col bg-white rounded-lg mb-3 p-3"
                                >
                                    <div className="flex gap-2 justify-end items-center">
                                        <span>Like</span>
                                        <img src={heartImg} alt="view" onClick={() => handlePostLike(post.id)} className="w-4 cursor-pointer"></img>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <img src={tempImg} alt="img" className="w-56 rounded-lg"></img>
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
                            ))}
                        </div>
                        <div className="w-1/2">
                            <div>Trending Posts</div>
                            <div>Recent Posts</div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Posts;