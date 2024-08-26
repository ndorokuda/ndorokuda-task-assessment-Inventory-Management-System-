import Header from '../../components/Header';
import { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { useMaterialReactTable } from 'material-react-table';
import autoTable from 'jspdf-autotable';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Purchases = () => {
  const [loading, setLoading] = useState(true);
  const [purchases, setPurchases] = useState([]);
  const navigate = useNavigate();

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
        header: 'Qauntity',
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
        header: 'Created at',
        size: 100,
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated at',
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
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        return navigate(`/purchases/edit/${row.original.id}`);
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

    doc.save('Purchases as of ' + date);
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
            buttonText={'Create a new order'}
            linkTo={'/purchases/create'}
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

export default Purchases;
