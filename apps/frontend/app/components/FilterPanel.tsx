import React from 'react';

type FilterOption = {
  label: string;
  value: string;
};

type FilterField = {
  name: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'checkbox';
  options?: FilterOption[];
};

type FilterPanelProps = {
  fields: FilterField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onApply: () => void;
  onReset: () => void;
};

export const FilterPanel = ({ fields, values, onChange, onApply, onReset }: FilterPanelProps) => {
  return (
    <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4 mb-6 shadow-md">
      <h3 className="text-violet-400 font-medium mb-4">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="text-xs text-gray-400 mb-1">{field.label}</label>
            
            {field.type === 'text' && (
              <input
                type="text"
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            )}
            
            {field.type === 'select' && (
              <select
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="">Todos</option>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            
            {field.type === 'date' && (
              <input
                type="date"
                value={values[field.name] || ''}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            )}
            
            {field.type === 'checkbox' && (
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={values[field.name] || false}
                  onChange={(e) => onChange(field.name, e.target.checked)}
                  className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500"
                />
                <label className="ml-2 text-sm text-gray-300">Ativo</label>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end gap-2">
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
        >
          Limpar
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 bg-violet-700 hover:bg-violet-600 text-white rounded-md transition-colors duration-200"
        >
          Aplicar
        </button>
      </div>
    </div>
  );
};