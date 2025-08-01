import { Link } from "react-router-dom";
import type { ReadMoreProps } from "../../core/models/common/read-more.model";


const ReadMore: React.FC<ReadMoreProps> = ({ text, link, callback }) => {
    return (
        <Link
            to={link}
            onClick={callback}
            className="text-teal-light text-sm"
        >
            {text}
        </Link>
    )
}

export default ReadMore;