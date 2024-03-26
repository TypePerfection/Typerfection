import XText from "@/components/Inputs/XText";
import XButton from "@/components/Inputs/XButton";
import XInputField from "@/components/Inputs/XInputField";

export default function showcase() {
    return (
        <div className="pl-2">
            <div>
                <h1>Button</h1>
                <div className="border border-1 border-black p-2">

                    <XButton onClick={() => alert('You Clicked!')} text="Default Text" />
                </div>
            </div>
            <div>
                <h1>Text</h1>
                <div className="border border-1 border-black p-2">
                    <XText defaultText="Default Text"/>
                </div>
            </div>
            <div>
                <h1>Input Field</h1>
                <div className="border border-1 border-black p-2">
                    <XInputField defaultText="Default Text" label="Label"/>
                </div>
            </div>

        </div>
    )
}