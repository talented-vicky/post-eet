import { Link } from "react-router-dom";
import type { ButtonStaticProps } from "../../core/models/common/button-static.model";

const colorClass: Record<string, string> = {
    lightBg: 'bg-white',
    darkBg: 'bg-primary-dark',
    lightText: 'text-black',
    darkText: 'text-white'
}

const ButtonStatic: React.FC<ButtonStaticProps> = ({ label, link, textColor, bgColor }) => {
    return (
        <button className={`${colorClass[textColor]} ${colorClass[bgColor]} py-2 px-5 rounded-3xl ${bgColor === 'darkBg' && 'border-2'}`}>
            <Link to={link} > {label} </Link>
        </button>
    )
}

export default ButtonStatic;