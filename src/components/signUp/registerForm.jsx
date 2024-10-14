import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add useNavigate for navigation
import './signUp.css';

const RegisterForm = ({ setBoxName }) => {
  const [schoolName, setSchoolName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Assume registration is successful
    console.log("Shool name:", schoolName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    // After registration, redirect the user to login or auto-login
    navigate('/');  // Redirect to login page after successful registration
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input 
        type="text" 
        name="name" 
        placeholder="School name" 
        value={schoolName} 
        onChange={(e) => setSchoolName(e.target.value)} 
        required 
      />
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

      <input 
        type="password" 
        name="confirmPassword" 
        placeholder="Confirm Password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        required 
      />

      <button type="submit">Register</button>

      <p>
        Already have an account? 
        <span onClick={() => setBoxName('login')} style={{ cursor: 'pointer', color: 'blue' }}> 
          <i> Login</i>
        </span>
      </p>
    </form>
  );
};

export default RegisterForm;
