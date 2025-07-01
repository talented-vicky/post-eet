import type { ButtonProps } from "../../core/models/common/button.model";
import loaderSpinner from "./Loader";

const { BeatLoaderr } = loaderSpinner;

const Button: React.FC<ButtonProps> = ({
    label,
    loadingLabel,
    disabled,
    loading,
    type,
    onclick
}) => {
    return (
        <button
            disabled={disabled}
            type={type}
            onClick={onclick}
            className={`w-full bg-blue-gradient xs:rounded-2xl sm:rounded-2xl md:rounded-3xl lg:rounded-3xl xs:px-8 sm:px-8 md:px-16 lg:px-16 xl:px-16 xs:py-2 sm:py-2 md:py-5 lg:py-2 xl:py-3 text-sm text-white`}
        >
            <span className="flex justify-center font-bold xs:text-base sm:text-base md:text-lg lg:text-lg xl:text-lg">
                {loading
                    ? <span className="flex items-center gap-3">
                        <span className="lowercase">{`${loadingLabel}...`}</span>
                        <span> <BeatLoaderr /> </span>
                    </span>
                    : <span className="uppercase">{label}</span>
                }
            </span>
        </button>
    )
}

export default Button;