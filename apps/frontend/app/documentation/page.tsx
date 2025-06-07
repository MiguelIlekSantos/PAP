'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../components/SlideFrame'
import { Nav } from '../components/Nav'
import { DrawerMenu } from '../components/DrawerMenu'
import { Table } from '../components/Table'
import { Modal } from '../components/Modal'
import { Plus, Search, FileText, Download, Eye, Edit } from 'lucide-react'
import { DocumentationTabs } from '../data/tabs'

// Mock data for documents
const mockDocuments = [
  {
    id: '1',
    title: 'Manual do Utilizador - Sistema ERP',
    type: 'Manual',
    category: 'Sistema',
    version: '2.1',
    lastModified: '15/03/2024',
    author: 'João Silva',
    status: 'published',
    size: '2.5 MB',
    downloads: 156,
  },
  {
    id: '2',
    title: 'Política de Segurança da Informação',
    type: 'Política',
    category: 'Segurança',
    version: '1.3',
    lastModified: '10/03/2024',
    author: 'Maria Santos',
    status: 'published',
    size: '1.2 MB',
    downloads: 89,
  },
  {
    id: '3',
    title: 'Procedimento de Backup e Recuperação',
    type: 'Procedimento',
    category: 'TI',
    version: '1.0',
    lastModified: '05/03/2024',
    author: 'Carlos Oliveira',
    status: 'draft',
    size: '800 KB',
    downloads: 0,
  },
  {
    id: '4',
    title: 'Contrato Padrão de Fornecimento',
    type: 'Contrato',
    category: 'Legal',
    version: '3.2',
    lastModified: '01/03/2024',
    author: 'Ana Costa',
    status: 'published',
    size: '1.8 MB',
    downloads: 234,
  },
  {
    id: '5',
    title: 'Manual de Onboarding de Funcionários',
    type: 'Manual',
    category: 'RH',
    version: '2.0',
    lastModified: '28/02/2024',
    author: 'Pedro Ferreira',
    status: 'review',
    size: '3.1 MB',
    downloads: 67,
  },
];

export default function DocumentationPage() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter documents based on search term
  const filteredDocuments = searchTerm
    ? documents.filter(
        (document) =>
          document.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          document.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          document.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          document.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : documents;

  // Calculate stats
  const totalDocuments = filteredDocuments.length;
  const publishedDocuments = filteredDocuments.filter(d => d.status === 'published').length;
  const draftDocuments = filteredDocuments.filter(d => d.status === 'draft').length;
  const totalDownloads = filteredDocuments.reduce((sum, d) => sum + d.downloads, 0);

  // Table columns
  const columns = [
    {
      header: 'Título',
      accessor: 'title',
    },
    {
      header: 'Tipo',
      accessor: 'type',
    },
    {
      header: 'Categoria',
      accessor: 'category',
    },
    {
      header: 'Versão',
      accessor: 'version',
    },
    {
      header: 'Autor',
      accessor: 'author',
    },
    {
      header: 'Última Modificação',
      accessor: 'lastModified',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => {
        if (value === 'published') return <span className="text-green-500">Publicado</span>;
        if (value === 'draft') return <span className="text-yellow-500">Rascunho</span>;
        if (value === 'review') return <span className="text-blue-500">Em Revisão</span>;
        if (value === 'archived') return <span className="text-gray-500">Arquivado</span>;
        return value;
      },
    },
    {
      header: 'Downloads',
      accessor: 'downloads',
    },
    {
      header: 'Ações',
      accessor: 'id',
      cell: (value: string, row: any) => (
        <div className="flex gap-2">
          <button className="text-blue-400 hover:text-blue-300" title="Visualizar">
            <Eye size={16} />
          </button>
          <button className="text-green-400 hover:text-green-300" title="Download">
            <Download size={16} />
          </button>
          <button className="text-yellow-400 hover:text-yellow-300" title="Editar">
            <Edit size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DrawerMenu tabs={DocumentationTabs} page="/documentation" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Dashboard de Documentação</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
          >
            <Plus size={18} />
            Novo Documento
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-violet-400" />
              <h3 className="text-gray-400 text-sm">Total de Documentos</h3>
            </div>
            <p className="text-white text-2xl font-bold">{totalDocuments}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-green-400" />
              <h3 className="text-gray-400 text-sm">Publicados</h3>
            </div>
            <p className="text-green-500 text-2xl font-bold">{publishedDocuments}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={20} className="text-yellow-400" />
              <h3 className="text-gray-400 text-sm">Rascunhos</h3>
            </div>
            <p className="text-yellow-500 text-2xl font-bold">{draftDocuments}</p>
          </div>
          
          <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Download size={20} className="text-blue-400" />
              <h3 className="text-gray-400 text-sm">Total Downloads</h3>
            </div>
            <p className="text-blue-500 text-2xl font-bold">{totalDownloads}</p>
          </div>
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
            placeholder="Pesquisar documentos..."
            className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
          />
        </div>



        {/* Documents table */}
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-md">
          <Table
            columns={columns}
            data={filteredDocuments}
            onRowClick={(row) => console.log('Row clicked:', row)}
          />
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Novo Documento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form fields would go here */}
            <p className="text-gray-400 col-span-full">Formulário para adicionar novo documento</p>
          </div>
        </Modal>
      )}
    </>
  );
}