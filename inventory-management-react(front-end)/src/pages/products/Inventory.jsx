import Header from '../../components/Header';
import { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { useMaterialReactTable } from 'material-react-table';
import autoTable from 'jspdf-autotable';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 50,
      },
      {
        accessorKey: 'name',
        header: 'Product Name',
        size: 150,
      },

      {
        accessorKey: 'unit_price',
        header: 'Unit Price ($)',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: 'Description',
        size: 200,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        size: 100,
      },
      {
        accessorKey: 'supplier.name',
        header: 'Supplier',
        size: 100,
      },
      {
        accessorKey: 'category.name',
        header: 'Category',
        size: 100,
      },
      {
        accessorKey: 'user.first_name',
        header: 'Created by',
        size: 100,
      },
      {
        accessorKey: 'created_at',
        header: 'Created at',
        size: 150,
      },
      {
        accessorKey: 'updated_at',
        header: 'Updated at',
        size: 150,
      },
    ],
    []
  );
  // Material Table definition
  const table = useMaterialReactTable({
    columns,
    data: products,
    columnFilterDisplayMode: 'popover',
    enableRowSelection: true,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        return navigate(`/inventory/edit/${row.original.id}`);
      },
      sx: {
        cursor: 'pointer',
      },
    }),
  });

  const func = (rows) => {
    console.log(rows.map((row) => Object.values(row.original)));
  };

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

    doc.save('Inventory as of ' + date);
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
            buttonText={'Add new product'}
            linkTo={'/inventory/create'}
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

export default Inventory;
