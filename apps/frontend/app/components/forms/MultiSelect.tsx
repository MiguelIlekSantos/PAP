import React, { useState, useEffect, useRef } from 'react';
import { X, Check, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  nameOnDB: string;
  name: string;
  options: Option[];
  selectedValues?: string[];
  onChange?: (name: string, values: string[] | number[]) => void;
  changeData?: (key: string, value: any) => void;
  initialData?: any;
  type?: 'string' | 'number';
}

export const MultiSelect: React.FC<MultiSelectProps> = ({ nameOnDB, name, options, selectedValues = [], onChange, changeData, initialData, type = 'string'}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Log para depuração
  console.log(`MultiSelect (${nameOnDB}) - Montando componente:`, { 
    initialData, 
    selectedValues,
    hasInitialData: !!initialData,
    hasNameOnDB: initialData && initialData[nameOnDB] ? true : false
  });

  // Filtrar opções com base no termo de busca
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Inicializar com dados iniciais se disponíveis
  useEffect(() => {
    if (initialData && initialData[nameOnDB]) {
      const values = initialData[nameOnDB];
      
      // Garantir que values seja tratado como array
      const valuesArray = Array.isArray(values) ? values : [];
      
      // Converter para string para exibição no componente
      const stringValues = valuesArray.map(v => v.toString());
      
      console.log('MultiSelect - initializing from initialData:', { 
        nameOnDB, 
        initialValues: values, 
        stringValues 
      });
      
      // Atualizar o estado local
      setSelected(stringValues);
    }
  }, [initialData, nameOnDB]);

  // Alternar a seleção de uma opção
  const toggleOption = (value: string) => {
    // Verificar se o valor já está selecionado
    const isSelected = selected.includes(value);
    
    // Criar nova lista de selecionados
    const newSelected = isSelected
      ? selected.filter(v => v !== value)
      : [...selected, value];
    
    // Atualizar o estado local
    setSelected(newSelected);
    
    // Converter para número se o tipo for 'number'
    const convertedValues = type === 'number'
      ? newSelected.map(v => Number(v))
      : newSelected;
    
    console.log('MultiSelect - toggleOption:', { 
      nameOnDB, 
      value, 
      isSelected, 
      newSelected, 
      convertedValues 
    });
    
    // Usar changeData se disponível (para ModalForms)
    if (changeData) {
      // Importante: Garantir que o valor seja um array de números para o campo 'products'
      if (nameOnDB === 'Products' && type === 'number') {
        changeData(nameOnDB, newSelected.map(v => Number(v)));
      } else {
        changeData(nameOnDB, convertedValues);
      }
    }
    
    // Usar onChange se disponível (para uso direto do componente)
    if (onChange) {
      onChange(nameOnDB, convertedValues);
    }
  };

  // Remover uma opção selecionada
  const removeOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleOption(value);
  };

  // Limpar todas as seleções
  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected([]);
    
    // Determinar o valor vazio correto com base no tipo
    const emptyValue: any = [];
    
    console.log('MultiSelect - clearAll:', { 
      nameOnDB, 
      emptyValue 
    });
    
    // Usar changeData se disponível (para ModalForms)
    if (changeData) {
      // Importante: Garantir que o valor seja um array vazio para o campo 'products'
      changeData(nameOnDB, emptyValue);
    }
    
    // Usar onChange se disponível (para uso direto do componente)
    if (onChange) {
      onChange(nameOnDB, emptyValue);
    }
  };

  // Obter o rótulo de uma opção pelo valor
  const getLabelByValue = (value: string) => {
    const option = options.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  // Manipulador de clique para opções
  const handleOptionClick = (e: React.MouseEvent, option: Option) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('Clicou na opção:', option.value, option.label);
    toggleOption(option.value);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {name}
      </label>
      
      <div className="relative" ref={dropdownRef}>
        {/* Campo de seleção */}
        <div
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 cursor-pointer flex flex-wrap items-center min-h-[42px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-400">Selecione opções...</span>
          ) : (
            <>
              <div className="flex flex-wrap gap-1 flex-1">
                {selected.map(value => (
                  <span
                    key={value}
                    className="bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 text-xs rounded-full px-2 py-1 flex items-center gap-1 m-0.5"
                  >
                    {getLabelByValue(value)}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-violet-600 dark:hover:text-violet-400"
                      onClick={(e) => removeOption(value, e)}
                    />
                  </span>
                ))}
              </div>
              {selected.length > 0 && (
                <X
                  size={16}
                  className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 cursor-pointer ml-1"
                  onClick={clearAll}
                />
              )}
            </>
          )}
          
          {isOpen ? (
            <ChevronUp size={18} className="text-gray-400 ml-auto" />
          ) : (
            <ChevronDown size={18} className="text-gray-400 ml-auto" />
          )}
        </div>
        
        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            {/* Campo de busca */}
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
              <div className="relative">
                <Search size={16} className="absolute left-2 top-2.5 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-violet-500"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            {/* Lista de opções */}
            <div>
              {filteredOptions.length === 0 ? (
                <div className="p-2 text-center text-gray-500 dark:text-gray-400">
                  Nenhuma opção encontrada
                </div>
              ) : (
                filteredOptions.map(option => (
                  <div
                    key={option.value}
                    className={`px-3 py-2 cursor-pointer flex items-center ${
                      selected.includes(option.value)
                        ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                    }`}
                    onClick={(e) => handleOptionClick(e, option)}
                  >
                    <div className={`w-5 h-5 border rounded-sm flex items-center justify-center mr-2 ${
                      selected.includes(option.value)
                        ? 'bg-violet-600 border-violet-600 dark:bg-violet-700 dark:border-violet-700'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selected.includes(option.value) && (
                        <Check size={14} className="text-white" />
                      )}
                    </div>
                    {option.label}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};