import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import errorImg from '../../assets/icons/util/error.svg';
import uploadImg from '../../assets/icons/post/download.svg';

import TextField from '../forms/Textfield';
import Button from '../common/Button';

import { usePostStore } from '../../core/store/post.store';
import { useNotifStore } from '../../core/store/notif.store';

import postApi from '../../api/postApi';


const AddPostDialog: React.FC = () => {
    const { isOpen, hidePost } = usePostStore();
    const showNotif = useNotifStore(state => state.showNotif);
    const { control, handleSubmit, reset } = useForm();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState('');


    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            console.log("media changed", e.target.files);
        }
    }

    const handleMediaUpload = async () => {
        if (!selectedFile) {
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await postApi.uploadMedia(formData);
            if (res.data) {
                console.log("media uploaded", res)
                setImageUrl(res.data.url);
            }

        } catch (error) {
            console.log('error occured', error);
        }
    }

    const handleCreatePost = async (formBody: any) => {
        setIsSubmitting(true);
        const body = {
            title: formBody.title,
            content: formBody.content,
        }

        try {
            const res = await postApi.createPost(body);
            if (res.status) {
                showNotif(`${res.message}`, `Post id is: ${res.data.id}`, "success")
                reset({ title: '', content: '' })
                hidePost();
            }

        } catch (error: any) {
            showNotif(`${error?.code}`, `${error?.response?.statusText}`, "error")
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
            <motion.div
                initial={{ scale: .9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .9, opacity: 0 }}
                className={`flex relative justify-between text-gray-800 bg-white p-5 pb-16 rounded-xl w-[40vw]`}
            >
                <div className='flex flex-col items-start justify-between'>
                    <span>
                        Create New Post
                    </span>
                    {/* <div>
                        3 Quick steps to add your posts now
                    </div> */}
                </div>
                <div className='flex flex-col gap-5 bg-gray-light p-10'>
                    <div className='w-full'>
                        <TextField
                            label='title' name='title' placeholder='Title'
                            control={control}
                            rules={{ required: "Title cannot be blank" }} />
                        <TextField
                            label='content' name='content' placeholder='Content'
                            height=''
                            control={control}
                            rules={{ required: "Content cannot be blank" }} />
                    </div>
                    <div className='flex gap-3'>
                        <div className='flex flex-col bg-white rounded-lg p-2 border-2 border-green-500'>
                            <span>Public</span>
                            <span className='text-xs'>Post will be visible to everyone on post eet</span>
                        </div>
                        <div className='flex flex-col bg-white rounded-lg p-2'>
                            <span>Private</span>
                            <span className='text-xs'>Keep post hidden from the public</span>
                        </div>
                    </div>
                    <div className='flex flex-col items-center p-3 border-2 border-dashed border-gray-400 rounded-lg'>
                        <div className='w-full flex justify-end'>
                            <img src={uploadImg} alt='upload' className='w-4'></img>
                        </div>
                        <input
                            type='file' accept='image/*'
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleMediaUpload}
                        > Load image </button>
                        {imageUrl && <img src={imageUrl} alt='img' className='w-48 h-48'></img>}
                    </div>
                    {/* <div className='flex flex-col text-left'>
                        <Button
                            type='button' label='Create Post'
                            disabled={false} loading={isSubmitting} loadingLabel='Creating Post'
                            onclick={handleSubmit(handleCreatePost)}
                        />
                    </div> */}
                    <div
                        onClick={handleSubmit(handleCreatePost)}
                        className='w-fit bg-teal-gradient flex cursor-pointer text-white border shadow-sm shadow-slate-50 rounded-2xl px-4 py-2'
                    > Create Post </div>
                </div>
                <div className='absolute left-2 bottom-2'>
                    <div
                        onClick={hidePost}
                        className='bg-white flex cursor-pointer text-red-600 border shadow-sm shadow-slate-100 rounded-2xl px-4 py-2'
                    > Cancel </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AddPostDialog;