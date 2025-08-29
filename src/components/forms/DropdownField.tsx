import { useEffect, useRef, useState } from 'react';
import { Controller } from "react-hook-form";

import errLogo from '../../assets/images/error.png';
import type DropdownProps from '../../core/models/form/dropdownfield.model';

import arrowDown from '../../assets/icons/arrows/arrow-down.svg';


const DropdownField: React.FC<DropdownProps> = ({
    name,
    control,
    placeholder,
    options,
    rules,
    labelKey = 'label',
    valueKey = 'value',
    floatAnim = true,
    onchange,
    onclick,
}) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClicks = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleOutsideClicks);

        return () => { document.removeEventListener('mousedown', handleOutsideClicks) };
    }, []);

    const toggleDropdown = () => {
        setIsOpen((val) => !val)
    }

    const handleDropdownClick = (value: any, field: any) => {
        if (onchange) {
            onchange(value) // update with newly selected thingy
        }
        field.onChange(value)
        setIsOpen(false); // close
    }

    return (
        <div
            className='relative mb-2 py-2 w-full'
            ref={dropdownRef}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState }) => (
                    <div className='flex flex-col'>
                        <label
                            className={`absolute transition-all duration-200 ease-in-out 
                                ${(field.value || isFocused) && floatAnim
                                    ? 'bg-backGround -top-1 px-2 text-sm text-gray-700 rounded-lg'
                                    : 'bg-transparent top-4 left-4 text-grey-text-dark'
                                }
                                ${(!floatAnim && (isFocused || field.value)) ? 'text-transparent' : 'invisible'}
                            `}
                        >
                            <span className={`${fieldState.error && 'text-red-500'}`}> {placeholder}</span>
                        </label>

                        <div
                            tabIndex={0}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={`bg-white ${(isFocused || field.value) ? 'text-gray-700' : 'text-grey-text-dark'} text-left p-2 border rounded-xl focus:outline-none border-grey-text-dark
                                ${fieldState.error ? 'border-red-500' : ''} 
                                ${field.value && !fieldState.error ? 'border-t-secondary border-r-primary border-l-secondary border-b-primary' : ''}
                                ${isFocused && 'border-t-secondary border-r-primary border-l-secondary border-b-primary'} 
                            `}
                        >
                            <button
                                type='button'
                                className='w-full flex justify-between items-center'
                                onClick={() => {
                                    toggleDropdown();
                                    if (onclick) onclick;
                                }}
                            >
                                <span> {options.find(option => option[valueKey] === field.value)?.[labelKey] || placeholder} </span>
                                <img alt='arrow' src={arrowDown} className='w-3'></img>
                            </button>
                            {
                                isOpen && (
                                    <ul className='absolute z-10 left-0 right-0 bg-white border border-gray-200 mt-2 rounded-lg shadow-lg max-h-32 overflow-auto'>
                                        {options.map(option => (
                                            <li
                                                key={option[valueKey]}
                                                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'
                                                onClick={() => handleDropdownClick(option[valueKey], field)}
                                            >
                                                {option[labelKey]}
                                            </li>
                                        ))}
                                    </ul>
                                )
                            }
                        </div>
                        {
                            fieldState.error &&
                            <div className='flex mt-2 space-x-1'>
                                <img className='bg-red-backGround p-1 rounded-lg' src={errLogo} alt='errLogo'></img>
                                <span className='text-red-600 text-sm'> {fieldState.error?.message}
                                </span>
                            </div>
                        }
                    </div>
                )}
            />
        </div>
    )
}

export default DropdownField;