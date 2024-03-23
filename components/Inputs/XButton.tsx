function XButton({ onClick, text = '', width = 100, height = 30 }) {
    const buttonStyle = {
        width: width,
        height: height,
    }
    return (
        <button onClick={onClick} style={buttonStyle} className="bg-sky-950 text-white flex justify-center items-center rounded outline outline-1 outline-white">{text}</button>
    )
}
export default XButton;
