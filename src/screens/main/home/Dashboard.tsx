import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import searchImg from '../../../assets/icons/util/search.svg';
import emailImg from '../../../assets/icons/nav/email.svg';
import notifImg from '../../../assets/icons/util/notification.svg';
import userImg from '../../../assets/icons/util/user.svg';

import { ButtonStatic } from "../../../components/common/Button";
import ReadMore from "../../../components/common/ReadMore";
import Title from "../../../components/common/Title";
import loaderSpinner from "../../../components/common/Loader";
import DataBoard from "../../../components/common/DataBoard";
import Sidebar from "../../../components/navigation/Sidebar";

import type { UserDashboard } from "../../../core/models/api/user.model";

import { useAuthStore } from "../../../core/store/auth.store";
import { useNotifStore } from "../../../core/store/notif.store";
import { usePostStore } from "../../../core/store/post.store";

import { analyticsData } from "../../../core/data/dashboard/analytics.data";
import { postData } from "../../../core/data/dashboard/post.data";


import userApi from "../../../api/userApi";
import { useNavStore } from "../../../core/store/nav.store";


function Dashboard() {
    const navigate = useNavigate();
    const { showNotif } = useNotifStore();
    const { showPost } = usePostStore();

    const setActiveNav = useNavStore(store => store.setActiveNav);
    const token = useAuthStore(state => state.token);

    const { MoonLoaderr } = loaderSpinner;


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userDashboard, setUserDashboard] = useState<UserDashboard>()

    const userAnalyticsData = analyticsData;
    const recentPostData = postData;


    useEffect(() => {
        const fetchInitData = async () => {
            if (!token) {
                showNotif("Unauthorized", "Not Logged in OR Session Expired", "error")
                console.log("invalid token, login redirect");
                navigate('/login')
                return;
            }

            setIsLoading(true);
            try {
                const [dashboardResponse] = await Promise.all([
                    userApi.getUserDashboard()
                ])
                if (dashboardResponse.status) setUserDashboard(dashboardResponse.data);

            } catch (error: any) {
                showNotif(`${error?.response?.statusText}`, `${error?.response?.data?.message}`, "error");
                console.log("API call failed, login redirect");
                navigate("/login");
            } finally {
                setIsLoading(false);
            }
        }

        fetchInitData();
    }, [token])

    const boardData = [
        {
            label: 'Total Posts',
            number: userDashboard?.postCount ?? 0,
            bgColor: 'darkBg',
            textColor: 'darkText',
            desc: 'All my public posts',
        },
        {
            label: 'Reveiewed Comments',
            number: 10,
            bgColor: 'lightBg',
            textColor: 'lightText',
            desc: 'All comments have been reviewed',
        },
        {
            label: 'Private Posts',
            number: 12,
            bgColor: 'lightBg',
            textColor: 'lightText',
            desc: 'Tap to see list',
        },
        {
            label: 'Unreplied Comments',
            number: 6,
            bgColor: 'lightBg',
            textColor: 'lightText',
            desc: 'See all comments left unread',
        },
    ]

    return (
        <div className="w-[90vw] flex gap-2 text-gray-main bg-white border border-gray-100 shadow-xl rounded-xl p-3">
            {/* Sidebar */}
            <Sidebar />

            {isLoading ? (
                <div className="w-4/5 flex justify-center items-center">
                    <MoonLoaderr />
                </div>
            ) : (
                <div className="w-4/5 flex flex-col gap-2">
                    {/* Search/Profile bar */}
                    <div className="flex items-center justify-between bg-gray-light rounded-lg px-3 py-2">
                        <div className="w-1/3 h-fit flex items-center justify-between rounded-3xl bg-white px-2 py-1.5">
                            <div className="flex items-center gap-1">
                                <img src={searchImg} alt="mail" className="w-4"></img>
                                <span className="text-sm">Search Posts</span>
                            </div>
                            <div className="h-fit bg-gray-light text-black text-xs py-1 px-2 rounded-lg">
                                x*
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {[{ img: emailImg, alt: 'email' }, { img: notifImg, alt: 'email' }].map((notif, ind) => (
                                <div key={ind} className="bg-white p-1 rounded-2xl">
                                    <img src={notif.img} alt={notif.alt} className="w-4"></img>
                                </div>
                            ))}
                            <div className="bg-white p-1.5 rounded-full">
                                <img src={userImg} alt="notification" className="w-9"></img>
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="capitalize text-black font-bold">{userDashboard?.username}</span>
                                <span className="text-sm">{userDashboard?.email}</span>
                            </div>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="flex flex-col gap-5 h-5/6 bg-gray-light rounded-lg p-3">
                        <div className="flex justify-between">
                            <div className="flex flex-col text-left">
                                <span className="text-primary-black text-2xl font-bold">Dashboard</span>
                                <span className="text-sm">Check all recent and incoming activities here</span>
                            </div>
                            <div className="h-fit flex gap-3">
                                <button
                                    className={`py-2 px-5 rounded-3xl border-2`}
                                    onClick={showPost}
                                >
                                    Add Post
                                </button>
                                <ButtonStatic label="Read Comments" textColor="lightText" bgColor="lightBg" link="/dashboard" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5">
                                {boardData.map((board, ind) => (
                                    <DataBoard
                                        key={ind} link="/dashboard" desc={board.desc}
                                        textColor={board.textColor} bgColor={board.bgColor}
                                        label={board.label} value={board.number} />
                                ))}
                            </div>
                            <div className="flex">
                                {/* left */}
                                <div className="w-3/4 flex flex-col gap-5">
                                    <div className="flex gap-5">
                                        <div className="w-2/3 flex flex-col gap-3 bg-white rounded-xl p-3">
                                            <Title text="Post Analysis" />
                                            <div className="flex items-center gap-5">
                                                {userAnalyticsData.map((analytics, ind) => (
                                                    <div
                                                        key={ind}
                                                        className="w-full h-full flex flex-col gap-2 justify-end"
                                                    >
                                                        <div className={`flex w-1/7 h-${analytics.value} ${analytics.value < 16 && 'bg-teal-300'} ${analytics.value > 24 && 'bg-red-800'} ${analytics.value >= 16 && 'bg-teal-800'} rounded-3xl`}></div>
                                                        <span className="text-sm">{analytics.day}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-1/3 flex flex-col justify-between text-left bg-white rounded-2xl p-3">
                                            <div className="flex justify-between">
                                                <Title text="Requests" />
                                                <ReadMore text="See All" link="#" />
                                            </div>
                                            <div className="flex justify-center gap-8">
                                                <div className="w-10 mt-2">
                                                    <img src={userImg}></img>
                                                </div>
                                                <div className="flex flex-col gap-5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xl">Jalo Tiana</span>
                                                        <span>1 mutual postee</span>
                                                    </div>
                                                    <div className="flex gap-5 capitalize text-sm">
                                                        <span className="text-white bg-teal-light px-3 py-1 rounded-md">confirm</span>
                                                        <span className="bg-gray-light px-3 py-1 rounded-md">decline</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-5">
                                        <div className="w-1/2 flex flex-col bg-white p-3 rounded-xl">
                                            <div className="flex justify-between">
                                                <Title text="Most Trending Posts" />
                                                <ReadMore text="View All" link="/posts" callback={() => setActiveNav('posts')} />
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {recentPostData.map((post, ind) => (
                                                    <div
                                                        key={ind}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center gap-1">
                                                            <div className="flex items-center justify-center w-7 h-7 rounded-full p-1 bg-blue-300">
                                                                <img src={userImg} alt="user" className="w-4"></img>
                                                            </div>
                                                            <div className="flex flex-col text-left text-sm">
                                                                <span className="font-bold text-xs">{post.title}</span>
                                                                <div>
                                                                    <span>posted using: </span>
                                                                    <span className="font-bold">{post.email}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="h-fit flex items-center bg-orange-200 text-white text-xs rounded-lg px-2">{post.status}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="w-1/2 bg-white p-3 rounded-xl">
                                            overall progress
                                        </div>
                                    </div>
                                </div>
                                {/* right */}
                                <div className="w-1/4">
                                    <span>
                                        ddd
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dashboard;