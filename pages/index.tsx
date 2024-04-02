import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import Link from 'next/link';

function Page() {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [wordPos, setWordPos] = useState(0);
  const [charPos, setCharPos] = useState(0);
  const inputText = 'welcome to typerfection!';

  const handleKeyPress = (event: React.KeyboardEvent) => {
    const key = event.key.toLowerCase();
    setPressedKeys([...pressedKeys, key]);
  
    const textArray = inputText.split(' ');
  
    if (key === textArray[wordPos][charPos]) {
      // If the pressed key matches the current character
      if (charPos < textArray[wordPos].length - 1) {
        // If there are more characters in the word, move to the next character
        setCharPos(charPos + 1);
      } else {
        // If it's the last character of the word, move to the next word
        if (wordPos < textArray.length - 1) {
          setWordPos(wordPos + 1);
          setCharPos(0);
        }
      }
    } else {
      // If the pressed key doesn't match the current character, reset to the beginning of the word
      setCharPos(0);
    }
  };
  const renderText = () => {
    const textArray = inputText.split(' ');
    const output: React.ReactNode[] = [];
  
    textArray.forEach((word, index) => {
      const chars: React.ReactNode[] = [];
      for (let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        const isCurrentChar = index === wordPos && i === charPos;
        const isCorrect = pressedKeys.includes(char.toLowerCase());
  
        chars.push(
          <span key={i} className={isCurrentChar ? (isCorrect ? 'text-green-500 animate-blink' : 'text-blue-500') : ''}>
            {char}
          </span>
        );
      }
      output.push(<span key={index}>{chars}</span>);
      // Add space between words if not the last word
      if (index < textArray.length - 1) {
        output.push(' ');
      }
    });
  
    return output;
  };
  
  return (
    <Layout>
      <div className="mx-auto text-center">
        <h1 className="pt-16 text-4xl font-mono">Typerfection</h1>
        <div className="mt-5 ">
          <Link className="bg-violet-600 text-white p-2 rounded-md font-mono text-xl hover:shadow-xl hover:p-3" href="/learn">
            Begin
          </Link>
        </div>
        <div className="mt-8">
          {renderText()}
        </div>
        <div className="mt-4 text-gray-500">
          Try typing the characters to see the animation!
        </div>
        <div className="mt-4 text-gray-500">
          {pressedKeys.join('')}
        </div>
        <div className="mt-4 text-gray-500">
            <label htmlFor="textInput" className="sr-only">
                Enter Text
            </label>
            <input id="textInput" type="text" onKeyPress={handleKeyPress} placeholder="Type here..." />
        </div>
      </div>
    </Layout>
  );  
}

export default Page;