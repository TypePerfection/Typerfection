import XText from "./XText";
function XInputField({label, defaultText}){
    return(
        <div>
            <div>
                <h1>{label}</h1>
            </div>
            <div>
                <XText defaultText={defaultText}/>
            </div>
        </div>
    )
}
export default XInputField;