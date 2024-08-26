import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { FaUser } from 'react-icons/fa';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const MainHeader = () => {
  const { user, token, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogout(e) {
    e.preventDefault();
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }
  return (
    <>
      <div className='flex justify-between items-center shadow-lg h-[105px] p-3'>
        <div>
          <p className='font-bold text-3xl'>
            Welcome {user && user.first_name}
          </p>
        </div>

        <div className='flex gap-4 text-xl'>
          {/* User Profile */}
          <Link to='/profile' className='flex gap-2 items-center'>
            <FaUser />
            <p>Profile</p>
          </Link>

          {/* Logout Button */}
          <div className='flex gap-2 items-center'>
            <FaArrowRightFromBracket />
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHeader;
