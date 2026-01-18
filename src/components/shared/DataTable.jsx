import React, { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';
import SearchInput from './SearchInput';

const DataTable = ({ 
  data, 
  columns, 
  searchable = false, 
  sortable = false, 
  pagination = false, 
  itemsPerPage = 10,
  onRowClick,
  className = ''
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchable || !searchTerm) return data;
    
    return data.filter(row => 
      columns.some(column => {
        const value = row[column.key];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, columns, searchTerm]);

  // Sort data based on sort config
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig.key) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const displayedData = pagination ? paginatedData : sortedData;
  const totalPages = pagination ? Math.ceil(sortedData.length / itemsPerPage) : 0;

  const requestSort = (key) => {
    if (!sortable) return;
    
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (newPage) => {
    if (pagination) {
      setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
    }
  };

  const SortableHeader = ({ column }) => {
    const isSorted = sortConfig.key === column.key;
    const icon = isSorted ? (
      sortConfig.direction === "ascending" ? (
        <ArrowUp size={14} />
      ) : (
        <ArrowDown size={14} />
      )
    ) : null;
    
    return (
      <th
        className={`py-3 px-4 font-semibold cursor-pointer ${column.headerClassName || ''}`}
        onClick={() => requestSort(column.key)}
      >
        <div className="flex items-center space-x-1">
          {column.label} {icon}
        </div>
      </th>
    );
  };

  return (
    <div className={className}>
      {/* Search Bar */}
      {searchable && (
        <div className="mb-4">
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search..."
            className="w-64"
          />
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b-2 dark:border-gray-700">
            <tr className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {columns.map((column, index) => 
                sortable && column.sortable !== false ? (
                  <SortableHeader key={index} column={column} />
                ) : (
                  <th 
                    key={index} 
                    className={`py-3 px-4 font-semibold ${column.headerClassName || ''}`}
                  >
                    {column.label}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`py-3 px-4 ${column.cellClassName || ''}`}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Page {currentPage} of {totalPages} ({sortedData.length} total records)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;