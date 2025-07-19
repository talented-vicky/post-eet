import { useState } from 'react';
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import type { TextFieldProps } from '../../core/models/form/textfield.model';

import errLogo from '../../assets/images/error.png';


const TextField: React.FC<TextFieldProps> = ({
    name,
    type = 'text',
    control,
    placeholder,
    rules,
    height,
    className,
    floatAnim = true,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((val) => !val);
    }

    const heightClass = height ? `h-[${height}px]` : '';

    const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

    return (
        <div className='relative mb-4 py-2 w-full xs:mb-1 xs:py-1'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <div className='flex flex-col'>
                        <label
                            className={`absolute transition-all duration-200 ease-in-out
                                ${(field.value || isFocused) && floatAnim
                                    ? 'bg-white -top-1 px-2 text-sm text-gray-700 rounded-lg'
                                    : 'bg-transparent top-4 left-4 text-grey-text-dark'
                                }
                                ${(!floatAnim && (isFocused || field.value)) && 'text-transparent'}
                            `}
                        >
                            <span className={`${fieldState.error && 'text-red-500'}`}> {placeholder}</span>
                        </label>

                        <input
                            type={inputType}
                            {...field}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={`bg-backGround p-2 border rounded-3xl focus:outline-none border-grey-text-dark ${heightClass && 'h-16'}
                                ${fieldState.error ? 'border-red-500' : ''} 
                                ${field.value && !fieldState.error ? 'border-t-main-complement border-r-main-one border-l-main-compborder-t-main-complement border-b-main-one' : ''}
                                ${isFocused && 'border-t-main-complement border-r-main-one border-l-main-complement border-b-main-one'} 
                            `}
                        />
                        {
                            type === 'password' && (
                                <span className={`absolute right-4 top-5 cursor-pointer ${className}`}
                                    onClick={() => {
                                        togglePasswordVisibility();
                                        setIsFocused(true);
                                    }}>
                                    {isPasswordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                </span>
                            )
                        }
                        {
                            fieldState.error &&
                            <div className='flex mt-2 space-x-1'>
                                <img className='h-fit bg-red-backGround p-1 rounded-lg' src={errLogo} alt='errLogo'></img>
                                <span className='text-red-600 text-left text-sm'> {fieldState.error?.message}
                                </span>
                            </div>
                        }
                    </div>
                )}
            />
        </div>
    )
}

export default TextField;