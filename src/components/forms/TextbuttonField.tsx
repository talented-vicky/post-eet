import { useState } from 'react';
import { Controller } from "react-hook-form";


import errLogo from '../../assets/images/error.png';
import type { TextbuttonFieldProps } from '../../core/models/form/textbuttonfield.model';


const TextbuttonField: React.FC<TextbuttonFieldProps> = ({
    name,
    type = 'text',
    control,
    placeholder,
    rules,
    addOn,
    floatAnim = true,
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);

    return (
        <div className='relative mb-4 py-2 w-full xs:mb-1 xs:py-1'>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <div className='flex flex-col'>
                        <label
                            className={`w-full flex justify-between absolute pointer-events-none transition-all duration-200 ease-in-out
                                ${(field.value || isFocused) && floatAnim
                                    ? 'bg-white -top-1 px-2 text-sm text-gray-700 rounded-lg'
                                    : 'bg-transparent top-4 left-4 text-grey-text-dark'
                                }
                                ${(!floatAnim && (isFocused || field.value)) && 'text-transparent'}
                            `}
                        >
                            <span className={`${fieldState.error && 'text-red-500'}`}> {placeholder}</span>
                        </label>
                        <span className='absolute right-2 top-3'>
                            {typeof addOn == 'function' ? addOn() : addOn}
                        </span>

                        <input
                            type={type}
                            {...field}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={`bg-backGround p-2 border rounded-3xl focus:outline-none border-grey-text-dark'}
                                ${fieldState.error ? 'border-red-500' : ''} 
                                ${field.value && !fieldState.error ? 'border-t-main-complement border-r-main-one border-l-main-compborder-t-main-complement border-b-main-one' : ''}
                                ${isFocused && 'border-t-main-complement border-r-main-one border-l-main-complement border-b-main-one'} 
                            `}
                        />
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

export default TextbuttonField;