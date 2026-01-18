import React from 'react';
import Card from '../shared/Card';
import DataTable from '../shared/DataTable';

const DashboardTable = ({ 
  title, 
  subtitle, 
  actions, 
  data, 
  columns, 
  searchable = false, 
  sortable = false, 
  pagination = false, 
  itemsPerPage = 10,
  currentPage = 1,
  totalPages = 1,
  totalRecords = 0,
  onPageChange,
  onRowClick,
  className = '',
  children,
  ...props 
}) => {
  return (
    <Card 
      title={title}
      subtitle={subtitle}
      actions={actions}
      className={className}
      {...props}
    >
      {children}
      <DataTable
        data={data}
        columns={columns}
        searchable={searchable}
        sortable={sortable}
        pagination={pagination}
        itemsPerPage={itemsPerPage}
        onRowClick={onRowClick}
      />
      
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between pt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            Page {currentPage} of {totalPages} ({totalRecords} total records)
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-md bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DashboardTable;