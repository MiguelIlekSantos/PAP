'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Search, Edit, Trash2, Eye, Calendar, Users, Heart, MessageCircle, Share, TrendingUp, BarChart3, Instagram, Facebook, Twitter, Linkedin, Youtube, ArrowLeft } from 'lucide-react'
import { SlideFrame } from '../../components/SlideFrame'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import Link from 'next/link'

// Mock data for social media posts
const mockPosts = [
  {
    id: '1',
    platform: 'Instagram',
    content: 'Novos laptops Dell XPS chegaram! 💻✨ Perfeitos para trabalho e criatividade. #TechLife #Dell #Laptops',
    image: '/images/laptop-post.jpg',
    scheduledDate: '2024-02-15',
    publishedDate: '2024-02-15',
    status: 'published',
    engagement: {
      likes: 245,
      comments: 18,
      shares: 12,
      reach: 3420
    },
    author: 'Maria Silva',
    campaign: 'Lançamento Dell XPS'
  },
  {
    id: '2',
    platform: 'Facebook',
    content: 'Está procurando o monitor perfeito para o seu setup? 🖥️ Confira nossa seleção de monitores 4K com preços especiais!',
    image: '/images/monitor-post.jpg',
    scheduledDate: '2024-02-16',
    publishedDate: null,
    status: 'scheduled',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    author: 'João Santos',
    campaign: 'Promoção Monitores'
  },
  {
    id: '3',
    platform: 'LinkedIn',
    content: 'Como a tecnologia está transformando o ambiente de trabalho moderno. Descubra as últimas tendências em equipamentos corporativos.',
    image: '/images/office-tech.jpg',
    scheduledDate: '2024-02-14',
    publishedDate: '2024-02-14',
    status: 'published',
    engagement: {
      likes: 89,
      comments: 24,
      shares: 31,
      reach: 1850
    },
    author: 'Ana Costa',
    campaign: 'Conteúdo Educativo'
  },
  {
    id: '4',
    platform: 'Twitter',
    content: '🚀 FLASH SALE! Placas gráficas NVIDIA com até 25% de desconto. Apenas hoje! #Gaming #NVIDIA #Sale',
    image: '/images/gpu-sale.jpg',
    scheduledDate: '2024-02-17',
    publishedDate: null,
    status: 'draft',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    author: 'Pedro Oliveira',
    campaign: 'Flash Sale GPU'
  },
  {
    id: '5',
    platform: 'Instagram',
    content: 'Setup gamer completo! 🎮 Mouse, teclado e headset para uma experiência de jogo incrível. #Gaming #Setup #Gamer',
    image: '/images/gaming-setup.jpg',
    scheduledDate: '2024-02-13',
    publishedDate: '2024-02-13',
    status: 'published',
    engagement: {
      likes: 412,
      comments: 35,
      shares: 28,
      reach: 5240
    },
    author: 'Carlos Mendes',
    campaign: 'Gaming Week'
  },
  {
    id: '6',
    platform: 'YouTube',
    content: 'Unboxing e review completo do novo MacBook Pro M3. Vale a pena o investimento? Assista e descubra!',
    image: '/images/macbook-review.jpg',
    scheduledDate: '2024-02-18',
    publishedDate: null,
    status: 'scheduled',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    author: 'Tech Reviewer',
    campaign: 'Reviews de Produtos'
  },
  {
    id: '7',
    platform: 'Facebook',
    content: 'Dicas essenciais para manter seu computador sempre rápido e seguro. Confira nosso guia completo! 🔧💻',
    image: '/images/pc-maintenance.jpg',
    scheduledDate: '2024-02-12',
    publishedDate: '2024-02-12',
    status: 'published',
    engagement: {
      likes: 156,
      comments: 42,
      shares: 67,
      reach: 2890
    },
    author: 'Suporte Técnico',
    campaign: 'Dicas Técnicas'
  },
  {
    id: '8',
    platform: 'LinkedIn',
    content: 'A importância da segurança cibernética nas empresas modernas. Como proteger seus dados e sistemas.',
    image: '/images/cybersecurity.jpg',
    scheduledDate: '2024-02-19',
    publishedDate: null,
    status: 'scheduled',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    author: 'Especialista em Segurança',
    campaign: 'Segurança Digital'
  },
  {
    id: '9',
    platform: 'Instagram',
    content: 'Workspace inspiration! ✨ Organize seu espaço de trabalho com nossos acessórios premium. #Workspace #Productivity',
    image: '/images/workspace.jpg',
    scheduledDate: '2024-02-11',
    publishedDate: '2024-02-11',
    status: 'published',
    engagement: {
      likes: 298,
      comments: 21,
      shares: 15,
      reach: 4100
    },
    author: 'Design Team',
    campaign: 'Workspace Goals'
  },
  {
    id: '10',
    platform: 'Twitter',
    content: 'Novidade! 📱 Smartphones Samsung Galaxy S24 já disponíveis. Tecnologia de ponta ao seu alcance. #Samsung #Smartphone',
    image: '/images/samsung-s24.jpg',
    scheduledDate: '2024-02-20',
    publishedDate: null,
    status: 'draft',
    engagement: {
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    author: 'Mobile Team',
    campaign: 'Lançamento Samsung'
  }
];

// Mock data for social media accounts
const mockAccounts = [
  {
    id: '1',
    platform: 'Instagram',
    username: '@techstore_pt',
    followers: 15420,
    following: 892,
    posts: 1247,
    engagement_rate: 4.2,
    status: 'active'
  },
  {
    id: '2',
    platform: 'Facebook',
    username: 'TechStore Portugal',
    followers: 8930,
    following: 245,
    posts: 892,
    engagement_rate: 3.8,
    status: 'active'
  },
  {
    id: '3',
    platform: 'LinkedIn',
    username: 'TechStore Business',
    followers: 5240,
    following: 1200,
    posts: 456,
    engagement_rate: 5.1,
    status: 'active'
  },
  {
    id: '4',
    platform: 'Twitter',
    username: '@techstore_news',
    followers: 12800,
    following: 1500,
    posts: 2340,
    engagement_rate: 2.9,
    status: 'active'
  },
  {
    id: '5',
    platform: 'YouTube',
    username: 'TechStore Reviews',
    followers: 3450,
    following: 89,
    posts: 124,
    engagement_rate: 6.7,
    status: 'active'
  }
];

// Filter fields
const filterFields = [
  {
    name: 'platform',
    label: 'Plataforma',
    type: 'select' as const,
    options: [
      { label: 'Instagram', value: 'Instagram' },
      { label: 'Facebook', value: 'Facebook' },
      { label: 'LinkedIn', value: 'LinkedIn' },
      { label: 'Twitter', value: 'Twitter' },
      { label: 'YouTube', value: 'YouTube' },
    ],
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select' as const,
    options: [
      { label: 'Publicado', value: 'published' },
      { label: 'Agendado', value: 'scheduled' },
      { label: 'Rascunho', value: 'draft' },
    ],
  },
  {
    name: 'author',
    label: 'Autor',
    type: 'select' as const,
    options: [
      { label: 'Maria Silva', value: 'Maria Silva' },
      { label: 'João Santos', value: 'João Santos' },
      { label: 'Ana Costa', value: 'Ana Costa' },
      { label: 'Pedro Oliveira', value: 'Pedro Oliveira' },
      { label: 'Carlos Mendes', value: 'Carlos Mendes' },
      { label: 'Tech Reviewer', value: 'Tech Reviewer' },
      { label: 'Suporte Técnico', value: 'Suporte Técnico' },
      { label: 'Especialista em Segurança', value: 'Especialista em Segurança' },
      { label: 'Design Team', value: 'Design Team' },
      { label: 'Mobile Team', value: 'Mobile Team' },
    ],
  },
];

// Status colors
const STATUS_COLORS = {
  published: 'bg-green-600 text-green-100',
  scheduled: 'bg-blue-600 text-blue-100',
  draft: 'bg-gray-600 text-gray-100',
};

// Platform icons and colors
const PLATFORM_CONFIG = {
  Instagram: { icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500' },
  Facebook: { icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600' },
  LinkedIn: { icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700' },
  Twitter: { icon: Twitter, color: 'text-sky-500', bg: 'bg-sky-500' },
  YouTube: { icon: Youtube, color: 'text-red-600', bg: 'bg-red-600' },
};

export default function SocialMediaPage() {
  const [posts, setPosts] = useState(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState(mockPosts);
  const [filterValues, setFilterValues] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('posts');

  // Apply filters when search term or filter values change
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterValues]);

  // Handle filter change
  const handleFilterChange = (name: string, value: any) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...posts];

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.content.toLowerCase().includes(term) ||
          post.platform.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term) ||
          post.campaign.toLowerCase().includes(term)
      );
    }

    // Apply other filters
    Object.entries(filterValues).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((post) => {
          if (typeof post[key as keyof typeof post] === 'string') {
            return (post[key as keyof typeof post] as string).toLowerCase() === value.toLowerCase();
          }
          return post[key as keyof typeof post] === value;
        });
      }
    });

    setFilteredPosts(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterValues({});
    setSearchTerm('');
    setFilteredPosts(posts);
  };

  // Handle post click
  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  // Calculate summary statistics
  const totalPosts = filteredPosts.length;
  const publishedPosts = filteredPosts.filter(p => p.status === 'published').length;
  const scheduledPosts = filteredPosts.filter(p => p.status === 'scheduled').length;
  const totalEngagement = filteredPosts.reduce((sum, post) => sum + post.engagement.likes + post.engagement.comments + post.engagement.shares, 0);
  const totalReach = filteredPosts.reduce((sum, post) => sum + post.engagement.reach, 0);

  // Table columns for posts
  const postsColumns = [
    {
      header: 'Plataforma',
      accessor: 'platform',
      cell: (value: string) => {
        const config = PLATFORM_CONFIG[value as keyof typeof PLATFORM_CONFIG];
        const IconComponent = config.icon;
        return (
          <div className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${config.color}`} />
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      header: 'Conteúdo',
      accessor: 'content',
      cell: (value: string) => (
        <div className="max-w-xs">
          <p className="truncate text-gray-300">{value}</p>
        </div>
      ),
    },
    {
      header: 'Autor',
      accessor: 'author',
    },
    {
      header: 'Campanha',
      accessor: 'campaign',
      cell: (value: string) => (
        <span className="px-2 py-1 bg-violet-600 text-violet-100 rounded-full text-xs">{value}</span>
      ),
    },
    {
      header: 'Data',
      accessor: 'scheduledDate',
      cell: (value: string) => new Date(value).toLocaleDateString('pt-PT'),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[value as keyof typeof STATUS_COLORS]}`}>
          {value === 'published' ? 'Publicado' :
           value === 'scheduled' ? 'Agendado' :
           'Rascunho'}
        </span>
      ),
    },
    {
      header: 'Engajamento',
      accessor: 'engagement',
      cell: (value: any) => (
        <div className="flex items-center gap-1 text-sm">
          <Heart className="w-4 h-4 text-red-500" />
          <span>{value.likes}</span>
          <MessageCircle className="w-4 h-4 text-blue-500 ml-2" />
          <span>{value.comments}</span>
        </div>
      ),
    },
  ];

  // Table columns for accounts
  const accountsColumns = [
    {
      header: 'Plataforma',
      accessor: 'platform',
      cell: (value: string) => {
        const config = PLATFORM_CONFIG[value as keyof typeof PLATFORM_CONFIG];
        const IconComponent = config.icon;
        return (
          <div className="flex items-center gap-2">
            <IconComponent className={`w-5 h-5 ${config.color}`} />
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      header: 'Username',
      accessor: 'username',
      cell: (value: string) => (
        <span className="font-mono text-violet-400">{value}</span>
      ),
    },
    {
      header: 'Seguidores',
      accessor: 'followers',
      cell: (value: number) => (
        <span className="font-semibold text-green-400">{value.toLocaleString('pt-PT')}</span>
      ),
    },
    {
      header: 'Posts',
      accessor: 'posts',
      cell: (value: number) => value.toLocaleString('pt-PT'),
    },
    {
      header: 'Taxa de Engajamento',
      accessor: 'engagement_rate',
      cell: (value: number) => (
        <span className="font-semibold text-blue-400">{value}%</span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value: string) => (
        <span className="px-2 py-1 bg-green-600 text-green-100 rounded-full text-xs font-medium">
          {value === 'active' ? 'Ativo' : 'Inativo'}
        </span>
      ),
    },
  ];

  return (
    <>
      <SlideFrame />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/marketing" className="text-gray-400 hover:text-violet-400 transition-colors duration-200">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Social Media</h1>
              <p className="text-gray-400">Gestão de conteúdo e contas de redes sociais</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all duration-200">
              <BarChart3 size={18} />
              Relatórios
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200"
            >
              <Plus size={18} />
              Novo Post
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'posts' 
                ? 'bg-violet-700 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('accounts')}
            className={`px-4 py-2 rounded-md transition-all duration-200 ${
              activeTab === 'accounts' 
                ? 'bg-violet-700 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Contas
          </button>
        </div>

        {activeTab === 'posts' && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total de Posts</p>
                    <p className="text-2xl font-bold text-white">{totalPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Publicados</p>
                    <p className="text-2xl font-bold text-green-400">{publishedPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Agendados</p>
                    <p className="text-2xl font-bold text-blue-400">{scheduledPosts}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Engajamento</p>
                    <p className="text-2xl font-bold text-purple-400">{totalEngagement.toLocaleString('pt-PT')}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Alcance</p>
                    <p className="text-2xl font-bold text-orange-400">{totalReach.toLocaleString('pt-PT')}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
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
                placeholder="Pesquisar por conteúdo, plataforma, autor ou campanha..."
                className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-3 pl-10 pr-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
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

            {/* Posts table */}
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-lg">
              {filteredPosts.length > 0 ? (
                <Table
                  columns={postsColumns}
                  data={filteredPosts}
                  onRowClick={handlePostClick}
                />
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                  <p className="text-lg mb-2">Nenhum post encontrado</p>
                  <p className="text-sm">Tente ajustar os filtros ou criar um novo post</p>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'accounts' && (
          <>
            {/* Accounts Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total de Contas</p>
                    <p className="text-2xl font-bold text-white">{mockAccounts.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Seguidores</p>
                    <p className="text-2xl font-bold text-green-400">
                      {mockAccounts.reduce((sum, acc) => sum + acc.followers, 0).toLocaleString('pt-PT')}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Posts</p>
                    <p className="text-2xl font-bold text-purple-400">
                      {mockAccounts.reduce((sum, acc) => sum + acc.posts, 0).toLocaleString('pt-PT')}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Engajamento Médio</p>
                    <p className="text-2xl font-bold text-orange-400">
                      {(mockAccounts.reduce((sum, acc) => sum + acc.engagement_rate, 0) / mockAccounts.length).toFixed(1)}%
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Accounts table */}
            <div className="bg-[#0d1218] border border-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Table
                columns={accountsColumns}
                data={mockAccounts}
                onRowClick={() => {}}
              />
            </div>
          </>
        )}
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <Modal onclick={() => setShowAddModal(false)} isCreate={true} isLarge={true}>
          <h2 className="text-xl font-bold mb-4">Novo Post</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-400 col-span-full">Formulário de criação de novo post</p>
          </div>
        </Modal>
      )}

      {/* Post Details Modal */}
      {showPostModal && selectedPost && (
        <Modal onclick={() => setShowPostModal(false)} isCreate={false} isLarge={true}>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const config = PLATFORM_CONFIG[selectedPost.platform as keyof typeof PLATFORM_CONFIG];
                  const IconComponent = config.icon;
                  return <IconComponent className={`w-6 h-6 ${config.color}`} />;
                })()}
                <h2 className="text-2xl font-bold text-white">{selectedPost.platform}</h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[selectedPost.status as keyof typeof STATUS_COLORS]}`}>
                  {selectedPost.status === 'published' ? 'Publicado' :
                   selectedPost.status === 'scheduled' ? 'Agendado' :
                   'Rascunho'}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-700 hover:bg-red-600 rounded-md transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Conteúdo</h3>
                <p className="text-gray-300 mb-4">{selectedPost.content}</p>
                <div className="space-y-2">
                  <p><span className="text-gray-400">Autor:</span> <span className="text-white">{selectedPost.author}</span></p>
                  <p><span className="text-gray-400">Campanha:</span> <span className="text-violet-400">{selectedPost.campaign}</span></p>
                  <p><span className="text-gray-400">Data Agendada:</span> <span className="text-white">{new Date(selectedPost.scheduledDate).toLocaleDateString('pt-PT')}</span></p>
                  {selectedPost.publishedDate && (
                    <p><span className="text-gray-400">Data de Publicação:</span> <span className="text-white">{new Date(selectedPost.publishedDate).toLocaleDateString('pt-PT')}</span></p>
                  )}
                </div>
              </div>

              <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-4">
                <h3 className="text-violet-400 font-medium mb-3">Métricas de Engajamento</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-gray-400">Curtidas</span>
                    </div>
                    <span className="text-white font-semibold">{selectedPost.engagement.likes.toLocaleString('pt-PT')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-400">Comentários</span>
                    </div>
                    <span className="text-white font-semibold">{selectedPost.engagement.comments.toLocaleString('pt-PT')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share className="w-5 h-5 text-green-500" />
                      <span className="text-gray-400">Compartilhamentos</span>
                    </div>
                    <span className="text-white font-semibold">{selectedPost.engagement.shares.toLocaleString('pt-PT')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-400">Alcance</span>
                    </div>
                    <span className="text-white font-semibold">{selectedPost.engagement.reach.toLocaleString('pt-PT')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}