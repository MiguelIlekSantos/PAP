'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Search, Edit, Trash2, User, Mail, Phone, Calendar, MapPin, Briefcase } from 'lucide-react'
import { EmployeeCard } from '../components/EmployeeCard'
import { Modal } from '../components/Modal'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { Select } from '../components/forms/Select'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { create, getAll, getById, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Employees, Departments, Tasks, Projects } from '@prisma/client'
import { CreateEmployeesDTO, UpdateEmployeesDTO, EmployeesWithDepartment, EmployeesWithAllRelations } from '@pap/utils'

const APIMODULE = "employees"

export default function ResourcesPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [employees, setEmployees] = useState<ListResponse<Employees>>();
  const [departments, setDepartments] = useState<ListResponse<Departments>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employees | null>(null);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState<EmployeesWithAllRelations | null>(null);
  
  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateEmployeesDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateEmployeesDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  
  const [departmentOptions, setDepartmentOptions] = useState<{value: number, label: string}[]>([]);

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);


  const reloadEmployeesList = () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    const params: any = {
      "page": paginationNum,
      "quantity": 8,
    };

    if (debouncedSearchTerm) {
      params.term = debouncedSearchTerm;
    }
    
    if (departmentFilter) {
      params.relationFilter = ["departmentId", parseInt(departmentFilter)];
    } else {
      // Always filter by enterprise if no department filter is applied
      params.relationFilter = ["enterpriseId", enterpriseId];
    }

    getAll<ListResponse<Employees>>(APIMODULE, params)
      .then((data) => {
        // Apply status filter on frontend if necessary
        let filteredData = data;
        if (statusFilter) {
          console.log('Status filter:', statusFilter);
          console.log('Employees before filter:', data.data.items.map(emp => ({ name: emp.name, status: emp.status })));
          
          // Mapping from Portuguese to English values (if needed)
          const statusMapping: Record<string, string> = {
            'Ativo': 'active',
            'Férias': 'vacation',
            'Licença': 'leave',
            'Desligado': 'terminated'
          };
          
          const filteredItems = data.data.items.filter(employee => {
            // Convert Portuguese status to English if needed
            const normalizedStatus = employee.status ? 
              (statusMapping[employee.status] || employee.status.toLowerCase()) : 
              null;
            
            const matches = normalizedStatus === statusFilter;
            console.log(`${employee.name}: status="${employee.status}" -> normalized="${normalizedStatus}" === "${statusFilter}" = ${matches}`);
            return matches;
          });
          
          console.log('Employees after filter:', filteredItems.length);
          
          filteredData = {
            ...data,
            data: {
              ...data.data,
              items: filteredItems,
              total: filteredItems.length // Update total as well
            }
          };
        }
        setEmployees(filteredData);
      })
      .catch(err => {
        console.error('Error loading employees:', err);
        showError('Error loading employees');
      });
  };

  useEffect(() => {
    setLoaded(false);
    reloadEmployeesList();
    setLoaded(true);
  }, [paginationNum, debouncedSearchTerm, statusFilter, departmentFilter]);


  useEffect(() => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    getAll<ListResponse<Departments>>("departments", {
      "page": 1,
      "quantity": 100,
      "relationFilter": ["enterpriseId", enterpriseId]
    })
      .then((data) => {
        setDepartments(data);
        const options = data.data.items.map(dept => ({
          value: dept.id,
          label: dept.name
        }));
        setDepartmentOptions(options);
      })
      .catch(err => {
        console.error('Error loading departments:', err);
      });
  }, [getEnterprise]);

  
  function createEmployee(): Promise<boolean> {
    if (!inputDataCreate.name || !inputDataCreate.departmentId) {
      showError('Name and department are required');
      return Promise.resolve(false);
    }

    // Filtrar apenas campos que têm valor
    const payload: Partial<CreateEmployeesDTO> = {};
    
    Object.entries(inputDataCreate).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        (payload as any)[key] = value;
      }
    });

    console.log('Payload para create:', payload);

    return create<CreateEmployeesDTO, Employees>(APIMODULE, payload as CreateEmployeesDTO)
      .then((data) => {
        console.log('Employee created:', data);
        showSuccess('Funcionário criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadEmployeesList();
        return true;
      })
      .catch(err => {
        console.error('Error creating employee:', err);
        showError('Error creating employee');
        return false;
      });
  }

  function updateEmployee(): Promise<boolean> {
    if (!selectedEmployee) {
      showError('No employee selected');
      return Promise.resolve(false);
    }

    // Filtrar apenas campos que foram realmente alterados e têm valor
    const payload: Partial<UpdateEmployeesDTO> = {};
    
    Object.entries(inputDataUpdate).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        (payload as any)[key] = value;
      }
    });

    console.log('Payload para update:', payload);

    return update<UpdateEmployeesDTO, Employees>(APIMODULE, selectedEmployee.id, payload as UpdateEmployeesDTO)
      .then((data) => {
        console.log('Employee updated:', data);
        showSuccess('Funcionário atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedEmployee(null);
        setInputDataUpdate({});
        
        reloadEmployeesList();
        return true;
      })
      .catch(err => {
        console.error('Error updating employee:', err);
        showError('Error updating employee');
        return false;
      });
  }

  const deleteEmployee = async (id: number) => {
    if (window.confirm('Tem certeza que deseja deletar este funcionário?')) {
      try {
        await remove(APIMODULE, id);
        showSuccess('Funcionário deletado com sucesso!');
        // Recarregar lista com filtros aplicados
        reloadEmployeesList();
      } catch (err) {
        console.error('Error deleting employee:', err);
        showError('Erro ao deletar funcionário');
      }
    }
  };

  const handleEditEmployee = (employee: Employees) => {
    setSelectedEmployee(employee);
    // Só incluir campos que têm valor
    const updateData: Partial<UpdateEmployeesDTO> = {
      name: employee.name,
    };
    
    if (employee.email) updateData.email = employee.email;
    if (employee.phone) updateData.phone = employee.phone;
    if (employee.position) updateData.position = employee.position;
    if (employee.salary) updateData.salary = employee.salary;
    if (employee.dateOfHire) updateData.dateOfHire = employee.dateOfHire;
    if (employee.shiftType) updateData.shiftType = employee.shiftType;
    if (employee.workingHours) updateData.workingHours = employee.workingHours;
    if (employee.workingDays) updateData.workingDays = employee.workingDays;
    if (employee.status) updateData.status = employee.status;
    if (employee.departmentId) updateData.departmentId = employee.departmentId;
    
    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  const handleViewEmployee = async (employee: Employees) => {
    try {
      const employeeDetails = await getById<EmployeesWithAllRelations>(APIMODULE, employee.id);
      setSelectedEmployeeDetails(employeeDetails);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Error loading employee details:', err);
      showError('Erro ao carregar detalhes do funcionário');
    }
  };

  const applyFilters = () => {
    setPaginationNum(1); // Reset para primeira página
    reloadEmployeesList();
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setDepartmentFilter('');
    setPaginationNum(1);
    // Recarregar sem filtros
    setTimeout(() => {
      reloadEmployeesList();
    }, 100);
  };


  const getDepartmentName = (departmentId: number): string => {
    const department = departmentOptions.find(dept => dept.value === departmentId);
    return department?.label || 'Department not found';
  };

  const formatDate = (date: Date | string | null): string => {
    if (!date) return 'Not informed';
    return new Date(date).toLocaleDateString('en-US');
  };

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'vacation', label: 'Vacation' },
    { value: 'leave', label: 'Leave' },
    { value: 'terminated', label: 'Terminated' },
  ];

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white">
            👥 Human Resources
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add Employee</span>
          </button>
        </div>

        {/* Filters and search */}
        <div className="mb-6 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees by name, email or position..."
              className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
            >
              <option value="">All statuses</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 outline-none transition-all duration-200"
            >
              <option value="">All departments</option>
              {departmentOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Employee list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loaded && employees?.data.items.map((employee) => {
            const departmentName = getDepartmentName(employee.departmentId);
            
            // Adapt data for existing EmployeeCard
            const adaptedEmployee = {
              id: employee.id.toString(),
              name: employee.name,
              position: employee.position || 'Not informed',
              department: departmentName,
              email: employee.email || 'Não informado',
              phone: employee.phone || 'Não informado',
              joinDate: formatDate(employee.dateOfHire),
              schedule: employee.shiftType || 'Não informado',
              status: (employee.status as 'active' | 'vacation' | 'leave' | 'terminated') || 'active',
            };

            return (
              <div key={employee.id} className="relative">
                <EmployeeCard
                  employee={adaptedEmployee}
                  onClick={() => handleViewEmployee(employee)}
                />
                
                {/* Botões de ação */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditEmployee(employee);
                    }}
                    className="bg-blue-600 hover:bg-blue-500 text-white p-1 rounded-full transition-all duration-200"
                    title="Editar funcionário"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEmployee(employee.id);
                    }}
                    className="bg-red-600 hover:bg-red-500 text-white p-1 rounded-full transition-all duration-200"
                    title="Deletar funcionário"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          
          {loaded && employees?.data.items.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum funcionário encontrado.
            </div>
          )}
        </div>

        {/* Paginação */}
        {loaded && employees && (
          <div className="mt-10">
            <Pagination 
              updatePage={setPaginationNum} 
              actualPage={paginationNum} 
              last={employees.data.metadata.last ?? 1} 
            />
          </div>
        )}
      </div>

      {/* Modal to add employee */}
      {showAddModal && (
        <ModalForms create={createEmployee} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <p className='text-2xl p-5 lg:p-10'>Add new employee</p>
          
          <Fieldset title='Employee Information'>
            <Input nameOnDB='name' name='Full name' />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Phone' type='tel' />
            <Input nameOnDB='position' name='Position' />
            <Input nameOnDB='salary' name='Salary' type='number' />
            <Input nameOnDB='dateOfHire' name='Hire date' type='date' />
            <Input nameOnDB='shiftType' name='Shift type' />
            <Input nameOnDB='workingHours' name='Working hours' type='number' />
            <Input nameOnDB='workingDays' name='Working days' type='number' />
            <Select 
              nameOnDB='status' 
              name='Status' 
              options={statusOptions}
            />
            <Select 
              nameOnDB='departmentId' 
              name='Department' 
              options={departmentOptions}
              required={true}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal to edit employee */}
      {showEditModal && selectedEmployee && (
        <ModalForms 
          create={updateEmployee} 
          setInputData={setInputDataUpdate} 
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <p className='text-2xl p-5 lg:p-10'>Edit employee: {selectedEmployee.name}</p>
          
          <Fieldset title='Employee Information'>
            <Input nameOnDB='name' name='Full name' />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Phone' type='tel' />
            <Input nameOnDB='position' name='Position' />
            <Input nameOnDB='salary' name='Salary' type='number' />
            <Input nameOnDB='dateOfHire' name='Hire date' type='date' />
            <Input nameOnDB='shiftType' name='Shift type' />
            <Input nameOnDB='workingHours' name='Working hours' type='number' />
            <Input nameOnDB='workingDays' name='Working days' type='number' />
            <Select 
              nameOnDB='status' 
              name='Status' 
              options={statusOptions}
            />
            <Select 
              nameOnDB='departmentId' 
              name='Department' 
              options={departmentOptions}
              required={true}
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes do funcionário */}
      {showDetailsModal && selectedEmployeeDetails && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Funcionário
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.email || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.phone || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Briefcase className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cargo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.position || 'Não informado'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data de Contratação</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedEmployeeDetails.dateOfHire)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Departamento</p>
                    <p className="font-medium text-gray-900 dark:text-white">{getDepartmentName(selectedEmployeeDetails.departmentId)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Salário</p>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedEmployeeDetails.salary ? `€${selectedEmployeeDetails.salary.toLocaleString()}` : 'Não informado'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.status || 'Não informado'}</p>
                </div>
              </div>
            </div>
            
            {/* Informações adicionais */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informações Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tipo de Turno</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.shiftType || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Horas de Trabalho</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.workingHours || 'Não informado'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dias de Trabalho</p>
                  <p className="font-medium text-gray-900 dark:text-white">{selectedEmployeeDetails.workingDays || 'Não informado'}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}