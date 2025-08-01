import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import bgImg from '../../../assets/images/bg/post-eet.webp';
import TextField from '../../../components/forms/Textfield';
import { Button } from '../../../components/common/Button';

// import googleImg from '../../../assets/images/auth/google.png';
// import appleImg from '../../../assets/images/auth/apple-logo.png';
import checkedImg from '../../../assets/images/auth/checked.svg';


function SignUp() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const { control, handleSubmit } = useForm();


    const handleChecked = () => {
        setIsChecked(checked => !checked)
    }

    const handleSignUp = async (formData: any) => {
        const body = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        }

        // call endpoint here
        console.log(body)
    }

    return (
        <div className="flex justify-evenly items-center h-[90vh] bg-primary rounded-3xl p-5"
        >
            <div className='w-1/2 h-full flex flex-col justify-between rounded-3xl'>
                <div className='flex w-fit border border-primary-dark rounded-3xl px-3 py-2'>POST eet</div>
                <div className='w-full flex flex-col items-center gap-5'>
                    <div className='flex flex-col'>
                        <span className='text-2xl'>Create an Account!!!</span>
                        <span>Enter fullname, email and a password to get started</span>
                    </div>
                    <div className='w-3/5 flex flex-col gap-3'>
                        <div className='flex flex-col gap-3'>
                            <TextField
                                name='firstName' label='First Name' placeholder='First Name'
                                control={control} rules={{ required: "Name cannot be blank" }} />
                            <TextField
                                name='lastName' label='Last Name' placeholder='Last Name'
                                control={control} rules={{ required: "Name cannot be blank" }} />
                            <TextField
                                name='email' label='Email' placeholder='Email'
                                control={control} rules={{
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                    required: "Email cannot be blank",
                                }} />
                            <TextField
                                type='password'
                                name='password' label='Password' placeholder='Password'
                                control={control} rules={{
                                    required: "Password not set",
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
                        <div className='flex gap-2 px-2'>
                            <div
                                onClick={handleChecked}
                                className='flex items-center h-5 w-5 p-1 border border-primary-dark rounded-md'
                            >
                                {isChecked && <img src={checkedImg} alt='check' className=''></img>}
                            </div>
                            <span>I have read and agreed to the <span className='font-bold underline'>Terms & Conditions</span></span>
                        </div>
                        <div >
                            <Button
                                label='Sign Up' type='button'
                                disabled={isChecked ? false : true}
                                loading={isSubmitting}
                                loadingLabel='Signing up'
                                onclick={handleSubmit(handleSignUp)} />
                        </div>
                    </div>
                </div>
                <div className='flex gap-1'>
                    <span>Already have an account?</span>
                    <Link to={'/login'} className='font-bold underline'>Login</Link>
                </div>
            </div>
            <div className='w-1/2 flex flex-col items-center bg-center bg-no-repeat bg-cover rounded-3xl'
                style={{ backgroundImage: `url(${bgImg})`, height: '100%' }}
            >
                <span>Welcome to P-O-S-T E-E-T</span>
                <div className='flex gap-2'>
                    <span>You are valued</span>
                    <span>😊👌</span>
                </div>
            </div>
        </div>
    )
}

export default SignUp;