import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';


import TextField from '../../../components/forms/Textfield';
import DropdownField from '../../../components/forms/DropdownField';
import { Button } from '../../../components/common/Button';

import logoImg from '../../../assets/icons/logo/posteet.svg';
import bgImg from '../../../assets/images/bg/post-eet.webp';
import googleImg from '../../../assets/images/auth/google.png';
import appleImg from '../../../assets/images/auth/apple-logo.png';

import authApi from '../../../api/authApi';

import type { DropdownOptions } from '../../../core/models/form/dropdownfield.model';
import { useNotifStore } from '../../../core/store/notif.store';
import stateLgaData from '../../../core/data/common/state-lga.data';



function SignUp() {
    const { showNotif } = useNotifStore();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [lgaOptions, setLgaOptions] = useState<DropdownOptions[]>([]);
    const { control, handleSubmit, watch, setValue } = useForm();

    const StateLgaData = stateLgaData;

    const stateOptions: DropdownOptions[] = Object.keys(StateLgaData).map(lga => ({
        label: lga, value: lga
    }))

    const selectedState = watch("state");

    useEffect(() => {
        const lgas = StateLgaData[selectedState] || [];
        setLgaOptions(lgas.map(lga => ({ label: lga, value: lga })));
        setValue("lga", "");
    }, [selectedState])

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
        <div className="flex justify-evenly items-center h-[90vh] bg-primary rounded-3xl p-5"
        >
            <div className='w-1/2 h-full flex flex-col justify-between rounded-3xl'>
                <div className='flex w-8'>
                    <img src={logoImg} alt='logo' className=''></img>
                </div>
                <div className='w-full flex flex-col items-center gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-2xl'>Welcome to Post eet!!!</span>
                        <span>Sign up and start posting now</span>
                    </div>
                    <div className='w-3/5 flex flex-col gap-5'>
                        <div className='flex flex-col gap-1'>
                            <TextField
                                name='email' label='Email' placeholder='Email'
                                control={control}
                                rules={{
                                    required: "Email cannot be blank",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                }} />
                            <TextField
                                name='username' label='Username' placeholder='Username'
                                control={control} rules={{ required: "Username cannot be blank" }} />
                            <div className='flex gap-2'>
                                <DropdownField
                                    name='state'
                                    control={control}
                                    options={stateOptions}
                                    placeholder='Select State'
                                    rules={{ required: "Select State" }}
                                />
                                <DropdownField
                                    name='lga'
                                    control={control}
                                    options={lgaOptions}
                                    placeholder='Select City'
                                    rules={{ required: "Select CIty" }}
                                />
                            </div>
                            <TextField
                                type='password' name='password' label='Password' placeholder='Password'
                                control={control} rules={{
                                    required: "Password cannot be blank",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum length of 6 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).+$/,
                                        message: "Password should contain at least one upper case, one lower case and a symbol",
                                    },
                                }} />
                        </div>
                        <div >
                            <Button
                                type='button' label='Sign Up' loadingLabel='Signing up'
                                disabled={false} loading={isSubmitting}
                                onclick={handleSubmit(handleSignUp)} />
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
                    <span>Already have an account?</span>
                    <Link to={'/login'} className='font-bold underline'>Log in</Link>
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

export default SignUp;