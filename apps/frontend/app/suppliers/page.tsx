'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Truck, Building, Phone, Mail, MapPin, Package, User, CheckCircle, AlertTriangle } from 'lucide-react'
import { Filter } from '../components/Filter'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { Modal } from '../components/Modal'
import { create, getAll, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { SupplierCard } from '../components/SupplierCard'
import { Suppliers } from '@prisma/client'
import { CreateSuppliersDTO, UpdateSuppliersDTO } from '@pap/utils'

const APIMODULE = "suppliers"

// Interface para estender o tipo Suppliers com propriedades adicionais para a UI
interface SupplierWithUI extends Suppliers {
  totalPurchases?: number;
  lastPurchase?: string;
}

export default function SuppliersPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<ListResponse<SupplierWithUI>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierWithUI | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateSuppliersDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateSuppliersDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  // Debounce para o termo de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Formatação de moeda
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Função para carregar a lista de fornecedores
  const reloadSuppliersList = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 8,
        "relationFilter": ["enterpriseId", enterpriseId]
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<SupplierWithUI>>(APIMODULE, params);
      
      // Enriquecer os dados com informações adicionais para UI
      const enhancedItems = data.data.items.map(supplier => {
        // Aqui podemos adicionar lógica para calcular totalPurchases e lastPurchase
        // quando tivermos acesso a esses dados do backend
        return {
          ...supplier,
          totalPurchases: 0, // Valor padrão até termos dados reais
          lastPurchase: undefined
        };
      });
      
      const enhancedData = {
        ...data,
        data: {
          ...data.data,
          items: enhancedItems
        }
      };

      setSuppliers(enhancedData);
    } catch (err) {
      console.error('Erro ao carregar fornecedores:', err);
      showError('Erro ao carregar fornecedores');
    }
  };

  // Carregar fornecedores quando a página carrega ou quando os filtros mudam
  useEffect(() => {
    setLoaded(false);
    reloadSuppliersList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm]);

  // Função para criar um novo fornecedor
  function createSupplier(): Promise<boolean> {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) {
      showError('Empresa não selecionada');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.name) {
      showError('Nome é obrigatório');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateSuppliersDTO> = {
      ...inputDataCreate,
      enterpriseId: enterpriseId
    };

    console.log('Payload para criar fornecedor:', payload);

    return create<CreateSuppliersDTO, Suppliers>(APIMODULE, payload as CreateSuppliersDTO)
      .then((data) => {
        console.log('Fornecedor criado:', data);
        showSuccess('Fornecedor criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadSuppliersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar fornecedor:', err);
        showError('Erro ao criar fornecedor');
        return false;
      });
  }

  // Função para atualizar um fornecedor existente
  function updateSupplier(): Promise<boolean> {
    if (!selectedSupplier) {
      showError('Nenhum fornecedor selecionado');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateSuppliersDTO> = { ...inputDataUpdate };
    
    console.log('Payload para atualizar fornecedor:', payload);

    return update<UpdateSuppliersDTO, Suppliers>(APIMODULE, selectedSupplier.id, payload as UpdateSuppliersDTO)
      .then((data) => {
        console.log('Fornecedor atualizado:', data);
        showSuccess('Fornecedor atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedSupplier(null);
        setInputDataUpdate({});
        reloadSuppliersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar fornecedor:', err);
        showError('Erro ao atualizar fornecedor');
        return false;
      });
  }

  // Função para deletar um fornecedor
  const deleteSupplier = async (supplier: SupplierWithUI) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      try {
        await remove(APIMODULE, supplier.id);
        showSuccess('Fornecedor excluído com sucesso!');
        reloadSuppliersList();
      } catch (err) {
        console.error('Erro ao excluir fornecedor:', err);
        showError('Erro ao excluir fornecedor');
      }
    }
  };

  // Função para editar um fornecedor
  const handleEditSupplier = (supplier: SupplierWithUI) => {
    setSelectedSupplier(supplier);
    
    const updateData: Partial<UpdateSuppliersDTO> = {
      name: supplier.name,
      email: supplier.email ?? undefined,
      phone: supplier.phone ?? undefined,
      address: supplier.address ?? undefined
    };

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  // Função para visualizar detalhes de um fornecedor
  const handleViewSupplier = (supplier: SupplierWithUI) => {
    setSelectedSupplier(supplier);
    setShowDetailsModal(true);
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setPaginationNum(1);
  };

  // Calcular estatísticas de fornecedores
  const totalSuppliers = suppliers?.data.items.length || 0;
  const totalPurchases = suppliers?.data.items.reduce((sum, supplier) => sum + (supplier.totalPurchases || 0), 0) || 0;

  const filterFields: any[] = [];

  const filterValues = {};

  const handleFilterChange = (name: string, value: any) => {
    // Sem filtros específicos por enquanto
  };

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Truck size={40} className="text-violet-500" />
            Gestão de Fornecedores
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Fornecedor</span>
          </button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Fornecedores</h3>
            <p className="text-white text-xl font-bold">{totalSuppliers}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Compras</h3>
            <p className="text-green-500 text-xl font-bold">{formatCurrency(totalPurchases)}</p>
          </div>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar fornecedores por nome, email, telefone..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Lista de fornecedores em cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {loaded && suppliers && suppliers.data.items.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              supplier={supplier}
              onClick={handleViewSupplier}
              onEdit={handleEditSupplier}
              onDelete={deleteSupplier}
            />
          ))}
          {loaded && suppliers && suppliers.data.items.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum fornecedor encontrado com os filtros aplicados.
            </div>
          )}
        </div>

        {/* Paginação */}
        {loaded && suppliers && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={suppliers.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar fornecedor */}
      {showAddModal && (
        <ModalForms create={createSupplier} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Novo Fornecedor'>
            <Input 
              nameOnDB='name' 
              name='Nome *' 
            />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Telefone' />
            <Input nameOnDB='address' name='Endereço' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar fornecedor */}
      {showEditModal && selectedSupplier && (
        <ModalForms
          create={updateSupplier}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Fornecedor: ${selectedSupplier.name}`}>
            <Input 
              nameOnDB='name' 
              name='Nome' 
            />
            <Input nameOnDB='email' name='Email' type='email' />
            <Input nameOnDB='phone' name='Telefone' />
            <Input nameOnDB='address' name='Endereço' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes do fornecedor */}
      {showDetailsModal && selectedSupplier && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Fornecedor
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedSupplier.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Mail className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedSupplier.email || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedSupplier.phone || 'Não informado'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Endereço</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedSupplier.address || 'Não informado'}</p>
                  </div>
                </div>
                
                {selectedSupplier.totalPurchases !== undefined && (
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total de Compras</p>
                    <p className="font-medium text-gray-900 dark:text-white text-2xl">{formatCurrency(selectedSupplier.totalPurchases)}</p>
                  </div>
                )}
              </div>
            </div>
            
            {selectedSupplier.lastPurchase && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Última Compra</h3>
                <p className="text-gray-700 dark:text-gray-300">{selectedSupplier.lastPurchase}</p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}