import { motion } from 'framer-motion';
import { useConfirmationStore } from '../../core/store/confirmation.store';


const ConfirmationDialog: React.FC = () => {
    const { isOpen, icon, iconBg, title, titleColor, msg, buttons } = useConfirmationStore();

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
            <motion.div
                initial={{ scale: .9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: .9, opacity: 0 }}
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, .95), rgba(255, 255, 255, 0.95)), url(${icon})`,
                    backgroundRepeat: 'no-repeat', backgroundPosition: 'calc(100% + 55px) top', backgroundSize: '13vw',
                }}
                className={`flex flex-col items-center bg-white p-3 rounded-xl text-gray-800`}
            >
                <div className={`w-fit rounded-xl ${title === 'Error' ? 'p-2' : 'p-1'} ${iconBg}`}>
                    <img src={icon} alt='icon' className={`${title === 'Error' ? 'w-6' : 'w-9'}`}></img>
                </div>
                <div className={`text-2xl mt-3 ${titleColor}`}>{title}</div>
                <div className='text-sm mt-3'>{msg}</div>
                <div className='flex space-x-3 mt-10 text-sm w-72'>
                    {
                        buttons.map((button, index) => (
                            <button
                                key={index}
                                onClick={button.onclick}
                                className={`w-1/2 rounded-lg p-2 ${button.bgColor} ${button.labelColor}`}
                            >
                                {button.label}
                            </button>
                        ))
                    }
                </div>
            </motion.div>
        </div>
    )
}

export default ConfirmationDialog;