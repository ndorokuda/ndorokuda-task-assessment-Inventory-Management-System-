import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa6';
import { toast } from 'react-toastify';

const EditPurchase = ({ updatePurchaseSubmit, deletePurchase }) => {
  const [quantity, setQuantity] = useState('');
  const [remarks, setRemarks] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [supplierName, setSupplierName] = useState('');
  const [productName, setProductName] = useState('');

  const { id } = useParams();

  useEffect(() => {
    // Fetching suppliers from backend API to show in the Select Supplier dropdown
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    // Fetching product list from backend API to show in the Select Supplier dropdown
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    fetchInventory();
    fetchSuppliers();
  }, []);

  const navigate = useNavigate();

  // Sumbit new Purchase to backend
  const updatePurchase = (e) => {
    e.preventDefault();
    const purchase = {
      id,
      quantity,
      remarks,
      supplier: {
        name: supplierName,
      },
      product: {
        name: productName,
      },
      user: {
        first_name: 'Kudakwashe',
      },
    };
    toast.success('Order Updated Successfully');
    updatePurchaseSubmit(purchase);

    return navigate('/purchases');
  };

  // Delete Purchase
  const deletePurchaseHandler = (e) => {
    deletePurchase(id);

    return navigate('/purchases');
  };
  return (
    <div>
      <section className='relative'>
        <div className='absolute right-5 top-5'>
          <button
            onClick={deletePurchaseHandler}
            className='py-2 px-4 text-white rounded  bg-red-500 hover:bg-red-700'
          >
            <FaTrash className='inline mb-1 mr-1' />
            Delete
          </button>
        </div>
        <div className='container m-auto max-w-2xl py-24'>
          <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
            <form onSubmit={updatePurchase}>
              <h2 className='text-3xl text-center mb-6 font-bold'>
                Edit Purchase
              </h2>

              {/* Products dropdown */}
              <div className='mb-4'>
                <label className='block text-gray-700 font-bold mb-2'>
                  Product Name
                </label>
                <select
                  id='product_name'
                  name='product_name'
                  className='border rounded w-full py-2 px-3'
                  required
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                >
                  <option value=''>Select Product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Suppliers dropdown */}
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

              {/* Purchase Remarks */}
              <div className='mb-4'>
                <label
                  htmlFor='remarks'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Remarks
                </label>
                <textarea
                  id='remarks'
                  name='remarks'
                  className='border rounded w-full py-2 px-3'
                  rows='4'
                  placeholder='Write purchase remarks'
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>
              </div>

              <div>
                <button
                  className='bg-teal hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                  type='submit'
                >
                  Update Purchase
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditPurchase;
