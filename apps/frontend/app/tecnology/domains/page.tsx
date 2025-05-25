'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, ArrowLeft, Globe, ExternalLink, Calendar, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

// Mock data for domains
const mockDomains = [
  {
    id: '1',
    name: 'techwave.pt',
    type: 'primary',
    registrar: 'GoDaddy',
    registrationDate: '15/03/2015',
    expirationDate: '15/03/2024',
    autoRenew: true,
    status: 'active',
    nameservers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    sslExpiration: '15/09/2023',
    hosting: 'AWS',
  },
  {
    id: '2',
    name: 'techwave.com',
    type: 'redirect',
    registrar: 'GoDaddy',
    registrationDate: '15/03/2015',
    expirationDate: '15/03/2024',
    autoRenew: true,
    status: 'active',
    nameservers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    sslExpiration: '15/09/2023',
    hosting: 'AWS',
  },
  {
    id: '3',
    name: 'techwave.io',
    type: 'redirect',
    registrar: 'Namecheap',
    registrationDate: '20/05/2018',
    expirationDate: '20/05/2023',
    autoRenew: true,
    status: 'active',
    nameservers: ['dns1.namecheap.com', 'dns2.namecheap.com'],
    sslExpiration: '20/11/2023',
    hosting: 'AWS',
  },
  {
    id: '4',
    name: 'techwave-blog.com',
    type: 'blog',
    registrar: 'Namecheap',
    registrationDate: '10/01/2020',
    expirationDate: '10/01/2024',
    autoRenew: true,
    status: 'active',
    nameservers: ['dns1.namecheap.com', 'dns2.namecheap.com'],
    sslExpiration: '10/07/2023',
    hosting: 'DigitalOcean',
  },
  {
    id: '5',
    name: 'techwave-app.com',
    type: 'application',
    registrar: 'GoDaddy',
    registrationDate: '05/06/2021',
    expirationDate: '05/06/2023',
    autoRenew: true,
    status: 'active',
    nameservers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    sslExpiration: '05/12/2023',
    hosting: 'Heroku',
  },
  {
    id: '6',
    name: 'old-techwave.com',
    type: 'legacy',
    registrar: 'GoDaddy',
    registrationDate: '10/03/2010',
    expirationDate: '10/03/2023',
    autoRenew: false,
    status: 'expired',
    nameservers: ['ns1.godaddy.com', 'ns2.godaddy.com'],
    sslExpiration: '10/09/2022',
    hosting: 'None',
  },
];

