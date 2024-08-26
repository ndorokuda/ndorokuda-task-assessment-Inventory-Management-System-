import { FaDownload } from 'react-icons/fa6';
import Button from '../components/Button';
import { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { useMaterialReactTable } from 'material-react-table';
import autoTable from 'jspdf-autotable';
import Table from '../components/Table';
import Spinner from '../components/Spinner';
import _ from 'lodash';

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetching Users from backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //   Defining table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'first_name',
        header: 'First Name',
        size: 150,
      },
      {
        accessorKey: 'last_name',
        header: 'Last Name',
        size: 150,
      },
      {
        accessorKey: 'email',
        header: 'Email Adress',
        size: 150,
      },
    ],
    []
  );

  // Material Table definition
  const table = useMaterialReactTable({
    columns,
    data: users,
    columnFilterDisplayMode: 'popover',
    enableRowSelection: true,
  });

  //   Function to export to PDF
  const exportToPdf = (rows) => {
    const doc = new jsPDF({ orientation: 'landscape' });
    const tableData = rows.map((row) =>
      columns.map((column) => _.get(row.original, column.accessorKey))
    );
    const tableHeaders = columns.map((column) => column.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    const date = new Date();

    doc.save('Users as of ' + date);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          <div className='flex justify-end'>
            <Button
              text={'Export All to PDF'}
              icon={FaDownload}
              buttonClasses={'bg-darkCharcol  my-4 mx-4 hover:bg-red-700'}
              handleClick={() =>
                exportToPdf(table.getPrePaginationRowModel().rows)
              }
              handleClickSelectedItems={() =>
                exportToPdf(table.getSelectedRowModel().rows)
              }
            />
            <Button
              text={'Export selected to PDF'}
              icon={FaDownload}
              buttonClasses={'bg-warmYellow  my-4 mx-4 hover:bg-red-700'}
              handleClick={() =>
                exportToPdf(table.getPrePaginationRowModel().rows)
              }
              handleClickSelectedItems={() =>
                exportToPdf(table.getSelectedRowModel().rows)
              }
            />
          </div>
          {/* Table Section */}
          <section>
            <Table table={table} />
          </section>
        </div>
      )}
    </>
  );
};

export default Users;
