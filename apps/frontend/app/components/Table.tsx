import React from 'react';

type TableColumn = {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
};

type TableProps = {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  className?: string;
};

export const Table = ({ columns, data, onRowClick, className = '' }: TableProps) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className={`w-full text-sm text-left text-white ${className}`}>
        <thead className="text-xs text-violet-400 uppercase bg-[#0d1218] border-b border-gray-800">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className="bg-[#11161d] border-b border-gray-800 hover:bg-[#161f2c] transition-colors duration-200 cursor-pointer"
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  {column.cell 
                    ? column.cell(row[column.accessor], row) 
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="w-full py-10 text-center text-gray-500">
          Nenhum dado encontrado
        </div>
      )}
    </div>
  );
};