// Filter fields
const filterFields = [
  {
    name: 'type',
    label: 'Tipo',
    type: 'select' as const,
    options: [
      { label: 'Primário', value: 'primary' },
      { label: 'Redirecionamento', value: 'redirect' },
      { label: 'Blog', value: 'blog' },
      { label: 'Aplicação', value: 'application' },
      { label: 'Legado', value: 'legacy' },
    ],
  },
  {
    name: 'registrar',
    label: 'Registrador',
    type: 'select' as const,
    options: [
      { label: 'GoDaddy', value: 'GoDaddy' },
      { label: 'Namecheap', value: 'Namecheap' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Expirado', value: 'expired' },
    ],
  },
  {
    name: 'hosting',
    label: 'Hospedagem',
    type: 'select' as const,
    options: [
      { label: 'AWS', value: 'AWS' },
      { label: 'DigitalOcean', value: 'DigitalOcean' },
      { label: 'Heroku', value: 'Heroku' },
      { label: 'Nenhuma', value: 'None' },
    ],
  },
];

export default function DomainsPage() {
  const [domains, setDomains] = useState(mockDomains);
  const [filteredDomains, setFilteredDomains] = useState(mockDomains);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<any>(null);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...domains];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (domain) =>
          domain.name.toLowerCase().includes(term) ||
          domain.registrar.toLowerCase().includes(term) ||
          domain.hosting.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((domain) => {
          if (typeof domain[key as keyof typeof domain] === 'string') {
            return (domain[key as keyof typeof domain] as string).toLowerCase() === value.toLowerCase();
          }
          return domain[key as keyof typeof domain] === value;
        });
      }
    });

    setFilteredDomains(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredDomains(domains);
  };

  // Handle domain click
  const handleDomainClick = (domain: any) => {
    setSelectedDomain(domain);
    setShowDomainModal(true);
  };

  // Check if domain is expiring soon (within 30 days)
  const isExpiringSoon = (expirationDate: string) => {
    const expDate = new Date(expirationDate.split('/').reverse().join('-'));
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Check if SSL is expiring soon (within 30 days)
  const isSSLExpiringSoon = (sslExpiration: string) => {
    const expDate = new Date(sslExpiration.split('/').reverse().join('-'));
    const today = new Date();
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  // Table columns
  const columns = [
    {
      header: 'Domínio',
      accessor: 'name',
      cell: (value: string, row: any) => (
        <div className="flex items-center gap-2">
          <span>{value}</span>
          {row.type === 'primary' && (
            <span className="bg-violet-500 text-white text-xs px-2 py-0.5 rounded-full">Primário</span>
          )}
        </div>
      ),
    },
    {
      header: 'Tipo',
      accessor: 'type',
      cell: (value: string) => {
        if (value === 'primary') return 'Primário';
        if (value === 'redirect') return 'Redirecionamento';
        if (value === 'blog') return 'Blog';
        if (value === 'application') return 'Aplicação';
        if (value === 'legacy') return 'Legado';
        return value;
      },
    },
    {
      header: 'Registrador',
      accessor: 'registrar',
    },
    {
      header: 'Expiração',
      accessor: 'expirationDate',
      cell: (value: string, row: any) => {
        if (row.status === 'expired') {
          return <span className="text-red-500">{value} (Expirado)</span>;
        }
        if (isExpiringSoon(value)) {
          return <span className="text-yellow-500">{value} (Em breve)</span>;
        }
        return value;
      },
    },
    {
      header: 'Hospedagem',
      accessor: 'hosting',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'active') return <span className="text-green-500">Ativo</span>;
        if (value === 'expired') return <span className="text-red-500">Expirado</span>;
        return value;
      },
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <a 
          href={`https://${row.name}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-violet-400 hover:text-violet-300 transition-colors duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink size={16} />
        </a>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <Nav />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center mb-6">
          <Link href="/tecnology" className="mr-4 text-gray-400 hover:text-violet-400 transition-colors duration-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-white">Domínios e Sites</h1>
        </div>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Adicionar Domínio
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
            placeholder="Pesquisar domínios..."
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

        {/* Domains table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredDomains}
            onRowClick={handleDomainClick}
          />
        </div>
      </div>

      {/* Add Domain Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Adicionar Novo Domínio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Nome do Domínio</label>
              <input
                type="text"
                placeholder="exemplo.com"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Tipo</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="primary">Primário</option>
                <option value="redirect">Redirecionamento</option>
                <option value="blog">Blog</option>
                <option value="application">Aplicação</option>
                <option value="legacy">Legado</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Registrador</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="GoDaddy">GoDaddy</option>
                <option value="Namecheap">Namecheap</option>
                <option value="Cloudflare">Cloudflare</option>
                <option value="Google Domains">Google Domains</option>
                <option value="Other">Outro</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Data de Registro</label>
              <input
                type="date"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Data de Expiração</label>
              <input
                type="date"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Hospedagem</label>
              <select
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              >
                <option value="AWS">AWS</option>
                <option value="DigitalOcean">DigitalOcean</option>
                <option value="Heroku">Heroku</option>
                <option value="Netlify">Netlify</option>
                <option value="Vercel">Vercel</option>
                <option value="None">Nenhuma</option>
                <option value="Other">Outra</option>
              </select>
            </div>
            
            <div className="col-span-full md:col-span-1">
              <label className="text-sm text-gray-400 mb-1 block">Expiração do SSL</label>
              <input
                type="date"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
              />
            </div>
            
            <div className="col-span-full">
              <label className="text-sm text-gray-400 mb-1 block">Nameservers</label>
              <textarea
                placeholder="Um nameserver por linha"
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500 h-24"
              ></textarea>
            </div>
            
            <div className="col-span-full flex items-center gap-2">
              <input
                type="checkbox"
                id="autoRenew"
                className="w-4 h-4 text-violet-600 bg-gray-700 border-gray-600 rounded focus:ring-violet-500"
              />
              <label htmlFor="autoRenew" className="text-white">Renovação Automática</label>
            </div>
            
            <div className="col-span-full flex justify-end mt-2">
              <button
                className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                <Plus size={18} />
                Adicionar
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Domain Details Modal */}
      {showDomainModal && selectedDomain && (
        <Modal onclick={() => setShowDomainModal(false)} isCreate={false} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">{selectedDomain.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Informações Básicas</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-gray-400">Tipo:</span> 
                    {selectedDomain.type === 'primary' && ' Primário'}
                    {selectedDomain.type === 'redirect' && ' Redirecionamento'}
                    {selectedDomain.type === 'blog' && ' Blog'}
                    {selectedDomain.type === 'application' && ' Aplicação'}
                    {selectedDomain.type === 'legacy' && ' Legado'}
                  </p>
                  <p><span className="text-gray-400">Registrador:</span> {selectedDomain.registrar}</p>
                  <p><span className="text-gray-400">Data de Registro:</span> {selectedDomain.registrationDate}</p>
                  <p>
                    <span className="text-gray-400">Data de Expiração:</span> 
                    <span className={`ml-1 ${
                      selectedDomain.status === 'expired' ? 'text-red-500' : 
                      isExpiringSoon(selectedDomain.expirationDate) ? 'text-yellow-500' : 
                      'text-white'
                    }`}>
                      {selectedDomain.expirationDate}
                      {selectedDomain.status === 'expired' && ' (Expirado)'}
                      {selectedDomain.status !== 'expired' && isExpiringSoon(selectedDomain.expirationDate) && ' (Em breve)'}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Renovação Automática:</span> 
                    <span className={selectedDomain.autoRenew ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                      {selectedDomain.autoRenew ? 'Sim' : 'Não'}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Status:</span> 
                    <span className={selectedDomain.status === 'active' ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                      {selectedDomain.status === 'active' ? 'Ativo' : 'Expirado'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-full md:col-span-1">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Configurações Técnicas</h3>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Hospedagem:</span> {selectedDomain.hosting}</p>
                  <p>
                    <span className="text-gray-400">Expiração do SSL:</span> 
                    <span className={`ml-1 ${
                      isSSLExpiringSoon(selectedDomain.sslExpiration) ? 'text-yellow-500' : 
                      new Date(selectedDomain.sslExpiration.split('/').reverse().join('-')) < new Date() ? 'text-red-500' : 
                      'text-white'
                    }`}>
                      {selectedDomain.sslExpiration}
                      {new Date(selectedDomain.sslExpiration.split('/').reverse().join('-')) < new Date() && ' (Expirado)'}
                      {new Date(selectedDomain.sslExpiration.split('/').reverse().join('-')) >= new Date() && isSSLExpiringSoon(selectedDomain.sslExpiration) && ' (Em breve)'}
                    </span>
                  </p>
                  <div>
                    <p className="text-gray-400 mb-1">Nameservers:</p>
                    <ul className="list-disc list-inside text-white">
                      {selectedDomain.nameservers.map((ns: string, index: number) => (
                        <li key={index}>{ns}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Alertas</h3>
                <div className="space-y-2">
                  {selectedDomain.status === 'expired' && (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={18} />
                      <span>Domínio expirado. Renove o domínio para evitar a perda.</span>
                    </div>
                  )}
                  {selectedDomain.status !== 'expired' && isExpiringSoon(selectedDomain.expirationDate) && (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle size={18} />
                      <span>Domínio expira em breve. Considere renovar.</span>
                    </div>
                  )}
                  {isSSLExpiringSoon(selectedDomain.sslExpiration) && (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle size={18} />
                      <span>Certificado SSL expira em breve. Renove o certificado.</span>
                    </div>
                  )}
                  {new Date(selectedDomain.sslExpiration.split('/').reverse().join('-')) < new Date() && (
                    <div className="flex items-center gap-2 text-red-500">
                      <AlertTriangle size={18} />
                      <span>Certificado SSL expirado. Renove o certificado imediatamente.</span>
                    </div>
                  )}
                  {!selectedDomain.autoRenew && selectedDomain.status === 'active' && (
                    <div className="flex items-center gap-2 text-yellow-500">
                      <AlertTriangle size={18} />
                      <span>Renovação automática desativada. Considere ativar para evitar expiração.</span>
                    </div>
                  )}
                  {selectedDomain.status === 'active' && 
                   !isExpiringSoon(selectedDomain.expirationDate) && 
                   new Date(selectedDomain.sslExpiration.split('/').reverse().join('-')) >= new Date() && 
                   !isSSLExpiringSoon(selectedDomain.sslExpiration) && (
                    <div className="flex items-center gap-2 text-green-500">
                      <Calendar size={18} />
                      <span>Nenhum alerta. Domínio e SSL estão em dia.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Ações</h3>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={`https://${selectedDomain.name}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm"
                  >
                    <ExternalLink size={14} />
                    Visitar Site
                  </a>
                  <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    <Globe size={14} />
                    Verificar DNS
                  </button>
                  <button className="flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm">
                    {/* <Lock size={14} /> */}
                    Verificar SSL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}