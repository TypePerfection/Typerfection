import React from 'react';
import TextInput, { TextInputProvider, useTextInput } from '@/components/TextInput';
import XButton from '@/components/XButton';
import XInputField from '@/components/XInputField';
import XText from '@/components/XText';

const DisplayInputs: React.FC = () => {
  const { inputValues } = useTextInput();
  return (
    <div>
      {inputValues.map((value, index) => (
        <p key={index}>Input {index + 1}: {value}</p>
      ))}
    </div>
  );
};

export default function Showcase() {
  return (
    <TextInputProvider>
      <div className="pl-2">
        <div>
          <h1>My App</h1>
          <TextInput index={0} />
          <TextInput index={1} />
          {/* You can access the input values here */}
          <DisplayInputs />
          {/* Other components */}
        </div>
        <div>
          <h1>Button</h1>
          <div className="border border-1 border-black p-2">
            <XButton onClick={() => alert('You Clicked!')} text="Default Text" />
          </div>
        </div>
        <div>
          <h1>Text</h1>
          <div className="border border-1 border-black p-2">
            <XText defaultText="Default Text" />
          </div>
        </div>
        <div>
          <h1>Input Field</h1>
          <div className="border border-1 border-black p-2">
            <XInputField defaultText="Default Text" label="Label" />
          </div>
        </div>
      </div>
    </TextInputProvider>
  );
}