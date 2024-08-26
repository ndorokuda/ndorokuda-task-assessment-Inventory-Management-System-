import { FaHome } from 'react-icons/fa';
import { FaWarehouse } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import { FaLayerGroup } from 'react-icons/fa6';
import { FaCartShopping } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const NavMenu = () => {
  return (
    <>
      <nav className='py-8'>
        <div className=' flex flex-col gap-3 space-y-6'>
          {/* Dashboard Item */}

          <NavLink
            to='/'
            className={({ isActive }) => {
              isActive
                ? 'bg-gray-900 py-5 hover:bg-gray-900'
                : ' py-5 hover:bg-gray-900';
            }}
          >
            <div className='pl-[120px]'>
              <div className='flex items-end  gap-4 '>
                <FaHome className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Dashboard</p>
              </div>
            </div>
          </NavLink>

          {/* Inventory Item */}

          <NavLink to='/inventory'>
            <div className='pl-[120px]'>
              <div className='flex items-end  gap-4 '>
                <FaWarehouse className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Inventory</p>
              </div>
            </div>
          </NavLink>

          {/* Supplier Item */}

          <NavLink to='/suppliers'>
            <div className='pl-[120px]'>
              <div className='flex items-end gap-4 '>
                <FaTruckFast className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Suppliers</p>
              </div>
            </div>
          </NavLink>

          {/* Categories Item */}

          <NavLink className='flex' to='/categories'>
            <div className='pl-[120px]'>
              <div className='flex items-end gap-4 '>
                <FaLayerGroup className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Categories</p>
              </div>
            </div>
          </NavLink>

          {/* Purhcases Item */}

          <NavLink className='flex' to='/purchases'>
            <div className='pl-[120px]'>
              <div className='flex items-end gap-4 '>
                <FaCartShopping className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Purchases</p>
              </div>
            </div>
          </NavLink>

          {/* Users Item */}

          <NavLink to='/users'>
            <div className='pl-[120px]'>
              <div className='flex items-end gap-4 '>
                <FaUsers className='mt-1 text-4xl text-teal2' />
                <p className='font-bold text-2xl'>Users</p>
              </div>
            </div>
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
