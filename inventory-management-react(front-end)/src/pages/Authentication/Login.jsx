import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      navigate('/');
    }
  };
  return (
    <div>
      <div className='mx-4'>
        <div className='bg-gray-50 border border-gray-200 p-10 rounded max-w-lg mx-auto mt-24'>
          <header className='text-center'>
            <h2 className='text-2xl font-bold uppercase mb-1'>Sign In</h2>
          </header>

          <form action='' onSubmit={handleLogin}>
            <div className='mb-6'>
              <label htmlFor='email' className='inline-block text-lg mb-2'>
                Email
              </label>
              <input
                className='border border-gray-200 rounded p-2 w-full'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className='text-red-400 text-sm'>{errors.email[0]}</p>
              )}
            </div>

            <div className='mb-6'>
              <label htmlFor='password' className='inline-block text-lg mb-2'>
                Password
              </label>
              <input
                type='password'
                className='border border-gray-200 rounded p-2 w-full'
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <p className='text-red-400 text-sm'>{errors.password[0]}</p>
              )}
            </div>

            <div className='mb-6'>
              <button
                type='submit'
                className='bg-darkCharcol w-full text-white rounded py-2 px-4 hover:bg-black'
              >
                Sign In
              </button>
            </div>

            <div className='mt-8'>
              <p>
                Dont't have an account?
                <Link to='/register' className='text-sky-500'>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
