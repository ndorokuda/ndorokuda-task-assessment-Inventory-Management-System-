import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({});
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirmation: passwordConfirmation,
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
            <h2 className='text-2xl font-bold uppercase mb-1'>Sign Up</h2>
          </header>

          <form action='' onSubmit={handleRegister}>
            <div className='mb-6'>
              <label htmlFor='first_name' className='inline-block text-lg mb-2'>
                First Name
              </label>
              <input
                type='text'
                className='border border-gray-200 rounded p-2 w-full'
                name='first_name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.first_name && (
                <p className='text-red-400 text-sm'>{errors.first_name[0]}</p>
              )}
            </div>
            <div className='mb-6'>
              <label htmlFor='first_name' className='inline-block text-lg mb-2'>
                Last Name
              </label>
              <input
                type='text'
                className='border border-gray-200 rounded p-2 w-full'
                name='last_name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.last_name && (
                <p className='text-red-400 text-sm'>{errors.last_name[0]}</p>
              )}
            </div>

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
              <label htmlFor='password2' className='inline-block text-lg mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                className='border border-gray-200 rounded p-2 w-full'
                name='password_confirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
            </div>

            <div className='mb-6'>
              <button
                type='submit'
                className='bg-darkCharcol w-full text-white rounded py-2 px-4 hover:bg-black'
              >
                Sign Up
              </button>
            </div>

            <div className='mt-8'>
              <p>
                Already have an account?
                <Link to='/login' className='text-sky-500'>
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
