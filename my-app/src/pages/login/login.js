import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Api/apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        navigate('/');
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
      <label style={{ marginBottom: '10px' }}>
        Email
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '80%', padding: '10px' }} />
      </label>
      <label style={{ marginBottom: '10px' }}>
        Password
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '80%', padding: '10px' }} />
      </label>
      <button type="submit" style={{ padding: '10px', width: '80%', margin: '0 auto' }}>Login</button>
    </form>
  );
}

export default Login;