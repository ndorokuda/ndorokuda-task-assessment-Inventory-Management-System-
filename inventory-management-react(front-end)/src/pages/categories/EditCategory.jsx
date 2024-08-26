import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const EditCategory = ({ updateCategorySubmit, deleteCategory }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const updateCategory = (e) => {
    e.preventDefault();
    const category = {
      id,
      name,
      description,
    };
    toast.success('Category Updated Successfully');
    updateCategorySubmit(category);
    return navigate('/categories');
  };

  // Delete Category
  const deleteCategoryHandler = (e) => {
    deleteCategory(id);

    return navigate('/categories');
  };
  return (
    <div>
      <section className='relative'>
        <div className='absolute right-5 top-5'>
          <button
            onClick={deleteCategoryHandler}
            className='py-2 px-4 text-white rounded  bg-red-500 hover:bg-red-700'
          >
            <FaTrash className='inline mb-1 mr-1' />
            Delete
          </button>
        </div>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={updateCategory}>
              <h2 className='text-3xl text-center mb-6 font-bold'>
                Edit Category
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
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditCategory;
