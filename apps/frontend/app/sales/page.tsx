'use client'

import React, { useEffect, useState } from 'react'
import { Plus, ShoppingCart, Calendar, CreditCard, User, CheckCircle, Clock, AlertTriangle, Edit, Trash2 } from 'lucide-react'
import { DataTable } from '../components/DataTable'
import { Filter } from '../components/Filter'
import { ModalForms } from '../components/forms/ModalForms'
import { Input } from '../components/forms/Input'
import { SelectString } from '../components/forms/SelectString'
import { MultiSelect } from '../components/forms/MultiSelect'
import { Fieldset } from '../components/forms/Fieldset'
import { Pagination } from '../components/Pagination'
import { Modal } from '../components/Modal'
import { create, getAll, update, remove, ListResponse, getById } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { Sales, Clients, Products } from '@prisma/client'
import { CreateSalesDTO, UpdateSalesDTO } from '@pap/utils'

const APIMODULE = "sales"

// Interface para estender o tipo Sales com propriedades adicionais para a UI
interface SalesWithRelations extends Sales {
  Client?: Clients;
  Products?: Products[];
}

export default function SalesPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [sales, setSales] = useState<ListResponse<SalesWithRelations>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<Products[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState<SalesWithRelations | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateSalesDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateSalesDTO>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { getEnterprise } = useEnterpriseStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'Não informado';
    return new Date(date).toLocaleDateString('pt-PT');
  };

  const formatCurrency = (value: number | null | undefined): string => {
    if (value === null || value === undefined) return 'Não informado';
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);
  };

  const loadClients = async () => {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) return;

    try {
      const params = {
        "quantity": 100, 
        "relationFilter": ["enterpriseId", enterpriseId]
      };
      
      const response = await getAll<ListResponse<Clients>>("clients", params);
      setClients(response.data.items);
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
    }
  };

  const loadProducts = async () => {
    try {
      const params = {
        "quantity": 100 
      };
      
      const response = await getAll<ListResponse<Products>>("products", params);
      setProducts(response.data.items);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
    }
  };

  const reloadSalesList = async () => {
    try {
      const params: any = {
        "page": paginationNum,
        "quantity": 10
      };

      if (debouncedSearchTerm) {
        params.term = debouncedSearchTerm;
      }

      const data = await getAll<ListResponse<SalesWithRelations>>(APIMODULE, params);
      
      const enrichedItems = await Promise.all(
        data.data.items.map(async (sale) => {
          try {
            const fullSale = await getById<SalesWithRelations>(APIMODULE, sale.id);
            
            if (fullSale.ClientId) {
              const client = clients.find(c => c.id === fullSale.ClientId);
              if (client) {
                fullSale.Client = client;
              }
            }
            
            return fullSale;
          } catch (error) {
            console.error(`Erro ao buscar detalhes da venda ${sale.id}:`, error);
            return sale;
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
      
      if (statusFilter) {
        const filteredItems = enrichedData.data.items.filter(sale => sale.status === statusFilter);
        
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

      setSales(filteredData);
    } catch (err) {
      console.error('Erro ao carregar vendas:', err);
      showError('Erro ao carregar vendas');
    }
  };

  useEffect(() => {
    setLoaded(false);
    loadClients();
    loadProducts();
    reloadSalesList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm, statusFilter]);

  function createSale(): Promise<boolean> {
    if (!inputDataCreate.total || !inputDataCreate.ClientId || !inputDataCreate.paymentMethod) {
      showError('Total, cliente e método de pagamento são obrigatórios');
      return Promise.resolve(false);
    }

    // Garantir que products seja um array
    const payload: Partial<CreateSalesDTO> = {
      ...inputDataCreate,
      Products: Array.isArray(inputDataCreate.Products) ? inputDataCreate.Products : []
    };

    console.log('Payload para criar venda:', payload);

    return create<CreateSalesDTO, Sales>(APIMODULE, payload as CreateSalesDTO)
      .then((data) => {
        console.log('Venda criada:', data);
        showSuccess('Venda criada com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadSalesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar venda:', err);
        showError('Erro ao criar venda');
        return false;
      });
  }

  function updateSale(): Promise<boolean> {
    if (!selectedSale) {
      showError('Nenhuma venda selecionada');
      return Promise.resolve(false);
    }

    // Garantir que products seja um array
    const payload: Partial<UpdateSalesDTO> = { 
      ...inputDataUpdate,
      Products: Array.isArray(inputDataUpdate.Products) ? inputDataUpdate.Products : []
    };
    
    // Garantir que a data seja tratada corretamente
    if (payload.lastPurchase && typeof payload.lastPurchase === 'string') {
      payload.lastPurchase = new Date(payload.lastPurchase);
    }
    
    console.log('Payload para atualizar venda:', payload);

    return update<UpdateSalesDTO, Sales>(APIMODULE, selectedSale.id, payload as UpdateSalesDTO)
      .then((data) => {
        console.log('Venda atualizada:', data);
        showSuccess('Venda atualizada com sucesso!');
        setShowEditModal(false);
        setSelectedSale(null);
        setInputDataUpdate({});
        reloadSalesList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar venda:', err);
        showError('Erro ao atualizar venda');
        return false;
      });
  }

  const deleteSale = async (sale: SalesWithRelations) => {
    if (window.confirm('Tem certeza que deseja excluir esta venda?')) {
      try {
        await remove(APIMODULE, sale.id);
        showSuccess('Venda excluída com sucesso!');
        reloadSalesList();
      } catch (err) {
        console.error('Erro ao excluir venda:', err);
        showError('Erro ao excluir venda');
      }
    }
  };

  const deleteBulkSales = async (selectedIds: number[]) => {
    try {
      const deletePromises = selectedIds.map(id => remove(APIMODULE, id));
      await Promise.all(deletePromises);
      showSuccess(`${selectedIds.length} venda(s) excluída(s) com sucesso!`);
      reloadSalesList();
    } catch (err) {
      console.error('Erro ao excluir vendas:', err);
      showError('Erro ao excluir vendas');
    }
  };

  const handleEditSale = async (sale: SalesWithRelations) => {
    try {
      const fullSale = await getById<SalesWithRelations>(APIMODULE, sale.id);
      
      if (fullSale.ClientId) {
        const client = clients.find(c => c.id === fullSale.ClientId);
        if (client) {
          fullSale.Client = client;
        }
      }
      
      try {
        // Buscar produtos relacionados à venda
        const productsResponse = await getAll<ListResponse<Products>>("products", {
          relationFilter: ["sales", sale.id]
        });
        
        if (productsResponse && productsResponse.data.items.length > 0) {
          fullSale.Products = productsResponse.data.items;
        }
      } catch (productErr) {
        console.error('Erro ao buscar produtos da venda:', productErr);
      }
      
      setSelectedSale(fullSale);
      
      // Extrair os IDs dos produtos para o formulário de edição
      const productIds = fullSale.Products?.map(product => product.id) || [];
      
      console.log('Preparando dados para edição:', {
        saleId: fullSale.id,
        productIds,
        products: fullSale.Products
      });
      
      // Preparar os dados para edição
      const updateData: Partial<UpdateSalesDTO> = {
        total: fullSale.total,
        ClientId: fullSale.ClientId,
        paymentMethod: fullSale.paymentMethod,
        status: fullSale.status || 'pending',
        lastPurchase: fullSale.lastPurchase ? new Date(fullSale.lastPurchase) : undefined,
        Products: productIds
      };

      console.log('Definindo dados para edição:', updateData);
      
      // Definir os dados e mostrar o modal
      setInputDataUpdate(updateData);
      setShowEditModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da venda:', err);
      showError('Erro ao carregar detalhes da venda');
    }
  };

  const handleViewSale = async (sale: SalesWithRelations) => {
    try {
      const fullSale = await getById<SalesWithRelations>(APIMODULE, sale.id);
      
      if (fullSale.ClientId) {
        const client = clients.find(c => c.id === fullSale.ClientId);
        if (client) {
          fullSale.Client = client;
        }
      }
    
      try {
        // Buscar produtos relacionados à venda
        const productsResponse = await getAll<ListResponse<Products>>("products", {
          relationFilter: ["sales", sale.id]
        });
        
        if (productsResponse && productsResponse.data.items.length > 0) {
          fullSale.Products = productsResponse.data.items;
        }
      } catch (productErr) {
        console.error('Erro ao buscar produtos da venda:', productErr);
      }
      
      setSelectedSale(fullSale);
      setShowDetailsModal(true);
    } catch (err) {
      console.error('Erro ao carregar detalhes da venda:', err);
      showError('Erro ao carregar detalhes da venda');
    }
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setPaginationNum(1);
  };

  // Obter o ícone de status
  const getStatusIcon = (status: string | null | undefined) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'processing':
        return <Clock size={16} className="text-blue-500" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-500" />;
      case 'cancelled':
        return <AlertTriangle size={16} className="text-red-500" />;
      default:
        return <Clock size={16} className="text-gray-500" />;
    }
  };

  // Obter o texto de status
  const getStatusText = (status: string | null | undefined) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'processing':
        return 'Em Processamento';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Não definido';
    }
  };

  // Obter o nome do cliente
  const getClientName = (clientId: number) => {
    const client = clients.find(c => c.id === clientId);
    return client ? client.name : 'Cliente não encontrado';
  };

  // Definir colunas para a tabela
  const getSaleColumns = () => [
    {
      header: 'Cliente',
      accessor: 'ClientId',
      cell: (value: any, row: any) => row.Client ? row.Client.name : getClientName(value),
    },
    {
      header: 'Total',
      accessor: 'total',
      cell: (value: any) => formatCurrency(value),
    },
    {
      header: 'Método de Pagamento',
      accessor: 'paymentMethod',
      cell: (value: any) => value,
    },
    {
      header: 'Data da Compra',
      accessor: 'lastPurchase',
      cell: (value: any) => formatDate(value),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: any) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(value)}
          <span>{getStatusText(value)}</span>
        </div>
      ),
    },
  ];

  // Opções para os filtros
  const statusOptions = [
    { value: 'pending', label: 'Pendente' },
    { value: 'processing', label: 'Em Processamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' },
  ];

  const filterFields = [
    {
      name: 'statusFilter',
      label: 'Todos os status',
      type: 'select' as const,
      options: statusOptions,
    },
  ];

  const filterValues = {
    statusFilter,
  };

  const handleFilterChange = (name: string, value: any) => {
    switch (name) {
      case 'statusFilter':
        setStatusFilter(value);
        break;
    }
  };

  const columns = getSaleColumns();

  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-10">
        <div className="flex items-center justify-between mb-10 border-b border-violet-900/30 pb-4">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <ShoppingCart size={40} className="text-violet-500" />
            💰 Gestão de Vendas
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Venda</span>
          </button>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar vendas..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Tabela de vendas */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <DataTable
            columns={columns}
            data={loaded && sales ? sales.data.items : []}
            onEdit={handleEditSale}
            onDelete={deleteSale}
            onBulkDelete={deleteBulkSales}
            onRowClick={handleViewSale}
            selectable={true}
            idField="id"
          />
        </div>

        {/* Paginação */}
        {loaded && sales && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={sales.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar venda */}
      {showAddModal && (
        <ModalForms create={createSale} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Nova Venda'>
            <SelectString
              nameOnDB='ClientId'
              name='Cliente *'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input 
              nameOnDB='total' 
              name='Total *' 
              type='number'
            />
            <SelectString
              nameOnDB='paymentMethod'
              name='Método de Pagamento *'
              options={[
                { value: 'Dinheiro', label: 'Dinheiro' },
                { value: 'Cartão de Crédito', label: 'Cartão de Crédito' },
                { value: 'Cartão de Débito', label: 'Cartão de Débito' },
                { value: 'Transferência', label: 'Transferência' },
                { value: 'Outro', label: 'Outro' }
              ]}
            />
            <Input nameOnDB='lastPurchase' name='Data da Compra' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='Products'
              name='Produtos'
              options={products.map(product => ({ 
                value: product.id.toString(), 
                label: `${product.name} ${product.price ? `(${new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)})` : ''}` 
              }))}
              type="number"
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar venda */}
      {showEditModal && selectedSale && (
        <ModalForms
          create={updateSale}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Venda #${selectedSale.id}`}>
            <SelectString
              nameOnDB='ClientId'
              name='Cliente'
              options={clients.map(client => ({ 
                value: client.id.toString(), 
                label: client.name 
              }))}
            />
            <Input 
              nameOnDB='total' 
              name='Total' 
              type='number'
            />
            <SelectString
              nameOnDB='paymentMethod'
              name='Método de Pagamento'
              options={[
                { value: 'Dinheiro', label: 'Dinheiro' },
                { value: 'Cartão de Crédito', label: 'Cartão de Crédito' },
                { value: 'Cartão de Débito', label: 'Cartão de Débito' },
                { value: 'Transferência', label: 'Transferência' },
                { value: 'Outro', label: 'Outro' }
              ]}
            />
            <Input nameOnDB='lastPurchase' name='Data da Compra' type='date' />
            <SelectString
              nameOnDB='status'
              name='Status'
              options={statusOptions}
            />
            <MultiSelect
              nameOnDB='Products'
              name='Produtos'
              options={products.map(product => ({ 
                value: product.id.toString(), 
                label: `${product.name} ${product.price ? `(${new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price)})` : ''}` 
              }))}
              type="number"
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes da venda */}
      {showDetailsModal && selectedSale && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes da Venda
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Cliente</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedSale.Client ? selectedSale.Client.name : getClientName(selectedSale.ClientId)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CreditCard className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Método de Pagamento</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedSale.paymentMethod}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Data da Compra</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatDate(selectedSale.lastPurchase)}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getStatusIcon(selectedSale.status)}
                    <span className="font-medium text-gray-900 dark:text-white">
                      {getStatusText(selectedSale.status)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ShoppingCart className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
                    <p className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedSale.total)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lista de produtos */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Produtos</h3>
              
              {selectedSale.products && selectedSale.products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nome</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Categoria</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Preço</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      {selectedSale.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{product.category || 'Não categorizado'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {product.price ? new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(product.price) : 'Não informado'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300">
                  Nenhum produto associado a esta venda.
                </p>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}