import React from 'react';

const Card = ({ icon: CardIcon, name, value }) => {
  return (
    <>
      <div className='flex flex-col items-center space-y-2 shadow-xl py-5'>
        {CardIcon && <CardIcon className='text-6xl text-teal' />}
        <p className='text-black font-extrabold text-2xl'>{value}</p>
        <p className='font-bold text-lg'>{name}</p>
      </div>
    </>
  );
};

export default Card;
