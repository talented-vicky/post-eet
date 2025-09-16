import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';

import navHomeData from "../../core/data/dashboard/home.data";
import navOptionsData from "../../core/data/dashboard/options.data";

import { useAuthStore } from "../../core/store/auth.store";
import { useNavStore } from "../../core/store/nav.store";
import { useConfirmationStore } from "../../core/store/confirmation.store";
import { useMobileNavStore } from "../../core/store/mobile-nav.store";

import logo from '../../assets/icons/logo/posteet.svg';
import logoutImg from '../../assets/icons/util/logout-user.svg';


function MobileNav() {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();
    const { isOpen, toggleMenu, closeMenu } = useMobileNavStore();
    const { activeNav, setActiveNav } = useNavStore();
    const { hideConfirmation, showConfirmation } = useConfirmationStore();

    const navoptionsData = navOptionsData;
    const navhomeData = navHomeData;

    const handleLogout = () => {
        showConfirmation(
            logoutImg, 'bg-red-backGround', 'Logout', 'text-red-stroke',
            'Are you sure you want to logout?',
            [
                {
                    label: 'Yes',
                    labelColor: 'text-white',
                    bgColor: 'bg-red-stroke',
                    onclick: () => {
                        hideConfirmation();
                        logout();
                        navigate('/login');
                    }
                },
                {
                    label: 'Not yet',
                    labelColor: 'text-red-stroke',
                    bgColor: 'bg-red-backGround',
                    onclick: () => hideConfirmation()
                },
            ]
        )
    }

    return (
        <>
            {/* Sidebar */}
            {isOpen && (
                <div className="fixed left-0 top-0 flex flex-col w-[60vw] h-full bg-gray-light py-5 z-20 gap-10 text-sm">
                    <div className="flex gap-2 px-5">
                        <img src={logo} alt="logo" className="w-6"></img>
                        <span className="text-base text-black font-bold">POST eet</span>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3 items-start">
                            <span className="ml-4">Home</span>
                            <div className="w-full flex flex-col gap-2">
                                {navhomeData.map((nav, ind) => (
                                    <Link
                                        key={ind}
                                        to={`/${nav.text}`}
                                        onClick={() => setActiveNav(nav.text)}
                                        className="flex justify-between items-center mr-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-6 ${activeNav === nav.text && "bg-teal-dark"} rounded-tr-lg rounded-br-lg`}></div>
                                            <img src={nav.icon} alt="icon" className="w-4"></img>
                                            <span className="capitalize">{nav.text}</span>
                                        </div>
                                        {nav.count && <span className="h-fit flex items-center bg-teal-dark text-xs text-gray-light px-2 py-1 rounded-md">{nav.count}</span>}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 items-start pl-5">
                            <span>Options</span>
                            <div className="flex flex-col gap-3">
                                {navoptionsData.map((nav, ind) => (
                                    <div
                                        key={ind}
                                        className="flex items-center gap-2"
                                    >
                                        <img src={nav.icon} alt="icon" className="w-4"></img>
                                        {nav.text === "Logout" ? (
                                            <span onClick={handleLogout} className="cursor-pointer">{nav.text}</span>
                                        ) : (<span >{nav.text}</span>)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ x: '-100vw' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100vw' }}
                            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                            className={`fixed top-0 left-0 text-primary flex h-screen bg-backGround w-[60vw] rounded-md overflow-auto scrollbar-hide`}
                        >
                            <motion.ul
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: .5, delay: .2 }}
                                className="w-full flex flex-col py-0 gap-3"
                            >
                                <div>
                                    <img src="" alt="logo" className="w-14"></img>
                                    <div className="border-b border-gray-300"></div>
                                </div>
                            </motion.ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: .3 }}
                            onClick={closeMenu}
                            className="fixed left-0 top-0 h-full w-full bg-black bg-opacity-30 z-10"
                        >
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default MobileNav;