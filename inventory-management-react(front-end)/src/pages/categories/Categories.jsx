import Header from '../../components/Header';
import { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import { useMaterialReactTable } from 'material-react-table';
import autoTable from 'jspdf-autotable';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching categories from backend API
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log('An Error occured:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
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
        header: 'Category Name',
        size: 50,
      },
      {
        accessorKey: 'description',
        header: 'Description',
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
    data: categories,
    columnFilterDisplayMode: 'popover',
    enableRowSelection: true,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        return navigate(`/categories/edit/${row.original.id}`);
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

    doc.save('Categories as of ' + date);
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
            buttonText={'Add new Category'}
            linkTo={'/categories/create'}
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

export default Categories;
