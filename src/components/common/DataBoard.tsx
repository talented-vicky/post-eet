import { Link } from "react-router-dom";
import type { DataBoardProps } from "../../core/models/common/data-board.model";

import arrowImg from '../../assets/icons/arrows/up-right-arrow.svg';

const colorClass: Record<string, string> = {
    lightBg: 'bg-white',
    darkBg: 'bg-teal-gradient',
    lightText: 'text-gray-main',
    darkText: 'text-white'
}

const DataBoard: React.FC<DataBoardProps> = ({ label, number, link, textColor, bgColor }) => {
    return (
        <div className={`w-full flex flex-col gap-3 items-start justify-between ${colorClass[textColor]} ${colorClass[bgColor]} rounded-xl p-3`}>
            <div className="w-full flex justify-between items-center">
                <span>{label}</span>
                <Link to={link} className={`${bgColor === 'lightBg' && 'border-2'} p-2 bg-white border-2 rounded-full`}>
                    <img src={arrowImg} alt="arrow" className="w-2"></img>
                </Link>
            </div>
            <span className="text-4xl">{number}</span>
            <div className="flex gap-2">
                <span>dk</span>
                <span>View all</span>
            </div>
        </div>
    )
}

export default DataBoard;