import React, { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';

type TableColumn = {
  header: string;
  accessor: string;
  cell?: (value: any, row: any) => React.ReactNode;
};

type TableAction = {
  icon: React.ReactNode;
  label: string;
  onClick: (row: any) => void;
  className?: string;
};

type DataTableProps = {
  columns: TableColumn[];
  data: any[];
  onRowClick?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onBulkDelete?: (selectedIds: any[]) => void;
  actions?: TableAction[];
  className?: string;
  selectable?: boolean;
  idField?: string;
};

export const DataTable = ({ 
  columns, 
  data, 
  onRowClick, 
  onEdit,
  onDelete,
  onBulkDelete,
  actions = [],
  className = '',
  selectable = true,
  idField = 'id'
}: DataTableProps) => {
  const [selectedRows, setSelectedRows] = useState<Set<any>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows(new Set());
      setSelectAll(false);
    } else {
      const allIds = data.map(row => row[idField]);
      setSelectedRows(new Set(allIds));
      setSelectAll(true);
    }
  };

  const handleSelectRow = (id: any) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(id)) {
      newSelectedRows.delete(id);
    } else {
      newSelectedRows.add(id);
    }
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.size === data.length);
  };

  const handleBulkDelete = () => {
    if (selectedRows.size > 0 && onBulkDelete) {
      const selectedIds = Array.from(selectedRows);
      if (window.confirm(`Tem certeza que deseja deletar ${selectedRows.size} item(s) selecionado(s)?`)) {
        onBulkDelete(selectedIds);
        setSelectedRows(new Set());
        setSelectAll(false);
      }
    }
  };

  const defaultActions: TableAction[] = [
    ...(onEdit ? [{
      icon: <Edit size={16} />,
      label: 'Editar',
      onClick: onEdit,
      className: 'text-blue-400 hover:text-blue-300'
    }] : []),
    ...(onDelete ? [{
      icon: <Trash2 size={16} />,
      label: 'Deletar',
      onClick: onDelete,
      className: 'text-red-400 hover:text-red-300'
    }] : [])
  ];

  const allActions = [...defaultActions, ...actions];

  return (
    <div className="overflow-x-auto w-full">
      {/* Bulk actions bar */}
      {selectable && selectedRows.size > 0 && (
        <div className="bg-violet-900/20 border border-violet-500/30 rounded-t-lg px-4 py-3 flex items-center justify-between">
          <span className="text-violet-300 text-sm">
            {selectedRows.size} item(s) selecionado(s)
          </span>
          <div className="flex gap-2">
            {onBulkDelete && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
              >
                <Trash2 size={14} />
                Deletar Selecionados
              </button>
            )}
            <button
              onClick={() => {
                setSelectedRows(new Set());
                setSelectAll(false);
              }}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
            >
              <X size={14} />
              Cancelar
            </button>
          </div>
        </div>
      )}

      <table className={`w-full text-sm text-left text-white ${className}`}>
        <thead className="text-xs text-violet-400 uppercase bg-[#0d1218] border-b border-gray-800">
          <tr>
            {selectable && (
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500 focus:ring-2"
                />
              </th>
            )}
            {columns.map((column, index) => (
              <th key={index} className="px-4 py-3">
                {column.header}
              </th>
            ))}
            {allActions.length > 0 && (
              <th className="px-4 py-3 text-center">Ações</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              className={`bg-[#11161d] border-b border-gray-800 hover:bg-[#161f2c] transition-colors duration-200 ${
                selectedRows.has(row[idField]) ? 'bg-violet-900/20' : ''
              }`}
            >
              {selectable && (
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row[idField])}
                    onChange={() => handleSelectRow(row[idField])}
                    className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500 focus:ring-2"
                  />
                </td>
              )}
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex} 
                  className={`px-4 py-3 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {column.cell 
                    ? column.cell(row[column.accessor], row) 
                    : row[column.accessor]}
                </td>
              ))}
              {allActions.length > 0 && (
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    {allActions.map((action, actionIndex) => (
                      <button
                        key={actionIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          action.onClick(row);
                        }}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors duration-200 ${action.className || 'text-gray-400 hover:text-white'}`}
                        title={action.label}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              )}
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