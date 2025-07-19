import { Link, useNavigate } from "react-router-dom";
import navHomeData from "../../core/data/dashboard/home.data";
import navOptionsData from "../../core/data/dashboard/options.data";
import { useAuthStore } from "../../core/store/auth.store";

import logo from '../../assets/icons/nav/dashboard.svg';
import logoutImg from '../../assets/icons/util/logout-user.svg';

import { useNavStore } from "../../core/store/nav.store";
import { useConfirmationStore } from "../../core/store/confirmation.store";

function Sidebar() {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();
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
            < div className="w-1/5 flex flex-col justify-between h-[95vh] bg-gray-light rounded-lg py-5" >
                <div className="flex flex-col gap-10">
                    <div className="flex gap-3 px-5">
                        <img src={logo} alt="logo" className="w-6"></img>
                        <span className="text-black font-bold">POST eet</span>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col items-start">
                            <span className="mb-3 ml-4">Home</span>
                            <div className="w-full flex flex-col gap-1">
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
                        <div className="flex flex-col items-start px-3">
                            <span className="mb-2">Options</span>
                            <div className="flex flex-col gap-1">
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
                <div className="flex flex-col gap-8 text-gray-light bg-teal-gradient p-3 mx-3 rounded-2xl mt-10">
                    <div className="flex flex-col text-left">
                        <div className="flex items-center justify-center bg-teal-50 text-black text-sm rounded-full h-8 w-8 p-1">#1</div>
                        <span className="text-xl w-2/3">Download our Mobile App</span>
                        <span className="text-sm">Free on playstore</span>
                    </div>
                    <div className="bg-teal-gradient py-2 rounded-3xl">
                        Download
                    </div>
                </div>
            </div >
        </>
    )
}

export default Sidebar;