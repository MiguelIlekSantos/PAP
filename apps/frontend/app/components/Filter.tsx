import React from 'react';
import { Search } from 'lucide-react';

type FilterOption = {
  value: string | number;
  label: string;
};

type FilterField = {
  name: string;
  label: string;
  type: 'select';
  options: FilterOption[];
};

type FilterProps = {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  fields: FilterField[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onReset: () => void;
};

export const Filter = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Pesquisar...",
  fields,
  values,
  onChange,
  onReset
}: FilterProps) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Search bar - opcional */}
      {searchTerm !== undefined && onSearchChange && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
          />
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        {fields.map((field) => (
          <select
            key={field.name}
            value={values[field.name] || ''}
            onChange={(e) => onChange(field.name, e.target.value)}
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
          >
            <option value="">{field.label}</option>
            {field.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ))}

        <button
          onClick={onReset}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-200"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};