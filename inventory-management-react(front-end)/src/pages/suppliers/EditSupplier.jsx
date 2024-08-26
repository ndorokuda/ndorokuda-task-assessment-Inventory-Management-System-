import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';

const EditSupplier = ({ editSupplierSubmit, deleteSupplier }) => {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAdress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  // Sumbit update supplier backend
  const updateSupplier = (e) => {
    e.preventDefault();
    const supplier = {
      id,
      name,
      email_address: emailAddress,
      phone_number: phoneNumber,
    };
    editSupplierSubmit(supplier);
    return navigate('/suppliers');
  };

  // Delete Purchase
  const deleteSupplierHandler = (e) => {
    deleteSupplier(id);

    return navigate('/suppliers');
  };
  return (
    <div>
      <section className='relative'>
        <div className='absolute right-5 top-5'>
          <button
            onClick={deleteSupplierHandler}
            className='py-2 px-4 text-white rounded  bg-red-500 hover:bg-red-700'
          >
            <FaTrash className='inline mb-1 mr-1' />
            Delete
          </button>
        </div>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={updateSupplier}>
              <h2 className='text-3xl text-center mb-6 font-bold'>
                Create a new Supplier
              </h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Name
                </label>
                <input
                  type='text'
                  id='supplier_name'
                  name='supplier_name'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  id='supplier_email'
                  name='email_address'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={emailAddress}
                  onChange={(e) => setEmailAdress(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Phone Number
                </label>
                <input
                  type='text'
                  id='phone_number'
                  name='phone_number'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div>
                <button
                  className='bg-teal hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Update Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditSupplier;
