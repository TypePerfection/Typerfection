import React, { createContext, useState, useContext } from 'react';

interface TextInputContextType {
  inputValues: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

const TextInputContext = createContext<TextInputContextType | undefined>(undefined);

const TextInput: React.FC<{ index: number }> = ({ index }) => {
  const [inputValues, setInputValues] = useState<string[]>(['']);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, inputIndex: number) => {
    const newInputValues = [...inputValues];
    newInputValues[inputIndex] = event.target.value;
    setInputValues(newInputValues);
  };

  return (
    <TextInputContext.Provider value={{ inputValues, handleInputChange }}>
      <input
        type="text"
        value={inputValues[index]}
        onChange={(event) => handleInputChange(event, index)}
      />
    </TextInputContext.Provider>
  );
};

export const useTextInput = (): TextInputContextType => {
  const context = useContext(TextInputContext);
  if (!context) {
    throw new Error('useTextInput must be used within a TextInputProvider');
  }
  return context;
};

export const TextInputProvider: React.FC = ({ children }) => {
  const [inputValues, setInputValues] = useState<string[]>(['']);

  const handleInputChange: TextInputContextType['handleInputChange'] = (event, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  return (
    <TextInputContext.Provider value={{ inputValues, handleInputChange }}>
      {children}
    </TextInputContext.Provider>
  );
};

export default TextInput;