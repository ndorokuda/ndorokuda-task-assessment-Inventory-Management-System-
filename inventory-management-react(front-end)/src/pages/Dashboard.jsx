import React from 'react';
import Cards from '../components/Cards';
import { useEffect, useState, useMemo } from 'react';
import { useMaterialReactTable } from 'material-react-table';
import Table from '../components/Table';
import Spinner from '../components/Spinner';
import _ from 'lodash';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  // User Context
  const { user, token } = useContext(AppContext);

  useEffect(() => {
    // Fetching Purchases from backend API
    const fetchPurchases = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setPurchases(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  // Defining Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'product.name',
        header: 'Product',
        size: 150,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 50,
      },
      {
        accessorKey: 'remarks',
        header: 'Remarks',
        size: 150,
      },
      {
        accessorKey: 'user.first_name',
        header: 'Created by',
        size: 150,
      },
      {
        accessorKey: 'created_at',
        header: 'Created on',
        size: 100,
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated on',
        size: 100,
      },
    ],
    []
  );

  // Material Table definition
  const table = useMaterialReactTable({
    columns,
    data: purchases,
    columnFilterDisplayMode: 'popover',
    enableRowSelection: true,
  });
  return (
    <>
      <Cards />
      <div>
        <h2 className='text-2xl font-bold p-3'>Recent Purchases</h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div>
            {/* Table Section */}
            <section>
              <Table table={table} />
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
