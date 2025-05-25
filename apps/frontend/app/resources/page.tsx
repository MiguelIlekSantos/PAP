'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { FilterPanel } from '../components/FilterPanel'
import { EmployeeCard } from '../components/EmployeeCard'
import { Modal } from '../components/Modal'
import { Plus, Search } from 'lucide-react'

// Mock data for employees
const mockEmployees = [
  {
    id: '1',
    name: 'João Silva',
    position: 'Desenvolvedor Full Stack',
    department: 'Tecnologia',
    email: 'joao.silva@techwave.pt',
    phone: '+351 912 345 678',
    joinDate: '15/03/2020',
    schedule: 'Segunda a Sexta, 9h-18h',
    status: 'active' as const,
    location: 'Lisboa',
  },
  {
    id: '2',
    name: 'Maria Santos',
    position: 'Gerente de Recursos Humanos',
    department: 'Recursos Humanos',
    email: 'maria.santos@techwave.pt',
    phone: '+351 923 456 789',
    joinDate: '10/01/2018',
    schedule: 'Segunda a Sexta, 9h-18h',
    status: 'active' as const,
    location: 'Porto',
  },
  {
    id: '3',
    name: 'António Ferreira',
    position: 'Analista Financeiro',
    department: 'Financeiro',
    email: 'antonio.ferreira@techwave.pt',
    phone: '+351 934 567 890',
    joinDate: '05/06/2019',
    schedule: 'Segunda a Sexta, 9h-18h',
    status: 'vacation' as const,
    location: 'Lisboa',
  },
  {
    id: '4',
    name: 'Ana Oliveira',
    position: 'Designer UX/UI',
    department: 'Design',
    email: 'ana.oliveira@techwave.pt',
    phone: '+351 945 678 901',
    joinDate: '20/09/2021',
    schedule: 'Segunda a Sexta, 10h-19h',
    status: 'active' as const,
    location: 'Braga',
  },
  {
    id: '5',
    name: 'Carlos Rodrigues',
    position: 'Gestor de Vendas',
    department: 'Vendas',
    email: 'carlos.rodrigues@techwave.pt',
    phone: '+351 956 789 012',
    joinDate: '12/04/2017',
    schedule: 'Segunda a Sexta, 9h-18h',
    status: 'leave' as const,
    location: 'Faro',
  },
  {
    id: '6',
    name: 'Sofia Costa',
    position: 'Contabilista',
    department: 'Financeiro',
    email: 'sofia.costa@techwave.pt',
    phone: '+351 967 890 123',
    joinDate: '03/11/2020',
    schedule: 'Segunda a Sexta, 9h-18h',
    status: 'active' as const,
    location: 'Lisboa',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'name',
    label: 'Nome',
    type: 'text' as const,
  },
  {
    name: 'department',
    label: 'Departamento',
    type: 'select' as const,
    options: [
      { label: 'Tecnologia', value: 'Tecnologia' },
      { label: 'Recursos Humanos', value: 'Recursos Humanos' },
      { label: 'Financeiro', value: 'Financeiro' },
      { label: 'Design', value: 'Design' },
      { label: 'Vendas', value: 'Vendas' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Férias', value: 'vacation' },
      { label: 'Licença', value: 'leave' },
      { label: 'Desligado', value: 'terminated' },
    ],
  },
  {
    name: 'location',
    label: 'Localização',
    type: 'select' as const,
    options: [
      { label: 'Lisboa', value: 'Lisboa' },
      { label: 'Porto', value: 'Porto' },
      { label: 'Braga', value: 'Braga' },
      { label: 'Faro', value: 'Faro' },
    ],
  },
];

export default function ResourcesPage() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [filteredEmployees, setFilteredEmployees] = useState(mockEmployees);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...employees];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (emp) =>
          emp.name.toLowerCase().includes(term) ||
          emp.position.toLowerCase().includes(term) ||
          emp.department.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((emp) => {
          if (typeof emp[key as keyof typeof emp] === 'string') {
            return (emp[key as keyof typeof emp] as string).toLowerCase() === value.toLowerCase();
          }
          return emp[key as keyof typeof emp] === value;
        });
      }
    });

    setFilteredEmployees(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredEmployees(employees);
  };

  // Handle employee click
  const handleEmployeeClick = (employee: any) => {
    setSelectedEmployee(employee);
    setShowEmployeeModal(true);
  };

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Recursos Humanos</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Funcionário
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar funcionários..."
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
          />
        </div>

        {/* Filters */}
        <FilterPanel
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onApply={applyFilters}
          onReset={resetFilters}
        />

        {/* Employee cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onClick={() => handleEmployeeClick(employee)}
            />
          ))}
          {filteredEmployees.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum funcionário encontrado com os filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Funcionário</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário de cadastro de funcionário</p>
          </div>
        </Modal>
      )}

      {/* Employee Details Modal */}
      {showEmployeeModal && selectedEmployee && (
        <Modal onclick={() => setShowEmployeeModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedEmployee.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Pessoais</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Cargo:</span> {selectedEmployee.position}</p>
                  <p><span className="text-gray-400">Departamento:</span> {selectedEmployee.department}</p>
                  <p><span className="text-gray-400">Email:</span> {selectedEmployee.email}</p>
                  <p><span className="text-gray-400">Telefone:</span> {selectedEmployee.phone}</p>
                  <p><span className="text-gray-400">Localização:</span> {selectedEmployee.location}</p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Profissionais</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Data de Admissão:</span> {selectedEmployee.joinDate}</p>
                  <p><span className="text-gray-400">Horário:</span> {selectedEmployee.schedule}</p>
                  <p><span className="text-gray-400">Status:</span> {
                    selectedEmployee.status === 'active' ? 'Ativo' :
                    selectedEmployee.status === 'vacation' ? 'Férias' :
                    selectedEmployee.status === 'leave' ? 'Licença' : 'Desligado'
                  }</p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Histórico de Férias e Folgas</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Histórico de férias e folgas do funcionário</p>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Registros de Ponto</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Histórico de registros de ponto do funcionário</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}