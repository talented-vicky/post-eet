import type { TextButtonProps } from "../../core/models/common/button.model";
import loaderSpinner from "./Loader";

const { BeatLoaderr } = loaderSpinner;

export const TextButton: React.FC<TextButtonProps> = ({ label, disabled, loading, onclick }) => {
    return (
        <button
            disabled={disabled}
            type='button'
            onClick={onclick}
            aria-label={label} // for accessibility (test case)
            className={`w-full text-sm`}
        >
            <span className="flex justify-center xs:text-base sm:text-base md:text-lg lg:text-lg xl:text-lg">
                {loading
                    ? <span> <BeatLoaderr /> </span>
                    : <span className="">{label}</span>
                }
            </span>
        </button>
    )
}