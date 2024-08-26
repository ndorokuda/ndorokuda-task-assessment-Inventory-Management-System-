import Header from '../../components/Header';
import { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { useMaterialReactTable } from 'material-react-table';
import autoTable from 'jspdf-autotable';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Suppliers = () => {
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching suppliers from backend API
    const fetchSuppliers = async () => {
      try {
        const response = await fetch('/api/suppliers');
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
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
        accessorKey: 'name',
        header: 'Supplier Name',
        size: 150,
      },
      {
        accessorKey: 'email_address',
        header: 'Email Adress',
        size: 150,
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
        size: 100,
      },
    ],
    []
  );

  // Material Table definition
  const table = useMaterialReactTable({
    columns,
    data: suppliers,
    columnFilterDisplayMode: 'popover',
    enableRowSelection: true,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        return navigate(`/suppliers/edit/${row.original.id}`);
      },
      sx: {
        cursor: 'pointer',
      },
    }),
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

    doc.save('Suppliers as of ' + date);
  };

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div>
          {/* Header with Action buttons */}
          <Header
            handleClick={() =>
              exportToPdf(table.getPrePaginationRowModel().rows)
            }
            handleClickSelectedItems={() =>
              exportToPdf(table.getSelectedRowModel().rows)
            }
            buttonText={'Add new Supplier'}
            linkTo={'/suppliers/create'}
          />
          {/* Table Section */}
          <section>
            <Table table={table} />
          </section>
        </div>
      )}
    </>
  );
};

export default Suppliers;
