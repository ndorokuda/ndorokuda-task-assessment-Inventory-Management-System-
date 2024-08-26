import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';
import NavMenu from '../components/NavMenu';
import MainHeader from '../components/MainHeader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const MainLayout = ({ children }) => {
  return (
    <div className='relative'>
      <main className=' p-5'>
        {/* Wrapper for all body objects */}
        <div className='grid grid-cols-70/30 gap-3 my-5'>
          {/* Navigation/Side Bar */}
          <aside className='bg-darkCharcol shadow-lg rounded-lg max-h-[700px] overflow-auto  text-lightGray py-8 '>
            <Logo />
            <NavMenu />
          </aside>
          <section className='shadow-md max-h-[700px] overflow-auto'>
            <MainHeader />
            <Outlet />
            <ToastContainer />
          </section>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
