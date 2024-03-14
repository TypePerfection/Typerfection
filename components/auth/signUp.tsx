// src/components/SignUp.tsx
import React, { useState, ChangeEvent } from 'react';

const validatePassword = (password: string): boolean => {
  // Your password validation logic here
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password);
};

const SignUp: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  return (
    <div>
      <label>Password:</label>
      <input type="password" value={password} onChange={handlePasswordChange} />
      {!isPasswordValid && <p>Password must meet the specified criteria.</p>}
    </div>
  );
};

export default SignUp;