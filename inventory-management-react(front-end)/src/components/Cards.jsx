import { FaWarehouse } from 'react-icons/fa';
import { FaLayerGroup } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaTruckFast } from 'react-icons/fa6';
import Card from './Card';
import { useEffect, useState } from 'react';

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Fetching inventory from backend API
    const fetchInventory = async () => {
      try {
        const response = await fetch('api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    // Fetching Categories from backend API
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    // Fetching suppliers from backend API
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    // Fetching Users from backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      }
    };
    fetchUsers();
    fetchSuppliers();
    fetchCategories();
    fetchInventory();
  }, []);
  return (
    <>
      <section className='grid grid-cols-4 gap-5 py-10 px-7'>
        <Card
          name={'Items in stock'}
          value={products.length}
          icon={FaWarehouse}
        />
        <Card
          name={'Categories'}
          value={categories.length}
          icon={FaLayerGroup}
        />
        <Card name={'Suppliers'} value={suppliers.length} icon={FaTruckFast} />
        <Card name={'Users'} value={users.length} icon={FaUsers} />
      </section>
    </>
  );
};

export default Cards;
