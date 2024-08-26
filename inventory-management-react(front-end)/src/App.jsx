import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/products/Inventory';
import Suppliers from './pages/suppliers/Suppliers';
import Categories from './pages/categories/Categories';
import Purchases from './pages/purchases/Purchases';
import CreateNewCategory from './pages/categories/CreateNewCategory';
import AddNewProduct from './pages/products/AddNewProduct';
import CreateNewSupplier from './pages/suppliers/CreateNewSupplier';
import CreateNewPurchase from './pages/purchases/CreateNewPurchase';
import EditProduct from './pages/products/EditProduct';
import EditSupplier from './pages/suppliers/EditSupplier';
import EditCategory from './pages/categories/EditCategory';
import EditPurchase from './pages/purchases/EditPurchase';
import Register from './pages/Authentication/Register';
import Login from './pages/Authentication/Login';
import Users from './pages/Users';
import GuestLayout from './layouts/GuestLayout';
import Profile from './pages/Profile';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import ProtectedRoutes from './utils/ProtectedRoutes';

const App = () => {
  // User Context
  const { user, token } = useContext(AppContext);

  // Category FETCH API Functions
  // Function to POST a new category into the Backend API
  const newCategory = async (category) => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });

    return;
  };
  // Function to PUT/UPDATE a update category into the Backend API
  const updateCategory = async (category) => {
    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });
    } catch (error) {
      console.log('An error occured', error);
    }

    return;
  };
  // Function to DELETE a Category in the Backend API
  const deleteCategory = async (id) => {
    const response = await fetch(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'DELETE',
    });

    return;
  };

  // Product FETCH API Functions
  // Function to POST a new product into the Backend API
  const newProduct = async (product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.log('An error occured', error);
    }

    return;
  };
  // Function to PUT/UPDATE update product into the Backend API
  const updateProduct = async (product) => {
    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      console.log('An error occured', error);
    }

    return;
  };
  // Function to DELETE a Product in the Backend API
  const deleteProduct = async (id) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  };

  // Supplier FETCH API Functions
  // Function to POST a new supplier into the Backend API
  const newSupplier = async (supplier) => {
    const response = await fetch('/api/suppliers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(supplier),
    });

    return;
  };

  // Function to PUT/UPDATE a update supplier into the Backend API
  const updateSupplier = async (supplier) => {
    try {
      const response = await fetch(`/api/suppliers/${supplier.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(supplier),
      });
    } catch (error) {
      console.log('An error occured', error);
    }

    return;
  };
  // Function to DELETE a Supplier in the Backend API
  const deleteSupplier = async (id) => {
    const response = await fetch(`/api/suppliers/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  };

  // Purchase FETCH API Functions
  // Function to POST a new purchase into the Backend API
  const newPurchase = async (purchase) => {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(purchase),
    });

    return;
  };

  // Function to PUT/UPDATE a update Purchase into the Backend API
  const updatePurchase = async (purchase) => {
    try {
      const response = await fetch(`/api/orders/${purchase.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(purchase),
      });
    } catch (error) {
      console.log('An error occured', error);
    }

    return;
  };

  // Function to DELETE a Purchase in the Backend API
  const deletePurchase = async (id) => {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  };

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          {/* MainLayout routes */}
          <Route element={<MainLayout />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route
              path='/inventory/create'
              element={<AddNewProduct addProductSubmit={newProduct} />}
            />
            <Route
              path='/inventory/edit/:id'
              element={
                <EditProduct
                  editProductSubmit={updateProduct}
                  deleteProduct={deleteProduct}
                />
              }
            />
            <Route path='/suppliers' element={<Suppliers />} />

            <Route
              path='/suppliers/create'
              element={<CreateNewSupplier addSupplierSubmit={newSupplier} />}
            />
            <Route
              path='/suppliers/edit/:id'
              element={
                <EditSupplier
                  editSupplierSubmit={updateSupplier}
                  deleteSupplier={deleteSupplier}
                />
              }
            />
            <Route path='/categories' element={<Categories />} />
            <Route
              path='/categories/create'
              element={<CreateNewCategory createCategorySubmit={newCategory} />}
            />
            <Route
              path='/categories/edit/:id'
              element={
                <EditCategory
                  updateCategorySubmit={updateCategory}
                  deleteCategory={deleteCategory}
                />
              }
            />
            <Route path='/purchases' element={<Purchases />} />
            <Route
              path='/purchases/create'
              element={<CreateNewPurchase addPurchaseSubmit={newPurchase} />}
            />
            <Route
              path='/purchases/edit/:id'
              element={
                <EditPurchase
                  updatePurchaseSubmit={updatePurchase}
                  deletePurchase={deletePurchase}
                />
              }
            />
            <Route path='/users' element={<Users />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
