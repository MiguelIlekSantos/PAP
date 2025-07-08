'use client'

import React, { useEffect, useState } from 'react'
import { Plus, ShoppingBag, Calendar, CreditCard, User, CheckCircle, Clock, AlertTriangle, Building, Package } from 'lucide-react'
import { DataTable } from '../../components/DataTable'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { SelectString } from '../../components/forms/SelectString'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, update, remove, ListResponse, getById } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Purchases, Suppliers } from '@prisma/client'
import { CreatePurchasesDTO, UpdatePurchasesDTO } from '@pap/utils'

const APIMODULE = "purchases"

// Interface para estender o tipo Purchases com propriedades adicionais para a UI
interface PurchasesWithRelations extends Purchases {
  Supplier?: Suppliers;
}

export default function PurchasesPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [purchases, setPurchases] = useState<ListResponse<PurchasesWithRelations>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<PurchasesWithRelations | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreatePurchasesDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdatePurchasesDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'Não informado';
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const loadSuppliers = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params = {
        "quantity": 100, 
        "relationFilter": ["enterpriseId", enterpriseId]
      };
      
      const response = await getAll<ListResponse<Suppliers>>("suppliers", params);
      setSuppliers(response.data.items);
    } catch (err) {
      console.error('Erro ao carregar fornecedores:', err);
    }
  };

  const reloadPurchasesList = async () => {
    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 10
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<PurchasesWithRelations>>(APIMODULE, params);
      
      const enrichedItems = await Promise.all(
        data.data.items.map(async (purchase) => {
          try {
            const fullPurchase = await getById<PurchasesWithRelations>(APIMODULE, purchase.id);
            
            if (fullPurchase.supplierId) {
              const supplier = suppliers.find(s => s.id === fullPurchase.supplierId);
              if (supplier) {
                fullPurchase.Supplier = supplier;
              }
            }
            
            return fullPurchase;
          } catch (error) {
            console.error(`Erro ao buscar detalhes da compra ${purchase.id}:`, error);
            return purchase;
          }
        })
      );
      
      const enrichedData = {
        ...data,
        data: {
          ...data.data,
          items: enrichedItems
        }
      };
      
      let filteredData = enrichedData;
      
      if (categoryFilter) {
        const filteredItems = enrichedData.data.items.filter(purchase => purchase.category === categoryFilter);
        
        filteredData = {
          ...enrichedData,
          data: {
            ...enrichedData.data,
            items: filteredItems,
            metadata: {
              ...enrichedData.data.metadata,
              total: filteredItems.length,
              last: Math.ceil(filteredItems.length / 10)
            }
          }
        };
      }

      setPurchases(filteredData);
    } catch (err) {
      console.error('Erro ao carregar compras:', err);
      showError('Erro ao carregar compras');
    }
  };

  useEffect(() => {
    setLoaded(false);
    loadSuppliers();
    reloadPurchasesList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, categoryFilter]);

  function createPurchase(): Promise<boolean> {
    if (!inputDataCreate.number || !inputDataCreate.supplierId) {
      showError('Número da compra e fornecedor são obrigatórios');
      return Promise.resolve(false);
    }

    const payload: Partial<CreatePurchasesDTO> = {
      ...inputDataCreate,
      price: inputDataCreate.price || 0
    };

    console.log('Payload para criar compra:', payload);

    return create<CreatePurchasesDTO, Purchases>(APIMODULE, payload as CreatePurchasesDTO)
      .then((data) => {
        console.log('Compra criada:', data);
        showSuccess('Compra criada com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadPurchasesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar compra:', err);
        showError('Erro ao criar compra');
        return false;
      });
  }

  function updatePurchase(): Promise<boolean> {
    if (!selectedPurchase) {
      showError('Nenhuma compra selecionada');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdatePurchasesDTO> = { 
      ...inputDataUpdate
    };
    
    console.log('Payload para atualizar compra:', payload);

    return update<UpdatePurchasesDTO, Purchases>(APIMODULE, selectedPurchase.id, payload as UpdatePurchasesDTO)
      .then((data) => {
        console.log('Compra atualizada:', data);
        showSuccess('Compra atualizada com sucesso!');
        setShowEditModal(false);
        setSelectedPurchase(null);
        setInputDataUpdate({});
        reloadPurchasesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar compra:', err);
        showError('Erro ao atualizar compra');
        return false;
      });
  }

  const deletePurchase = async (purchase: PurchasesWithRelations) => {
    if (window.confirm('Tem certeza que deseja excluir esta compra?')) {
      try {
        await remove(APIMODULE, purchase.id);
        showSuccess('Compra excluída com sucesso!');
        reloadPurchasesList();
      } catch (err) {
        console.error('Erro ao excluir compra:', err);
        showError('Erro ao excluir compra');
      }
    }
  };

  const deleteBulkPurchases = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} compra(s) excluída(s) com sucesso!`);
      reloadPurchasesList();
    } catch (err) {
      console.error('Erro ao excluir compras:', err);
      showError('Erro ao excluir compras');
    }
  };

  const handleEditPurchase = async (purchase: PurchasesWithRelations) => {
    try {
      const fullPurchase = await getById<PurchasesWithRelations>(APIMODULE, purchase.id);
      
      if (fullPurchase.supplierId) {
        const supplier = suppliers.find(s => s.id === fullPurchase.supplierId);
        if (supplier) {
          fullPurchase.Supplier = supplier;
        }
      }
      
      setSelectedPurchase(fullPurchase);
      
      console.log('Preparando dados para edição:', {
        purchaseId: fullPurchase.id,
        purchase: fullPurchase
      });
      
      // Preparar os dados para edição
      const updateData: Partial<UpdatePurchasesDTO> = {
        number: fullPurchase.number,
        name: fullPurchase.name,
        description: fullPurchase.description,
        price: fullPurchase.price,
        category: fullPurchase.category,
        subCategory: fullPurchase.subCategory,
        brand: fullPurchase.brand,
        model: fullPurchase.model,
        sku: fullPurchase.sku,
        weight: fullPurchase.weight,
        dimensions: fullPurchase.dimensions,
        imageUrl: fullPurchase.imageUrl,
        supplierId: fullPurchase.supplierId
      };

      console.log('Definindo dados para edição:', updateData);
      
      // Definir os dados e mostrar o modal
      setInputDataUpdate(updateData);
      setShowEditModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da compra:', err);
      showError('Erro ao carregar detalhes da compra');
    }
  };

  const handleViewPurchase = async (purchase: PurchasesWithRelations) => {
    try {
      const fullPurchase = await getById<PurchasesWithRelations>(APIMODULE, purchase.id);
      
      if (fullPurchase.supplierId) {
        const supplier = suppliers.find(s => s.id === fullPurchase.supplierId);
        if (supplier) {
          fullPurchase.Supplier = supplier;
        }
      }
      
      setSelectedPurchase(fullPurchase);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da compra:', err);
      showError('Erro ao carregar detalhes da compra');
    }
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setPaginationNum(1);
  };

  // Obter o nome do fornecedor
  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Fornecedor não encontrado';
  };

  // Definir colunas para a tabela
  const getPurchaseColumns = () => [
    {
      header: 'Número',
      accessor: 'number',
      cell: (value: any) => <span className="font-mono font-medium">{value}</span>,
    },
    {
      header: 'Nome',
      accessor: 'name',
      cell: (value: any) => value || 'Não informado',
    },
    {
      header: 'Fornecedor',
      accessor: 'supplierId',
      cell: (value: any, row: any) => row.Supplier ? row.Supplier.name : getSupplierName(value),
    },
    {
      header: 'Preço',
      accessor: 'price',
      cell: (value: any) => formatCurrency(value),
    },
    {
      header: 'Categoria',
      accessor: 'category',
      cell: (value: any) => value || 'Não categorizado',
    },
    {
      header: 'Marca',
      accessor: 'brand',
      cell: (value: any) => value || 'Não informado',
    },
  ];

  // Opções para os filtros
  const categoryOptions = [
    { value: 'Hardware', label: 'Hardware' },
    { value: 'Software', label: 'Software' },
    { value: 'Periféricos', label: 'Periféricos' },
    { value: 'Escritório', label: 'Material de Escritório' },
    { value: 'Eletrônicos', label: 'Eletrônicos' },
  ];

  const filterFields = [
    {
      name: 'categoryFilter',
      label: 'Todas as categorias',
      type: 'select' as const,
      options: categoryOptions,
    },
  ];

  const filterValues = {
    categoryFilter,
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'categoryFilter':
        setCategoryFilter(value);
        break;
    }
  };

  const columns = getPurchaseColumns();

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingBag size={40} className="text-violet-500" />
             Gestão de Compras
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Compra</span>
          </button>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar por nome do produto..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Tabela de compras */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && purchases ? purchases.data.items : []}
            onEdit={handleEditPurchase}
            onDelete={deletePurchase}
            onBulkDelete={deleteBulkPurchases}
            onRowClick={handleViewPurchase}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Paginação */}
        {loaded && purchases && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={purchases.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar compra */}
      {showAddModal && (
        <ModalForms create={createPurchase} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Nova Compra'>
            <Input 
              nameOnDB='number' 
              name='Número da Compra *' 
            />
            <Input 
              nameOnDB='name' 
              name='Nome do Produto' 
            />
            <SelectString
              nameOnDB='supplierId'
              name='Fornecedor *'
              options={suppliers.map(supplier => ({ 
                value: supplier.id.toString(), 
                label: supplier.name 
              }))}
            />
            <Input 
              nameOnDB='price' 
              name='Preço' 
              type='number'
              step='0.01'
            />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
            />
            <Input nameOnDB='subCategory' name='Subcategoria' />
            <Input nameOnDB='brand' name='Marca' />
            <Input nameOnDB='model' name='Modelo' />
            <Input nameOnDB='sku' name='SKU' />
            <Input nameOnDB='weight' name='Peso (kg)' type='number' step='0.01' />
            <Input nameOnDB='dimensions' name='Dimensões' />
            <Input nameOnDB='imageUrl' name='URL da Imagem' />
            <Input nameOnDB='description' name='Descrição' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar compra */}
      {showEditModal && selectedPurchase && (
        <ModalForms
          create={updatePurchase}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Compra: ${selectedPurchase.number}`}>
            <Input 
              nameOnDB='number' 
              name='Número da Compra' 
            />
            <Input 
              nameOnDB='name' 
              name='Nome do Produto' 
            />
            <SelectString
              nameOnDB='supplierId'
              name='Fornecedor'
              options={suppliers.map(supplier => ({ 
                value: supplier.id.toString(), 
                label: supplier.name 
              }))}
            />
            <Input 
              nameOnDB='price' 
              name='Preço' 
              type='number'
              step='0.01'
            />
            <SelectString
              nameOnDB='category'
              name='Categoria'
              options={categoryOptions}
            />
            <Input nameOnDB='subCategory' name='Subcategoria' />
            <Input nameOnDB='brand' name='Marca' />
            <Input nameOnDB='model' name='Modelo' />
            <Input nameOnDB='sku' name='SKU' />
            <Input nameOnDB='weight' name='Peso (kg)' type='number' step='0.01' />
            <Input nameOnDB='dimensions' name='Dimensões' />
            <Input nameOnDB='imageUrl' name='URL da Imagem' />
            <Input nameOnDB='description' name='Descrição' />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes da compra */}
      {showDetailsModal && selectedPurchase && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes da Compra
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Número</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.number}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nome</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.name || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fornecedor</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedPurchase.Supplier ? selectedPurchase.Supplier.name : getSupplierName(selectedPurchase.supplierId)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Preço</p>
                    <p className="font-medium text-gray-900 dark:text-white text-lg">
                      {formatCurrency(selectedPurchase.price)}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Categoria</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.category || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Marca</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.brand || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Modelo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.model || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">SKU</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedPurchase.sku || 'Não informado'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detalhes adicionais */}
            {(selectedPurchase.description || selectedPurchase.weight || selectedPurchase.dimensions) && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Detalhes Adicionais</h3>
                
                {selectedPurchase.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Descrição</p>
                    <p className="text-gray-700 dark:text-gray-300">{selectedPurchase.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedPurchase.weight && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Peso</p>
                      <p className="text-gray-700 dark:text-gray-300">{selectedPurchase.weight} kg</p>
                    </div>
                  )}
                  
                  {selectedPurchase.dimensions && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Dimensões</p>
                      <p className="text-gray-700 dark:text-gray-300">{selectedPurchase.dimensions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}