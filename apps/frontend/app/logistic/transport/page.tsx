'use client'

import React, { useEffect, useState } from 'react'
import { Plus, Truck, User, Phone, Building2, Navigation, Star, MapPin, CheckCircle, AlertTriangle } from 'lucide-react'
import { Filter } from '../../components/Filter'
import { ModalForms } from '../../components/forms/ModalForms'
import { Input } from '../../components/forms/Input'
import { Fieldset } from '../../components/forms/Fieldset'
import { Pagination } from '../../components/Pagination'
import { Modal } from '../../components/Modal'
import { create, getAll, update, remove, ListResponse } from '@/lib/api'
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store'
import { showSuccess, showError } from '@/lib/utils/toastHelpers'
import { TransporterCard } from '../../components/TransporterCard'
import { Transporters } from '@prisma/client'
import { CreateTransportersDTO, UpdateTransportersDTO } from '@pap/utils'

const APIMODULE = "transporters"

// Interface para estender o tipo Transporters com propriedades adicionais para a UI
interface TransporterWithUI extends Transporters {
  totalDeliveries?: number;
  lastDelivery?: string;
}

export default function TransportPage() {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [transporters, setTransporters] = useState<ListResponse<TransporterWithUI>>();
  const [paginationNum, setPaginationNum] = useState<number>(1);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransporter, setSelectedTransporter] = useState<TransporterWithUI | null>(null);

  const [inputDataCreate, setInputDataCreate] = useState<Partial<CreateTransportersDTO>>({});
  const [inputDataUpdate, setInputDataUpdate] = useState<Partial<UpdateTransportersDTO>>({});

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

  // Função para carregar a lista de transportadores
  const reloadTransportersList = async () => {
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

      const data = await getAll<ListResponse<TransporterWithUI>>(APIMODULE, params);
      
      // Enriquecer os dados com informações adicionais para UI
      const enhancedItems = data.data.items.map(transporter => {
        // Aqui podemos adicionar lógica para calcular totalDeliveries e lastDelivery
        // quando tivermos acesso a esses dados do backend
        return {
          ...transporter,
          totalDeliveries: 0, // Valor padrão até termos dados reais
          lastDelivery: undefined
        };
      });
      
      const enhancedData = {
        ...data,
        data: {
          ...data.data,
          items: enhancedItems
        }
      };

      setTransporters(enhancedData);
    } catch (err) {
      console.error('Erro ao carregar transportadores:', err);
      showError('Erro ao carregar transportadores');
    }
  };

  // Carregar transportadores quando a página carrega ou quando os filtros mudam
  useEffect(() => {
    setLoaded(false);
    reloadTransportersList().then(() => {
      setLoaded(true);
    });
  }, [paginationNum, debouncedSearchTerm]);

  // Função para criar um novo transportador
  function createTransporter(): Promise<boolean> {
    const enterpriseId = getEnterprise();
    if (!enterpriseId) {
      showError('Empresa não selecionada');
      return Promise.resolve(false);
    }

    if (!inputDataCreate.licensePlate) {
      showError('Placa do veículo é obrigatória');
      return Promise.resolve(false);
    }

    const payload: Partial<CreateTransportersDTO> = {
      ...inputDataCreate,
      enterpriseId: enterpriseId
    };

    console.log('Payload para criar transportador:', payload);

    return create<CreateTransportersDTO, Transporters>(APIMODULE, payload as CreateTransportersDTO)
      .then((data) => {
        console.log('Transportador criado:', data);
        showSuccess('Transportador criado com sucesso!');
        setShowAddModal(false);
        setInputDataCreate({});
        reloadTransportersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao criar transportador:', err);
        showError('Erro ao criar transportador');
        return false;
      });
  }

  // Função para atualizar um transportador existente
  function updateTransporter(): Promise<boolean> {
    if (!selectedTransporter) {
      showError('Nenhum transportador selecionado');
      return Promise.resolve(false);
    }

    const payload: Partial<UpdateTransportersDTO> = { ...inputDataUpdate };
    
    console.log('Payload para atualizar transportador:', payload);

    return update<UpdateTransportersDTO, Transporters>(APIMODULE, selectedTransporter.id, payload as UpdateTransportersDTO)
      .then((data) => {
        console.log('Transportador atualizado:', data);
        showSuccess('Transportador atualizado com sucesso!');
        setShowEditModal(false);
        setSelectedTransporter(null);
        setInputDataUpdate({});
        reloadTransportersList();
        return true;
      })
      .catch(err => {
        console.error('Erro ao atualizar transportador:', err);
        showError('Erro ao atualizar transportador');
        return false;
      });
  }

  // Função para deletar um transportador
  const deleteTransporter = async (transporter: TransporterWithUI) => {
    if (window.confirm('Tem certeza que deseja excluir este transportador?')) {
      try {
        await remove(APIMODULE, transporter.id);
        showSuccess('Transportador excluído com sucesso!');
        reloadTransportersList();
      } catch (err) {
        console.error('Erro ao excluir transportador:', err);
        showError('Erro ao excluir transportador');
      }
    }
  };

  // Função para editar um transportador
  const handleEditTransporter = (transporter: TransporterWithUI) => {
    setSelectedTransporter(transporter);
    
    const updateData: Partial<UpdateTransportersDTO> = {
      licensePlate: transporter.licensePlate,
      vehicleType: transporter.vehicleType ?? undefined,
      status: transporter.status ?? undefined,
      extEnterprise: transporter.extEnterprise ?? undefined,
      phone: transporter.phone ?? undefined,
      representative: transporter.representative ?? undefined,
      operationArea: transporter.operationArea ?? undefined,
      pricePerKm: transporter.pricePerKm ?? undefined,
      rating: transporter.rating ?? undefined
    };

    setInputDataUpdate(updateData);
    setShowEditModal(true);
  };

  // Função para visualizar detalhes de um transportador
  const handleViewTransporter = (transporter: TransporterWithUI) => {
    setSelectedTransporter(transporter);
    setShowDetailsModal(true);
  };

  // Função para resetar filtros
  const resetFilters = () => {
    setSearchTerm('');
    setPaginationNum(1);
  };

  // Calcular estatísticas de transportadores
  const totalTransporters = transporters?.data.items.length || 0;
  const avgRating = (transporters?.data.items.reduce((sum, transporter) => sum + (transporter.rating || 0), 0) ?? 0) / totalTransporters || 0;
  const activeTransporters = transporters?.data.items.filter(t => t.status?.toLowerCase() === 'ativo' || t.status?.toLowerCase() === 'disponível').length || 0;

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">N/A</span>;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} className="text-yellow-400 fill-current" />);
    }
    
    const emptyStars = 5 - fullStars;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-gray-600" />);
    }
    
    return <div className="flex items-center gap-1">{stars}</div>;
  };

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
            🚚 Gestão de Transportadores
          </h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Adicionar Transportador</span>
          </button>
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Total de Transportadores</h3>
            <p className="text-white text-xl font-bold">{totalTransporters}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Transportadores Ativos</h3>
            <p className="text-green-500 text-xl font-bold">{activeTransporters}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm mb-2">Avaliação Média</h3>
            <div className="flex items-center gap-2">
              <p className="text-yellow-500 text-xl font-bold">{avgRating.toFixed(1)}</p>
              {renderStars(avgRating)}
            </div>
          </div>
        </div>

        {/* Filtros */}
        <Filter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Pesquisar transportadores por placa, representante, telefone..."
          fields={filterFields}
          values={filterValues}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />

        {/* Lista de transportadores em cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {loaded && transporters && transporters.data.items.map((transporter) => (
            <TransporterCard
              key={transporter.id}
              transporter={transporter}
              onClick={handleViewTransporter}
              onEdit={handleEditTransporter}
              onDelete={deleteTransporter}
            />
          ))}
          {loaded && transporters && transporters.data.items.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-400">
              Nenhum transportador encontrado com os filtros aplicados.
            </div>
          )}
        </div>

        {/* Paginação */}
        {loaded && transporters && (
          <div className="mt-10">
            <Pagination
              updatePage={setPaginationNum}
              actualPage={paginationNum}
              last={transporters.data.metadata.last ?? 1}
            />
          </div>
        )}
      </div>

      {/* Modal para adicionar transportador */}
      {showAddModal && (
        <ModalForms create={createTransporter} setInputData={setInputDataCreate} onclick={() => setShowAddModal(false)}>
          <Fieldset title='Novo Transportador'>
            <Input 
              nameOnDB='licensePlate' 
              name='Placa do Veículo *' 
            />
            <Input 
              nameOnDB='vehicleType' 
              name='Tipo de Veículo' 
            />
            <Input 
              nameOnDB='status' 
              name='Status' 
            />
            <Input 
              nameOnDB='representative' 
              name='Representante/Motorista' 
            />
            <Input 
              nameOnDB='phone' 
              name='Telefone' 
            />
            <Input 
              nameOnDB='extEnterprise' 
              name='Empresa Externa' 
            />
            <Input 
              nameOnDB='operationArea' 
              name='Área de Operação' 
            />
            <Input 
              nameOnDB='pricePerKm' 
              name='Preço por KM (€)' 
              type='number'
              step='0.01'
            />
            <Input 
              nameOnDB='rating' 
              name='Avaliação (0-5)' 
              type='number'
              step='0.1'
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para editar transportador */}
      {showEditModal && selectedTransporter && (
        <ModalForms
          create={updateTransporter}
          setInputData={setInputDataUpdate}
          onclick={() => setShowEditModal(false)}
          initialData={inputDataUpdate}
        >
          <Fieldset title={`Editar Transportador: ${selectedTransporter.licensePlate}`}>
            <Input 
              nameOnDB='licensePlate' 
              name='Placa do Veícu-1234'
            />
            <Input 
              nameOnDB='vehicleType' 
              name='Tipo de Veículo' 
            />
            <Input 
              nameOnDB='status' 
              name='Status' 
            />
            <Input 
              nameOnDB='representative' 
              name='Representante/Motorista' 
            />
            <Input 
              nameOnDB='phone' 
              name='Telefone' 
            />
            <Input 
              nameOnDB='extEnterprise' 
              name='Empresa Externa' 
            />
            <Input 
              nameOnDB='operationArea' 
              name='Área de Operação' 
            />
            <Input 
              nameOnDB='pricePerKm' 
              name='Preço por KM (€)' 
              type='number'
              step='0.01'
            />
            <Input 
              nameOnDB='rating' 
              name='Avaliação (0-5)' 
              type='number'
              step='0.1'
            />
          </Fieldset>
        </ModalForms>
      )}

      {/* Modal para visualizar detalhes do transportador */}
      {showDetailsModal && selectedTransporter && (
        <Modal onclick={() => setShowDetailsModal(false)} isCreate={false} isLarge={true}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Detalhes do Transportador
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Truck className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Placa do Veículo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.licensePlate}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Building2 className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tipo de Veículo</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.vehicleType || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.status || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <User className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Representante</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.representative || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.phone || 'Não informado'}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Empresa Externa</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.extEnterprise || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Navigation className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Área de Operação</p>
                    <p className="font-medium text-gray-900 dark:text-white">{selectedTransporter.operationArea || 'Não informado'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Star className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Avaliação</p>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedTransporter.rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedTransporter.rating ? `(${selectedTransporter.rating.toFixed(1)})` : 'Sem avaliação'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="text-violet-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Preço por KM</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {selectedTransporter.pricePerKm ? formatCurrency(selectedTransporter.pricePerKm) : 'Não informado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Estatísticas adicionais */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Estatísticas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total de Entregas</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {selectedTransporter.totalDeliveries || 0}
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400">Última Entrega</p>
                  <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                    {selectedTransporter.lastDelivery || 'Nenhuma'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}