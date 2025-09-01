import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import errorImg from '../../assets/icons/util/error.svg';
import heartImg from '../../assets/icons/post/heart.svg';
import userImg from '../../assets/icons/util/user.svg';
import sendImg from '../../assets/icons/post/send.svg';

import TextbuttonField from '../forms/TextbuttonField';
import type { PostCommentData } from '../../core/models/api/post.model';
import { formatDate } from '../../core/utils/formatDate';

import { useNotifStore } from '../../core/store/notif.store';
import { useCommentStore } from '../../core/store/comment.store';

import postApi from '../../api/postApi';
import loaderSpinner from '../common/Loader';
import { useNavigate } from 'react-router-dom';


const CommentDialog: React.FC<{ postId: number }> = ({ postId }) => {
    const navigate = useNavigate();
    const showNotif = useNotifStore(state => state.showNotif);

    const { DotLoaderr, BounceLoaderr } = loaderSpinner;
    const { isOpen, hidePost } = useCommentStore();
    const { control, handleSubmit, reset } = useForm();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [commentData, setCommentData] = useState<PostCommentData[]>([]);
    const [totalComments, setTotalComments] = useState<number>(0);


    useEffect(() => {
        if (!postId) return;
        const apiCalls = [loadComments()]
        Promise.all(apiCalls)

    }, [postId]);

    if (!isOpen) return null;

    const loadComments = async () => {
        setIsLoading(true)
        try {
            const res = await postApi.fetchComments(postId);
            if (res.status) {
                setTotalComments(res.totalItems);
                res.data.map(data => data.commentedAt = formatDate(data.commentedAt))
                setCommentData(res.data);
            }
        } catch (error: any) {
            showNotif(`${error?.response?.statusText}`, "Unable to load comments", "error");
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }

    const handleAddComment = async (formData: any) => {
        const body = {
            content: formData.comment,
            postId: postId,
        }

        setIsSubmitting(true);
        try {
            const res = await postApi.commentPost(body);
            if (res.status) {
                reset({ comment: '' })
                showNotif(`Success`, `${res.message}`, `success`);
                loadComments();
            }
        } catch (error: any) {
            showNotif(`${error?.response?.statusText}`, `${error?.response?.data?.message}`, `error`);

        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-40'>
            {isLoading ? (
                <DotLoaderr />
            ) : (
                <motion.div
                    initial={{ scale: .9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: .9, opacity: 0 }}
                    className={`flex relative justify-between text-gray-800 bg-white p-5 pb-10 rounded-xl w-[40vw]`}
                >
                    <div className='w-full flex flex-col gap-3 items-start justify-between'>
                        <div className='flex gap-3 w-full justify-center'>
                            <span>{totalComments} comments</span>
                            <span>v</span>
                        </div>
                        <span className='flex flex-col gap-3'>
                            {commentData.map((comment, ind) => (
                                <div key={ind} className='flex gap-2'>
                                    <div className='flex h-fit'>
                                        <img src={userImg} alt={comment.username[0]} className='w-7'></img>
                                    </div>
                                    <div className='w-full text-start flex flex-col text-gray-main'>
                                        <div className='flex flex-col'>
                                            <span className='text-sm'>{comment.username}</span>
                                            <span className='text-black'>{comment.content}</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span className='text-xs'>{comment.commentedAt}</span>
                                            <div className='flex gap-1 text-xs'>
                                                <img src={heartImg} className='h-4'></img>
                                                <span>3</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </span>
                        <div className='w-full flex items-center gap-3'>
                            <TextbuttonField
                                label='Add Comment' name='comment' placeholder='Add Comment'
                                addOn={
                                    isSubmitting
                                        ? <BounceLoaderr />
                                        : () => <div
                                            onClick={handleSubmit(handleAddComment)}
                                            className='flex cursor-pointer'
                                        >
                                            <img src={sendImg} alt='logo' className='w-4'></img>
                                        </div>
                                }
                                control={control}
                                rules={{ required: "Content cannot be blank" }} />
                        </div>
                    </div>
                    <div className='absolute right-4 top-1'>
                        <div
                            onClick={() => {
                                reset({ comment: '' })
                                hidePost()
                            }}
                            className='bg-red-stroke flex items-center justify-center cursor-pointer rounded-full p-2'
                        > <img src={errorImg} alt='cancel' className='w-3'></img></div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default CommentDialog;