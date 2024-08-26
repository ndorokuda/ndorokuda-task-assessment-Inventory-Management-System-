import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddNewProduct = ({ addProductSubmit }) => {
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Searching Supplier List from backend to show in the Select Supplier dropdown
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };

    // Searching Category List from backend to show in the Select Supplier dropdown
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
      }
    };
    fetchCategories();
    fetchSuppliers();
  }, []);

  const submitProduct = (e) => {
    e.preventDefault();
    const product = {
      quantity,
      unit_price: unitPrice,
      name: productName,
      description,
      category: {
        name: categoryName,
      },
      supplier: {
        name: supplierName,
      },
    };
    toast.success('Product Added Successfully');
    addProductSubmit(product);

    return navigate('/inventory');
  };
  return (
    <div>
      <section>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={submitProduct}>
              <h2 className='text-3xl text-center mb-6 font-bold'>
                Create a new Product
              </h2>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Product Name
                </label>
                <input
                  type='text'
                  id='product_name'
                  name='name'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Quantity
                </label>
                <input
                  type='text'
                  id='quantity'
                  name='quantity'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Unit Price
                </label>
                <input
                  type='text'
                  id='unit_price'
                  name='unit_price'
                  className='border rounded w-full py-2 px-3 mb-2'
                  required
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Category Name
                </label>
                <select
                  id='category_name'
                  name='category_name'
                  className='border rounded w-full py-2 px-3'
                  required
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                >
                  <option value=''>Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Supplier Name
                </label>
                <select
                  id='supplier_name'
                  name='supplier_name'
                  className='border rounded w-full py-2 px-3'
                  required
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                >
                  <option value=''>Select Supplier</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.id} value={supplier.name}>
                      {supplier.name}
                    </option>
                  ))}
                </select>
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
                  placeholder='Add the description of the product'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <button
                  className='bg-teal hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddNewProduct;
