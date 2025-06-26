import { useState } from 'react';
import { useForm } from 'react-hook-form';

import bgImg from '../../../assets/images/bg/post-eet.webp';
import TextField from '../../../components/forms/Textfield';
import Button from '../../../components/common/Button';

import mailImg from '../../../assets/icons/mail.svg';
import userImg from '../../../assets/icons/user.svg';


function Login() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { control, handleSubmit } = useForm();

    const loginUser = async (formData: any) => {
        const body = {
            name: formData.name,
            password: formData.password,
        }

        // call endpoint here
        console.log(body)
    }

    return (
        <div className="flex justify-evenly items-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImg})`, height: '90vh' }}
        >
            <div className='flex flex-col items-center'>
                <span>Welcome to P-O-S-T E-E-T</span>
                <div className='flex gap-2'>
                    <span>You are valued</span>
                    <span>😊👌</span>
                </div>
            </div>
            <div className='flex flex-col items-center gap-5 bg-blue-100 p-10 rounded-3xl w-1/4'>
                <img src={userImg} alt='user' className='w-20'></img>
                <div className='w-full flex flex-col gap-3'>
                    <TextField
                        name='username' label='Username' placeholder='Username'
                        control={control} rules={{ required: "Name cannot be blank" }} />
                    <TextField
                        type='password'
                        name='password' label='Password' placeholder='Password'
                        control={control} rules={{ required: "Password cannot be blank" }} />
                </div>
                <div className='flex gap-5'>
                    <div className='flex gap-2'>
                        <span>tt</span>
                        <span>Remember me</span>
                    </div>
                    <div className='flex gap-2'>
                        <img alt='mail' src={mailImg} className='w-4'></img>
                        <span>Forgot Password</span>
                    </div>
                </div>
                <div>
                    <Button
                        label='Login' type='button'
                        disabled={false}
                        loading={isSubmitting}
                        onclick={handleSubmit(loginUser)} />
                </div>
            </div>
        </div>
    )
}

export default Login;