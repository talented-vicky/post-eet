import navHomeData from "../../../core/data/dashboard/home.data";
import navOptionsData from "../../../core/data/dashboard/options.data";

function Dashboard() {
    const navhomeData = navHomeData;
    const navoptionsData = navOptionsData;

    return (
        <div className="flex gap-2 text-gray-main bg-white border border-gray-100 shadow-xl rounded-xl p-3">
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
            <div className="w-4/5 flex flex-col bg-gray-light gap-2 rounded-lg">
                <div>
                    search/profile icon
                </div>
                <div>
                    dashboard component
                </div>
            </div>
        </div>
    )
}

export default Dashboard;