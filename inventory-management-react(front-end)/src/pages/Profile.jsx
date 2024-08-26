import { useEffect, useState, useMemo } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Profile = () => {
  // User Context
  const { user, token } = useContext(AppContext);
  return (
    <>
      <div className='w-[80%] shadow-lg mx-auto my-20 text-2xl mb-3 p-5 rounded-xl space-y-6'>
        <div className='flex gap-8'>
          <label htmlFor='firstName' className='font-bold'>
            First Name:
          </label>
          <p>{user && user.first_name}</p>
        </div>
        <div className='flex gap-8'>
          <label htmlFor='lastName' className='font-bold'>
            Last Name:
          </label>
          <p>{user && user.last_name}</p>
        </div>
        <div className='flex gap-8'>
          <label htmlFor='email' className='font-bold mr-14'>
            Email:
          </label>
          <p>{user && user.email}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
