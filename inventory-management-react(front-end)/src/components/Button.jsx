import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  icon: ButtonIcon,
  text,
  buttonClasses,
  handleClick,
  linkTo,
}) => {
  return (
    <div>
      <Link to={linkTo}>
        <button
          className={
            'text-white py-2 px-2 rounded-md font-bold ' + buttonClasses
          }
          onClick={handleClick}
          href={linkTo}
        >
          {ButtonIcon && <ButtonIcon className='inline mb-1 mr-1' />}
          {text}
        </button>
      </Link>
    </div>
  );
};

export default Button;
