interface TitleProps {
    text: string;
}

export const Title: React.FC<TitleProps> = ({ text }) => {
    return (
        <span className="text-left font-bold">{text}</span>
    )
}