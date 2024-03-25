// src/components/SignUp.tsx
import React, { useState, ChangeEvent } from 'react';

const validatePassword = (password: string): boolean => {
  // Your password validation logic here
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
};

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  const handleSignUp = () => {
    // Implement sign-up functionality here
    console.log('Signing up with:', username, password);
  };

  return (
    <div>
      <label className="block">Username:</label>
      <input type="text" value={username} onChange={handleUsernameChange} title="Enter your username" className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:border-indigo-500" />
      <label className="block">Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} title="Enter your password" className="border border-gray-300 rounded-md px-3 py-2 mt-1 mb-2 focus:outline-none focus:border-indigo-500" />
      {!isPasswordValid && <p className="text-red-500">Password must meet the specified criteria.</p>}
      <button onClick={handleSignUp} className="bg-indigo-500 text-white px-4 py-2 rounded-md mt-2">Sign Up</button>
    </div>
  );
};

export default SignUp;
