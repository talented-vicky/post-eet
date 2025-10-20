import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


import TextField from '../../../components/forms/Textfield';
import { Button } from '../../../components/common/Button';

import bgImg from '../../../assets/images/bg/post-eet.webp';
import bkArrowImg from '../../../assets/icons/post/plus.svg';
import googleImg from '../../../assets/images/auth/google.png';
import appleImg from '../../../assets/images/auth/apple-logo.png';

import authApi from '../../../api/authApi';
import { useNotifStore } from '../../../core/store/notif.store';
import { useAuthStore } from '../../../core/store/auth.store';
import AboutData from '../../../core/data/about.data';
import DropdownField from '../../../components/forms/DropdownField';
import stateLgaData from '../../../core/data/common/state-lga.data';
import type { DropdownOptions } from '../../../core/models/form/dropdownfield.model';


function Login() {
    const { showNotif } = useNotifStore();
    const { setToken } = useAuthStore();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [statusBar, setStatusBar] = useState<'login' | 'register'>('login');
    const [aboutDataIndex, setAboutDataIndex] = useState<number>(0);
    const [lgaOptions, setLgaOptions] = useState<DropdownOptions[]>([]);

    const { control, handleSubmit, watch, setValue } = useForm();

    const statelgaData = stateLgaData;
    const aboutData = AboutData;
    const aboutDataLength = aboutData.length;

    const selectedState = watch('state')

    const stateOptions: DropdownOptions[] = Object.keys(statelgaData).map(lga => ({
        label: lga, value: lga
    }))

    useEffect(() => {
        const timer = setInterval(() => {
            handleNextAboutData();
        }, 3000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        const lgas = statelgaData[selectedState] || [];
        setLgaOptions(lgas.map(lga => ({ label: lga, value: lga })));
        setValue("lga", "");
    }, [selectedState])


    const handleNextAboutData = () => {
        setAboutDataIndex(index => (index + 1) % aboutDataLength)
        // % always returns remainder (index), returns 0 when when index+1 is dataLength
    }

    const handleLogin = async (formData: any) => {
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

    const handleSignUp = async (formData: any) => {
        setIsSubmitting(true);
        const body = {
            email: formData.email,
            username: formData.username,
            state: formData.state,
            lga: formData.lga,
            password: formData.password,
        }

        try {
            const res = await authApi.signUp(body);
            if (res.status === true) {
                showNotif(`${res.message}`, `Account created with ${res.data.email}`, 'success')
                navigate('/login');
            }
        } catch (err: any) {
            showNotif(`${err.response?.statusText}`, `${err.response?.data}`, 'error')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={`${window.innerWidth > 640
            ? 'flex justify-evenly items-center h-[90vh] bg-primary p-5'
            : 'flex flex-col bg-black text-white'}`}
        >
            {window.innerWidth > 640 ? (
                <>
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
                                        onclick={handleSubmit(handleLogin)} />
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
                    <div className='w-1/2 flex flex-col justify-between items-center bg-center bg-no-repeat bg-cover transition-all duration-500 p-3'
                        style={{ backgroundImage: `url(${aboutData[aboutDataIndex].img})`, height: '100%' }}
                    >
                        <span className='text-primary-dark'>Lorem ipsum </span>
                        <div className='flex flex-col items-center gap-2'>
                            <span className='text-white'>{aboutData[aboutDataIndex].text}</span>
                            <div className='flex gap-1'>
                                {aboutData.map((_, ind) => (
                                    // <div key={ind} className={`bg-white ${ind === aboutDataIndex ? 'w-8' : 'w-4'} h-1 rounded-md transition-all duration-500`}></div>
                                    <div key={ind} className={`w-7 ${ind === aboutDataIndex ? 'bg-white' : 'bg-gray-200'} h-1 rounded-md transition-all duration-500`}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-col py-14 px-8 gap-14'>
                        <span
                            onClick={() => { console.log('clicked back') }}
                            className='flex items-start'
                        ><img src={bkArrowImg} className='w-5'></img></span>
                        <div className='flex flex-col gap-3 text-left'>
                            <span className='text-3xl'>Go ahead and set up your account </span>
                            <span className='text-sm'>Sign in-up to enjoy the best posting experience</span>
                        </div>
                    </div>
                    <div className='flex flex-col gap-5 items-center bg-white rounded-tl-3xl rounded-tr-3xl py-5 px-7'>
                        <div className='flex justify-between text-black capitalize rounded-3xl bg-gray-light gap-5 p-1'>
                            <span
                                onClick={() => setStatusBar('login')}
                                className={`${statusBar === 'login' && 'bg-white'} px-14 py-2 rounded-3xl cursor-pointer`}
                            > login</span>
                            <span
                                onClick={() => setStatusBar('register')}
                                className={`${statusBar === 'register' && 'bg-white'} px-14 py-2 rounded-3xl cursor-pointer`}
                            > register</span>
                        </div>
                        {statusBar === 'login' ? (
                            <div className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-3'>
                                    <TextField
                                        name='email' label='Email' placeholder='Email'
                                        control={control} rules={{ required: "Email cannot be blank" }} />
                                    <TextField
                                        type='password' name='password' label='Password' placeholder='Password'
                                        control={control} rules={{ required: "Password cannot be blank" }} />
                                </div>
                                <div className='flex justify-end px-2'>
                                    <span className='font-bold text-sm text-blue-800'>Forgot my Password</span>
                                </div>
                                <div >
                                    <Button
                                        type='button' label='Login' loadingLabel='Logging in'
                                        disabled={false} loading={isSubmitting}
                                        onclick={handleSubmit(handleLogin)} />
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex text-black justify-between items-center'>
                                        <div className='w-1/3 h-0.5 bg-gray-300'></div>
                                        <span>Or login with</span>
                                        <span className='w-1/3 h-0.5 bg-gray-300'></span>
                                    </div>
                                    <div className='flex justify-between text-black'>
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
                        ) : (
                            <div className='flex flex-col gap-5 w-full'>
                                <div className='flex flex-col gap-1'>
                                    <TextField
                                        name='username' label='Username' placeholder='Username'
                                        control={control} rules={{ required: "Username cannot be blank" }} />
                                    <TextField
                                        name='email' label='Email' placeholder='Email'
                                        control={control} rules={{ required: "Email required" }} />
                                    <div className='flex gap-2'>
                                        <DropdownField
                                            name='state' placeholder='Choose state'
                                            control={control} options={stateOptions}
                                            rules={{}} />
                                        <DropdownField
                                            name='lga' placeholder='Choose LGA'
                                            control={control} options={lgaOptions}
                                            rules={{}} />
                                    </div>
                                    <TextField
                                        type='password' name='password' label='Password' placeholder='Password'
                                        control={control} rules={{ required: "Password cannot be blank" }} />
                                </div>
                                <div >
                                    <Button
                                        type='button' label='Reister' loadingLabel='registering'
                                        disabled={false} loading={isSubmitting}
                                        onclick={handleSubmit(handleSignUp)} />
                                </div>
                                <div className='flex flex-col gap-5'>
                                    <div className='flex text-black justify-between items-center'>
                                        <div className='w-1/3 h-0.5 bg-gray-300'></div>
                                        <span>Or sign up with</span>
                                        <span className='w-1/3 h-0.5 bg-gray-300'></span>
                                    </div>
                                    <div className='flex justify-between text-black'>
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
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default Login;