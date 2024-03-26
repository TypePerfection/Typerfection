import React, { useState, useEffect } from 'react';
import { LoremIpsum } from 'lorem-ipsum';

const ParagraphGenerator = () => {
  const [loremText, setLoremText] = useState('');

  // Function to generate Lorem Ipsum text
  const generateLoremIpsum = () => {
    const lorem = new LoremIpsum();
    return lorem.generateWords(150); // Adjust the number of words as needed
  };

  // Effect to generate Lorem Ipsum text once when the component mounts
  useEffect(() => {
    setLoremText(generateLoremIpsum());
  }, []);

  return (
    <div>
      <h2>Lorem Ipsum Generator</h2>
      <p>{loremText}</p>
      <h3>End of Paragraph</h3>
    </div>
  );
};

export default ParagraphGenerator;
