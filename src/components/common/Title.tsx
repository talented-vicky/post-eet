const Title: React.FC<{ text: string }> = ({ text }) => {
    return (
        <span className="text-left font-bold">{text}</span>
    )
}

export default Title;