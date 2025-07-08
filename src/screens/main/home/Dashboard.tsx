import navHomeData from "../../../core/data/dashboard/home.data";
import navOptionsData from "../../../core/data/dashboard/options.data";

import searchImg from '../../../assets/icons/nav/search.svg';
import emailImg from '../../../assets/icons/nav/email.svg';
import notifImg from '../../../assets/icons/nav/notification.svg';
import userImg from '../../../assets/icons/nav/profile.svg';

import ButtonStatic from "../../../components/common/ButtonStatic";
import DataBoard from "../../../components/common/DataBoard";
import { Title } from "../../../components/common/Title";


function Dashboard() {
    const navhomeData = navHomeData;
    const navoptionsData = navOptionsData;

    const boardData = [
        {
            label: 'Total Posts',
            number: 24,
            bgColor: 'darkBg',
            textColor: 'darkText',
            desc: 'finalinter bolanty',
        },
        {
            label: 'Reveiewed Comments',
            number: 10,
            bgColor: 'lightBg',
            textColor: 'lightText',
            desc: 'All comments have been reviewed',
        },
        {
            label: 'Blocked Posts',
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

    const anylyticsData = [
        {
            day: 'S',
            value: 12,
            color: 'green-300'
        },
        {
            day: 'M',
            value: 28,
            color: 'green-600'
        },
        {
            day: 'T',
            value: 20,
            color: 'teal-900'
        },
        {
            day: 'W',
            value: 12,
            color: 'green-300'
        },
        {
            day: 'T',
            value: 4,
            color: 'teal-400'
        },
        {
            day: 'F',
            value: 16,
            color: 'blue-300'
        },
        {
            day: 'S',
            value: 28,
            color: 'blue-300'
        },
    ]

    const postData = [
        {
            title: 'Almand Serrif',
            email: 'almandserrif@gmail.com',
            status: 'Pending',
            picture: 'dk'
        },
        {
            title: 'Eric Donjamin',
            email: 'ericdonjamin@gmail.com',
            status: 'Completed',
            picture: 'dk'
        },
        {
            title: 'Bakola TeaserNay',
            email: 'bakolateasernay@hotmail.com',
            status: 'Completed',
            picture: 'dk'
        },
        {
            title: 'Fletcher Giggs',
            email: 'fletchergiggs@yahoo.com',
            status: 'Failed',
            picture: 'dk'
        },
    ]

    return (
        <div className="flex gap-2 text-gray-main bg-white border border-gray-100 shadow-xl rounded-xl p-3">
            {/* Sidebar */}
            <div className="w-1/5 flex flex-col bg-gray-light rounded-lg gap-5 py-5">
                <div className="flex gap-1 mb-10 px-5">
                    <img></img>
                    <span className="text-black font-bold">POSTeet</span>
                </div>
                <div className="flex flex-col items-start">
                    <span className="mb-3 ml-4">Home</span>
                    <div className="w-full flex flex-col gap-1">
                        {navhomeData.map((nav, ind) => (
                            <div
                                key={ind}
                                className="flex justify-between mr-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-teal-dark rounded-tr-lg rounded-br-lg"></div>
                                    <img src={nav.icon} alt="icon" className="w-4"></img>
                                    <span>{nav.text}</span>
                                </div>
                                {nav.count && <span className="flex items-center bg-teal-dark text-sm text-gray-light px-3 rounded-md">{nav.count}</span>}
                            </div>
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
                                {/* <div className="w-1.5 h-6 bg-teal-600 rounded-tr-lg rounded-br-lg"></div> */}
                                <img src={nav.icon} alt="icon" className="w-4"></img>
                                <span>{nav.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="flex flex-col gap-3 text-white bg-teal-gradient p-3 mx-3 rounded-xl"> */}
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
            </div>

            {/* Main Dashboard */}
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
                        <div className="h-fit bg-white p-2 rounded-2xl">
                            <img src={emailImg} alt="email" className="w-5"></img>
                        </div>
                        <div className="h-fit bg-white p-2 rounded-2xl">
                            <img src={notifImg} alt="notification" className="w-4"></img>
                        </div>
                        <div className="flex ">
                            dd
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-black font-bold">Toby Cane</span>
                            <span>tobycane@gmail.com</span>
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
                            <ButtonStatic label="Add Post" textColor="darkText" bgColor="darkBg" link="/dashboard" />
                            <ButtonStatic label="Read Comments" textColor="lightText" bgColor="lightBg" link="/dashboard" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5">
                            {boardData.map((board, ind) => (
                                <DataBoard
                                    key={ind}
                                    link="/dashboard"
                                    bgColor={board.bgColor}
                                    label={board.label}
                                    number={board.number}
                                    textColor={board.textColor}
                                />
                            ))}
                        </div>
                        <div className="flex">
                            {/* left */}
                            <div className="w-3/4 flex flex-col gap-5">
                                <div className="flex gap-5">
                                    <div className="w-2/3 flex flex-col gap-3 bg-white rounded-xl p-3">
                                        <Title text="Post Analysis" />
                                        <div className="flex items-center gap-5">
                                            {anylyticsData.map((analytics, ind) => (
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
                                        <Title text="Reminders" />
                                        <div className="flex flex-col">
                                            <span className="text-3xl">dddd</span>
                                            <span>dldlddl</span>
                                        </div>
                                        <span>dldlddl</span>
                                    </div>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-1/2 flex flex-col bg-white p-3 rounded-xl">
                                        <div className="flex justify-between">
                                            <Title text="Recent Posts" />
                                            <ButtonStatic link="/dashboard" bgColor="lightBg" label="View All" textColor="lightText" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {postData.map((post, ind) => (
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
        </div>
    )
}

export default Dashboard;