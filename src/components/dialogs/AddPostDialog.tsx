import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import errorImg from '../../assets/icons/util/error.svg';
import uploadImg from '../../assets/icons/post/download.svg';

import TextField from '../forms/Textfield';

import { usePostStore } from '../../core/store/post.store';
import { useNotifStore } from '../../core/store/notif.store';

import postApi from '../../api/postApi';
import { Button } from '../common/Button';
import { Visibility } from '../../core/models/api/post.model';
import localApi from '../../api/local/localApi';


const AddPostDialog: React.FC = () => {
    const { isOpen, hidePost } = usePostStore();
    const showNotif = useNotifStore(state => state.showNotif);
    const { control, handleSubmit, reset } = useForm();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);

    const [postVisibility, setPostVisibility] = useState<Visibility>(Visibility.Public);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [latCoordinate, setLatCoordinate] = useState<number>(0);
    const [longCoordinate, setLongCoordinate] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string[]>([]);


    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            console.log("media changed", e.target.files);
        }
    }

    const handleGetLocation = async () => {
        setIsGettingLocation(true);

        if (!navigator.geolocation) {
            showNotif("Unsupported", "Geolocation Not Supported by Browser", "error");
            setIsGettingLocation(false);
            return;
        }

        try {
            const position = await localApi.getLocation();
            setLatCoordinate(position.coords.latitude);
            setLongCoordinate(position.coords.longitude);
        } catch (error: any) {
            showNotif("Location Error", `${error.message}` || `Unable to fetch location`, "error");
        } finally {
            setIsGettingLocation(false);
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
                setImageUrl(currImage => [...currImage, res.data.url]);
            }

        } catch (error: any) {
            showNotif(`${error?.code}`, `${error?.response?.statusText}`, 'error');
        }
    }

    const handleCreatePost = async (formBody: any) => {
        setIsSubmitting(true);

        if (latCoordinate === 0 || longCoordinate === 0) {
            showNotif('Location Not Set', "Please Add Post Location", "error");
            setIsSubmitting(false);
            return
        }

        const body = {
            title: formBody.title,
            content: formBody.content,
            visibility: postVisibility,
            latitude: latCoordinate,
            longitude: longCoordinate,
            imageUrls: imageUrl,
        }

        // console.log(body)
        // setIsSubmitting(false)
        // return;

        try {
            const res = await postApi.createPost(body);
            if (res.status) {
                console.log(res.data)
                showNotif(`${res.message}`, `Post id is: ${res.data.id}`, "success")
                reset({ title: '', content: '' })
                setLatCoordinate(0); setLongCoordinate(0); setImageUrl([]);
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
                </div>
                <div className='flex flex-col gap-5 bg-gray-light p-10'>
                    <div className='w-full'>
                        <TextField
                            label='title' name='title' placeholder='Title'
                            control={control}
                            rules={{ required: "Title cannot be blank" }} />
                        <TextField
                            label='description' name='content' placeholder='Description'
                            height=''
                            control={control}
                            rules={{}} />
                    </div>
                    <div className='flex gap-3'>
                        <div
                            className={`cursor-pointer flex flex-col bg-white rounded-lg p-2 border-2 ${postVisibility === Visibility.Public ? 'border-green-500' : ''}`}
                            onClick={() => setPostVisibility(Visibility.Public)}
                        >
                            <span>Public</span>
                            <span className='text-xs'>Visible to everyone on post eet</span>
                        </div>
                        <div
                            className={`cursor-pointer flex flex-col bg-white rounded-lg p-2 border-2 ${postVisibility === Visibility.Private ? 'border-green-500' : ' '}`}
                            onClick={() => setPostVisibility(Visibility.Private)}
                        >
                            <span>Private</span>
                            <span className='text-xs'>Keep hidden from the public</span>
                        </div>
                    </div>
                    {(latCoordinate !== 0 && longCoordinate !== 0) && (
                        <div>
                            <span>latitude is {latCoordinate}</span>
                            <span>longitude is {longCoordinate}</span>
                        </div>
                    )}
                    <div className='flex flex-col items-center p-3 border-2 border-dashed border-gray-400 rounded-lg'>
                        <div className='w-full flex justify-end'>
                            <img src={uploadImg} alt='upload' className='w-4'></img>
                        </div>
                        <input
                            type='file' accept='image/*'
                            onChange={handleFileChange}
                        />
                        {imageUrl && <>
                            <button
                                onClick={handleMediaUpload}
                                className='w-full flex justify-end'
                            > Load image </button>
                            <div className='flex overflow-auto w-full scrollbar-hide'>
                                {imageUrl.map((image, ind) => (
                                    <img key={ind} src={image} alt='img' className='w-40 h-40'></img>
                                ))}
                            </div>
                        </>}
                    </div>
                    <div className='flex flex-col text-left'>
                        <Button
                            type='button' label='Use my location' loadingLabel='Fetching Location'
                            disabled={isGettingLocation} loading={isGettingLocation}
                            onclick={handleGetLocation}
                        />
                    </div>
                    <Button
                        type='button' label='Create Post' loadingLabel='Creating Post'
                        disabled={isGettingLocation} loading={isSubmitting}
                        onclick={handleSubmit(handleCreatePost)}
                        classname='w-fit bg-teal-gradient flex cursor-pointer text-white border shadow-sm shadow-slate-50 rounded-2xl px-4 py-2'
                    />
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