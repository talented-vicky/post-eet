import { useEffect } from 'react';
import { motion } from 'framer-motion';

import errorImg from '../../assets/icons/error.svg';

import { useNotifStore } from '../../core/store/notif.store';


const NotifDialog: React.FC = () => {
    const { isOpen, title, msg, code, hideNotif } = useNotifStore();


    useEffect(() => {
        if (!isOpen) return;

        const timer = setTimeout(() => {
            hideNotif();
        }, 3000)

        return () => clearTimeout(timer);
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
            <motion.div
                initial={{ scale: .9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .9, opacity: 0 }}
                className={`flex relative items-center text-gray-800 bg-white p-2 rounded-xl w-80`}
            >
                <div className={`flex mr-4 h-20 w-1.5 rounded-tl-md rounded-bl-md rounded-tr-sm rounded-br-sm
                    ${code === 'success' ? `bg-main-one`
                        : code === 'error' ? `bg-red-stroke`
                            : code === 'notif' ? `bg-tertiary-stroke`
                                : `bg-teal-700`
                    }`}>
                </div>
                <div className='flex flex-col text-left'>
                    <span className={`text-lg font-bold
                        ${code === 'success' ? `text-main-one`
                            : code === 'error' ? `text-red-stroke`
                                : code === 'notif' ? `text-tertiary-stroke`
                                    : `text-teal-700`
                        }`}>{title}! </span>
                    <span className='text-md'>{msg} </span>
                </div>
                <div className='absolute right-2 top-2'>
                    <div
                        onClick={hideNotif}
                        className={`
                            flex items-center justify-center cursor-pointer text-white text-xl rounded-full h-6 w-6
                            ${code === 'success' ? 'bg-main-one'
                                : code === 'error' ? 'bg-red-stroke'
                                    : code === 'notif' ? 'bg-tertiary-stroke'
                                        : 'bg-teal-700'
                            }`}
                    >
                        <img src={errorImg} className='w-3'></img>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default NotifDialog;