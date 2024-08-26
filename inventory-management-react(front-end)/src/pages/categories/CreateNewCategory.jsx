import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateNewCategory = ({ createCategorySubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const submitCategory = (e) => {
    e.preventDefault();
    const category = {
      name,
      description,
    };
    toast.success('Category Created Successfully');
    createCategorySubmit(category);
    return navigate('/categories');
  };
  return (
    <div>
      <section>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitCategory}>
              <h2 className='text-3xl text-center mb-6 font-bold'>
                Create New Category
              </h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Category Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='border rounded w-full py-2 px-3 mb-2'
                  placeholder='eg. Food, Electronics, Clothes, etc'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='description'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Description
                </label>
                <textarea
                  id='description'
                  name='description'
                  className='border rounded w-full py-2 px-3'
                  rows='4'
                  placeholder='Add the description of the category'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div>
                <button
                  className='bg-teal hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateNewCategory;
