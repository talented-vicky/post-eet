import partnersData from "../../../core/data/partners.data";
import ButtonStatic from "../../../components/common/ButtonStatic";

import mainImg from '../../../assets/images/bg/main.webp';


function Home() {
    return (
        <div className="flex"
        >
            <div className="relative w-full bg-primary-dark rounded-3xl">
                <div className="abolute w-full h-3/4 sec-landing-clip bg-primary-black"></div>
                <div className="relative w-11/12 flex flex-col gap-10 justify-between items-center py-5 px-10 bg-white text-white shadow-2xl shadow-black-300 mx-auto my-14">
                    <div className="absolute top-0 bg-primary-dark w-full h-3/4 z-10 landing-clip"></div>
                    {/* navigation */}
                    <div className="w-full flex justify-between items-center z-20">
                        <div className="flex items-center gap-5">
                            <span className="font-semibold text-3xl">POSTeet</span>
                            {['home', 'solutions', 'pricing', 'resources'].map((nav, ind) => (
                                <span key={ind} className="text-primary-light">{nav}</span>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <ButtonStatic label="Log in" textColor="darkText" link="/login" bgColor="darkBg" />
                            <ButtonStatic label="Check Posts" textColor="lightText" link="/" bgColor="lightBg" />
                        </div>
                    </div>
                    {/* body */}
                    <div className="w-full flex z-20">
                        <div className="w-2/3 flex flex-col items-start gap-8 mt-10">
                            <div className="flex flex-col items-start capitalize">
                                <span className="text-5xl font-bold">Share your experience</span>
                                <span className="text-4xl font-semibold text-primary-light">Connect with likeminds</span>
                            </div>
                            <span className="w-2/3 text-left text-primary-light">Every memory, every story, is seen and felt by the world. Join today and unlock the wonder of connection like you'be never experienced 🤗.</span>
                            <ButtonStatic label="Browse posts 🌀" textColor="lightText" link="/" bgColor="lightBg" />
                        </div>
                        <div className="relative">
                            {/* image frame */}
                            <div className="w-full absolute top-20 right-12 rounded-md border-2 border-primary-dark">
                                <img src={mainImg} alt="frame" className="w-full"></img>
                            </div>
                            {/* background phone */}
                            <div className="absolute top-12 -right-36 bg-white -z-10 p-2 rounded-3xl">
                                <div className="relative flex flex-col justify-between items-center w-48 h-80 bg-primary rounded-3xl p-5">
                                    <div className="w-full flex flex-col gap-3">
                                        <div className="relative bg-white h-28 rounded-3xl">
                                            <div className="absolute flex items-center justify-center w-16 h-16 bottom-2 right-2 bg-primary p-2 rounded-full">
                                                <div className="w-16 h-16 bg-white rounded-full"></div>
                                            </div>
                                            <div className="absolute left-0 top-0 bg-primary-light w-20 h-20 sec-triangle-clip"></div>
                                        </div>
                                        <div className="flex"> <div className="bg-primary-light w-28 h-1.5 rounded-2xl"></div> </div>
                                        <div className="flex"> <div className="bg-white w-36 h-1.5 rounded-2xl"></div> </div>
                                        <div className="flex"> <div className="bg-white w-24 h-1.5 rounded-2xl"></div> </div>
                                        <div className="flex justify-end"> <div className="bg-primary-dark w-4 h-4 rounded-full"></div> </div>
                                    </div>
                                    <div className="w-full flex flex-col items-center gap-3">
                                        <div className="w-full flex justify-end"><div className="bg-primary-dark w-20 h-12 rounded-tl-2xl rounded-br-2xl"></div></div>
                                        <div className="flex items-center">
                                            <div className="bg-primary-light w-20 h-2 rounded-2xl"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-2 rounded-3xl">
                                <div className="flex flex-col justify-between items-center w-48 h-96 bg-primary rounded-3xl p-5">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="bg-primary-dark w-12 h-4 rounded-2xl"></div>
                                        <div className="flex items-center gap-2">
                                            {/* <span>⬅</span> */}
                                            <div className="bg-primary-light w-20 h-2 rounded-2xl"></div>
                                        </div>
                                    </div>
                                    <div className="w-full flex flex-col gap-5">
                                        <div className="flex">
                                            <div className="bg-white w-20 h-1.5 rounded-2xl"></div>
                                        </div>
                                        <div className="relative bg-white h-28 rounded-3xl">
                                            <div className="absolute flex items-center justify-center w-20 h-20 -top-2 -left-2 bg-primary p-2 rounded-full">
                                                <div className="w-16 h-16 bg-white rounded-full"></div>
                                            </div>
                                            <div className="absolute right-1/3 top-1/3 bg-primary-dark w-6 h-6 rounded-full"></div>
                                            {/* <div className="absolute right-0 bottom-0 bg-primary-light w-20 h-20 triangle-clip"></div> */}
                                            <svg
                                                viewBox="0 0 100 100"
                                                className="absolute right-0 bottom-0 w-20 h-20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M 0 100 L 100 0 Q 100 100, 97 100 Z"
                                                    fill="currentColor"
                                                    className="text-primary-light"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img></img>
                        </div>
                    </div>
                    {/* partners */}
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-3xl text-black font-semibold">Our Top Partners</span>
                        <div className="flex gap-5">
                            {partnersData.map((partner, ind) => (
                                <div key={ind} className="flex items-center gap-2">
                                    {/* <img></img> */}
                                    <span>🌀</span>
                                    <span className="text-gray-800">{partner.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;