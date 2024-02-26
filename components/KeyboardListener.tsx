import React, { useState, useEffect } from 'react';

const KeyboardListener = () => {
  const [pressedKey, setPressedKey] = useState(null);

  const handleKeyPress = (event: any) => {
    setPressedKey(event.key);
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, []) // Empty dependency array means this effect runs only once after the component mounts

  if(pressedKey == "i"){
    alert("Button is i!")
  }
  
  return (
    <div>
      <h1>Press a Key</h1>
      {pressedKey && <p>You pressed: {pressedKey}</p>}
    </div>
  )
}

export default KeyboardListener;