import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Logo = () => {
  return (
    <>
      <Link to={'/'}>
        <div className='flex justify-center gap-5 border-b border-slate-gray-50 border-opacity-10 pb-5 shadow-lg'>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
            <img src={logo} alt='logo' className='w-full h-full' />
          </div>
          <p className='self-center text-3xl font-extrabold text-white'>IMS</p>
        </div>
      </Link>
    </>
  );
};

export default Logo;
