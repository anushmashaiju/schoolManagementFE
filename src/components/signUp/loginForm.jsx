import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './signUp.css';  // Import the updated CSS file

const LoginForm = ({ setBoxName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate role-based navigation (you should fetch this info from a backend)
    const userRole = getUserRole(email); // A function to fetch role based on email

    if (userRole === 'Admin') {
      navigate('/admin');  // Navigate to Admin Dashboard
    } else if (userRole === 'OfficeStaff') {
      navigate('/staff');  // Navigate to Office Staff Dashboard
    } else if (userRole === 'Librarian') {
      navigate('/librarian');  // Navigate to Librarian Dashboard
    } else {
      alert('Invalid credentials or role');
    }
  };

  const getUserRole = (email) => {
    // Mockup role selection based on email, replace with real logic
    if (email === 'admin@school.com') return 'Admin';
    if (email === 'staff@school.com') return 'OfficeStaff';
    if (email === 'librarian@school.com') return 'Librarian';
    return null;
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />

      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />

      <button type="submit">Login</button>

      <p>
        Don't have an account? 
        <span onClick={() => setBoxName('signup')}> 
          <i> Sign Up</i>
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
