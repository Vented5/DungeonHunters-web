// src/components/Login.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import '../styles/Login.css';

type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between login and register
  const navigate = useNavigate(); // This will now work

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (isRegistering) {
        // Register the user
        await axios.post('http://localhost:3000/api/register', data); // Update with your backend URL
        setIsRegistering(false); // Switch back to login after registration
        setErrorMessage('Registration successful! Please log in.');
      } else {
        // Log in the user
        const response = await axios.post('http://localhost:3000/api/login', data); // Update with your backend URL
        console.log('Login successful:', response.data);
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (error) {
      setErrorMessage(isRegistering ? 'Registration failed. User may already exist.' : 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <input
            type="email"
            placeholder=" "
            {...register('email', { required: 'Email is required' })}
            disabled={isLoading}
          />
          <label>Email</label>
        </div>
        {errors.email && <span className="error-message">{errors.email.message}</span>}

        <div className="input-group">
          <input
            type="password"
            placeholder=" "
            {...register('password', { required: 'Password is required' })}
            disabled={isLoading}
          />
          <label>Password</label>
        </div>
        {errors.password && <span className="error-message">{errors.password.message}</span>}

        <div className="remember-me">
          <input
            type="checkbox"
            id="rememberMe"
            {...register('rememberMe')}
            disabled={isLoading}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <button type="submit" className={isLoading ? 'loading' : ''} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : isRegistering ? 'Register' : 'Login'}
        </button>

        {errorMessage && (
          <div className={isRegistering && errorMessage.includes('successful') ? 'success-message' : 'error-message'}>
            {errorMessage}
          </div>
        )}
      </form>

      <p>
        <a
          href="/forgot-password"
          style={{ color: '#007bff', textDecoration: 'none', fontSize: '0.875rem' }}
        >
          Forgot Password?
        </a>
        {isRegistering ? 'Already have an account? ' : 'Need an account? '}
        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isRegistering ? 'Log in here' : 'Register here'}
        </button>
      </p>
    </div>
  );
};

export default Login;