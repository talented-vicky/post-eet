import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


import TextField from '../../../components/forms/Textfield';
import { Button } from '../../../components/common/Button';

import bgImg from '../../../assets/images/bg/post-eet.webp';
import googleImg from '../../../assets/images/auth/google.png';
import appleImg from '../../../assets/images/auth/apple-logo.png';

import authApi from '../../../api/authApi';
import { useNotifStore } from '../../../core/store/notif.store';
import { useAuthStore } from '../../../core/store/auth.store';



function Login() {
    const { showNotif } = useNotifStore();
    const { setToken } = useAuthStore();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { control, handleSubmit } = useForm();


    const loginUser = async (formData: any) => {
        setIsSubmitting(true);
        const body = {
            email: formData.email,
            password: formData.password,
        }

        try {
            const res = await authApi.login(body);
            if (res.status === true) {
                const token = res.data;
                setToken(token);
                showNotif('Success', `${res.message}`, 'success')
                navigate('/dashboard');
            }
        } catch (err: any) {
            showNotif(`${err.response?.statusText}`, `${err.response?.data}`, 'error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="flex justify-evenly items-center h-[90vh] bg-primary rounded-3xl p-5"
        >
            <div className='w-1/2 h-full flex flex-col justify-between rounded-3xl'>
                <div className='flex w-fit border border-primary-dark rounded-3xl px-3 py-2'>POST eet</div>
                <div className='w-full flex flex-col items-center gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-2xl'>Welcome Back!!!</span>
                        <span>Get right back to posting now</span>
                    </div>
                    <div className='w-3/5 flex flex-col gap-5'>
                        <div className='flex flex-col gap-3'>
                            <TextField
                                name='email' label='Email' placeholder='Email'
                                control={control} rules={{ required: "Email cannot be blank" }} />
                            <TextField
                                type='password' name='password' label='Password' placeholder='Password'
                                control={control} rules={{ required: "Password cannot be blank" }} />
                        </div>
                        <div className='flex gap-2 px-2'>
                            {/* <img alt='mail' src={mailImg} className='w-4'></img> */}
                            <span className='font-bold text-blue-800'>Forgot my Password</span>
                        </div>
                        <div >
                            <Button
                                type='button' label='Login' loadingLabel='Logging in'
                                disabled={false} loading={isSubmitting}
                                onclick={handleSubmit(loginUser)} />
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='w-5/12 h-0.5 bg-gray-300'></div>
                            <span>or</span>
                            <span className='w-5/12 h-0.5 bg-gray-300'></span>
                        </div>
                        <div className='flex justify-between'>
                            <div className='flex items-center gap-2 w-fit border border-primary-dark rounded-3xl px-10 py-2'>
                                <img src={appleImg} alt='google' className='h-4'></img>
                                <span>Apple</span>
                            </div>
                            <div className='flex items-center gap-2 w-fit border border-primary-dark rounded-3xl px-10 py-2'>
                                <img src={googleImg} alt='apple' className='h-4'></img>
                                <span>Google</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex gap-1'>
                    <span>Don't have an account?</span>
                    <Link to={'/signup'} className='font-bold underline'>Sign up</Link>
                </div>
            </div>
            <div className='w-1/2 flex flex-col items-center bg-center bg-no-repeat bg-cover rounded-3xl'
                style={{ backgroundImage: `url(${bgImg})`, height: '100%' }}
            >
                <span className='text-primary-dark'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius quaerat porro libero et dolores dicta laboriosam temporibus adipisci dignissimos dolorem blanditiis eligendi, inventore excepturi eveniet? Officia nam alias dolorem? Nam!</span>
                <div className='flex gap-2'>
                    <span>You are valued</span>
                    <span>😊👌</span>
                </div>
            </div>
        </div>
    )
}

export default Login;