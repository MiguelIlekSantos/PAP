'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, CheckCircle2, Brain } from 'lucide-react';
import { focusedAnalysisApi } from '../../lib/api/focused-analysis';
import { getAll, getById, ListResponse } from '@/lib/api';
import { useEnterpriseStore } from '@/lib/store/items/enterprise.store';
import {
	FocusedAnalysisRequest, FocusedAnalysisResponse, FOCUS_AREAS, PRIORITY_COLORS, COMPLEXITY_COLORS,
} from '../interfaces/focused-analysis';
import { Projects, Branches, Departments, Campaigns } from '@prisma/client';

export default function AIAnalysisPage() {
	const [selectedFocusArea, setSelectedFocusArea] = useState<string>('');
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingItems, setIsLoadingItems] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [analysisResult, setAnalysisResult] = useState<FocusedAnalysisResponse | null>(null);
	const [activeTab, setActiveTab] = useState<string>('request');

	// Estados para as listas de itens
	const [projects, setProjects] = useState<Projects[]>([]);
	const [branches, setBranches] = useState<Branches[]>([]);
	const [departments, setDepartments] = useState<Departments[]>([]);
	const [campaigns, setCampaigns] = useState<Campaigns[]>([]);

	const { getEnterprise } = useEnterpriseStore();
	const enterpriseId = getEnterprise() || 1;
	const [enterpriseName, setEnterpriseName] = useState<string>('Empresa');

	const selectedFocusAreaOption = FOCUS_AREAS.find(area => area.value === selectedFocusArea);

	// Função para buscar itens baseado no tipo selecionado
	const fetchItems = async (focusArea: string) => {
		setIsLoadingItems(true);
		setError(null);

		try {
			let endpoint = '';
			switch (focusArea) {
				case 'projects':
					endpoint = 'projects';
					break;
				case 'branche':
					endpoint = 'branches';
					break;
				case 'department':
					endpoint = 'departments';
					break;
				case 'campaigns':
					endpoint = 'campaigns';
					break;
				default:
					return;
			}

			const response = await getAll<ListResponse<any>>(endpoint, {
				relationFilter: ["enterpriseId", enterpriseId],
				quantity: 100 // Buscar muitos itens para ter opções
			});

			switch (focusArea) {
				case 'projects':
					setProjects(response.data.items);
					break;
				case 'branche':
					setBranches(response.data.items);
					break;
				case 'department':
					setDepartments(response.data.items);
					break;
				case 'campaigns':
					setCampaigns(response.data.items);
					break;
			}
		} catch (err) {
			console.error('Error fetching items:', err);
			setError('Erro ao carregar os itens. Tente novamente.');
		} finally {
			setIsLoadingItems(false);
		}
	};

	const handleFocusAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newFocusArea = e.target.value;
		setSelectedFocusArea(newFocusArea);
		setSelectedItemId(null);
		setError(null);

		if (newFocusArea) {
			fetchItems(newFocusArea);
		}
	};

	const handleItemChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedItemId(Number(e.target.value));
		setError(null);
	};

	// Função para buscar todas as informações e relações do item selecionado
	const gatherItemData = async (focusArea: string, itemId: number) => {
		try {
			let endpoint = '';
			switch (focusArea) {
				case 'projects':
					endpoint = 'projects';
					break;
				case 'branche':
					endpoint = 'branches';
					break;
				case 'department':
					endpoint = 'departments';
					break;
				case 'campaigns':
					endpoint = 'campaigns';
					break;
				default:
					throw new Error('Tipo de análise não suportado');
			}

			// Fazer requisição para buscar o item com todas as suas relações
			const itemWithRelations = await getById<any>(endpoint, itemId);

			// Retornar todos os dados do item, incluindo relações
			return itemWithRelations;
		} catch (err) {
			console.error('Error gathering item data:', err);
			throw new Error('Erro ao buscar dados do item selecionado');
		}
	};

	const handleSubmit = async () => {
		if (!selectedFocusArea) {
			setError('Por favor, selecione uma área para análise.');
			return;
		}

		if (!selectedItemId) {
			setError('Por favor, selecione um item específico para análise.');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			// Buscar todas as informações e relações do item selecionado
			const itemData = await gatherItemData(selectedFocusArea, selectedItemId);

			console.log('=== DEBUG: Dados coletados ===');
			console.log('selectedFocusArea:', selectedFocusArea);
			console.log('selectedItemId:', selectedItemId);
			console.log('itemData:', JSON.stringify(itemData, null, 2));

			const request: FocusedAnalysisRequest = {
				enterpriseId,
				enterpriseName,
				analysisType: selectedFocusArea as any,
				analysedStructureId: selectedItemId,
				requestData: itemData
			};

			console.log('=== DEBUG: Request sendo enviado ===');
			console.log('request:', JSON.stringify(request, null, 2));

			const response = await focusedAnalysisApi.analyzeFocusArea(request);
			console.log('=== DEBUG: Response recebida ===');
			console.log('response:', JSON.stringify(response, null, 2));
			setAnalysisResult(response);
			setActiveTab('result');
		} catch (err: any) {
			console.error('Error performing analysis:', err);
			const errorMessage = err.message || 'Ocorreu um erro ao realizar a análise. Por favor, tente novamente mais tarde.';
			setError(errorMessage);
		} finally {
			setIsLoading(false);
		}
	};

	const renderAnalysisResult = () => {
		if (!analysisResult) {
			return null;
		}

		return (
			<div className="space-y-8">

				{analysisResult.results?.summary && (
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
							<span className="text-2xl">📋</span>
							Resumo Executivo
						</h3>
						<div className="bg-[#161f2c] rounded-lg p-6 border border-gray-700 hover:border-blue-500/50 transition-colors duration-200">
							<p className="text-gray-200 whitespace-pre-line leading-relaxed text-base">{analysisResult.results.summary}</p>
						</div>
					</div>
				)}

				{analysisResult.results?.insights && analysisResult.results.insights.length > 0 && (
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
							<span className="text-2xl">🔍</span>
							Insights Estratégicos
						</h3>
						<div className="space-y-3">
							{analysisResult.results.insights.map((insight, index) => {
								// Remove asteriscos e traços do início do insight
								const cleanInsight = insight.replace(/^[\*\-\s]+/, '').trim();
								
								// Determinar ícone baseado no conteúdo do insight
								const getInsightIcon = (text: string) => {
									if (text.toLowerCase().includes('risco') || text.toLowerCase().includes('crítica') || text.toLowerCase().includes('falha')) {
										return '⚠️';
									} else if (text.toLowerCase().includes('oportunidade') || text.toLowerCase().includes('melhoria')) {
										return '🚀';
									} else if (text.toLowerCase().includes('dados') || text.toLowerCase().includes('informação')) {
										return '📊';
									} else if (text.toLowerCase().includes('comunicação') || text.toLowerCase().includes('email')) {
										return '📧';
									} else if (text.toLowerCase().includes('eficiência') || text.toLowerCase().includes('colaboração')) {
										return '🤝';
									} else {
										return '💡';
									}
								};
								
								return (
									<div key={index} className="bg-[#161f2c] rounded-lg p-5 border border-gray-700 hover:border-violet-500/50 transition-all duration-200 hover:shadow-lg">
										<div className="flex items-start gap-4">
											<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full flex items-center justify-center text-white text-lg shadow-lg">
												{getInsightIcon(cleanInsight)}
											</div>
											<div className="flex-1">
												<p className="text-gray-200 whitespace-pre-line leading-relaxed">{cleanInsight}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				)}

				{analysisResult.results?.suggestions && analysisResult.results.suggestions.length > 0 &&
					<div>
						<h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
							<span className="text-2xl">🚀</span>
							Sugestões de Melhorias
						</h3>
						<div className="grid gap-4 md:grid-cols-2">
							{analysisResult.results.suggestions.map((suggestion, index) => (
								<div key={index} className="bg-[#161f2c] rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-violet-500/50 transition-all duration-200 hover:shadow-xl">
									<div className="p-5">
										<div className="flex justify-between items-start mb-3">
											<div className="flex items-center gap-2">
												<div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
													💡
												</div>
												<h4 className="text-base font-semibold text-white">{suggestion.title}</h4>
											</div>
											<div className={`px-3 py-1 rounded-full text-xs font-medium ${PRIORITY_COLORS[suggestion.priority]}`}>
												{suggestion.priority === 'high' ? 'Alta' : suggestion.priority === 'medium' ? 'Média' : 'Baixa'}
											</div>
										</div>
										<p className="text-sm text-gray-300 leading-relaxed mb-4">{suggestion.description}</p>
										<div className="flex justify-between items-center pt-3 border-t border-gray-700">
											<div className={`px-3 py-1 rounded-full text-xs font-medium ${COMPLEXITY_COLORS[suggestion.implementationComplexity]}`}>
												Complexidade: {suggestion.implementationComplexity === 'high' ? 'Alta' : suggestion.implementationComplexity === 'medium' ? 'Média' : 'Baixa'}
											</div>
											<div className="text-xs text-gray-400 font-medium">⏱️ {suggestion.estimatedTimeframe}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				}
			</div>
		)
	}


	return (
		<div className="min-h-screen bg-base-300 text-white p-10">
			<div className="flex items-center justify-between border-b border-violet-900/30 pb-4">
				<h1 className="text-4xl font-bold text-white">
					🧠 Análise de IA
				</h1>
			</div>

			<div className="w-full">
				<div className="border-b border-violet-900/30 mb-6">
					<div className="grid grid-cols-2 gap-2">
						<button
							className={`py-2 px-4 text-center font-medium ${activeTab === 'request'
								? 'border-b-2 border-violet-500 text-violet-400'
								: 'text-gray-400 hover:text-gray-300'
								}`}
							onClick={() => setActiveTab('request')}
						>
							Solicitar Análise
						</button>
						<button
							className={`py-2 px-4 text-center font-medium ${activeTab === 'result'
								? 'border-b-2 border-violet-500 text-violet-400'
								: 'text-gray-400 hover:text-gray-300'
								}`}
							onClick={() => setActiveTab('result')}
							disabled={!analysisResult}
						>
							Resultados
						</button>
					</div>
				</div>

				{activeTab === 'request' && (
					<div className="bg-[#161f2c] rounded-lg shadow-md overflow-hidden border border-gray-700">
						<div className="p-6 border-b border-gray-700">
							<h2 className="text-xl font-semibold mb-2 text-white">Nova Análise</h2>
							<p className="text-gray-400">
								Selecione a estrutura e o item específico que deseja analisar. Todas as informações e relações do item serão incluídas na análise.
							</p>
						</div>
						<div className="p-6">
							{error && (
								<div className="bg-red-900/20 border-l-4 border-red-500 p-4 mb-4">
									<div className="flex items-center">
										<AlertCircle className="h-5 w-5 text-red-500 mr-2" />
										<h3 className="text-red-400 font-medium">Erro</h3>
									</div>
									<p className="text-red-400 mt-1">{error}</p>
								</div>
							)}

							<div className="space-y-4">
								<div>
									<label htmlFor="focusArea" className="text-sm font-medium text-gray-300">
										Área para Análise
									</label>
									<select
										id="focusArea"
										value={selectedFocusArea}
										onChange={handleFocusAreaChange}
										className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-700 bg-[#161f2c] text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500transition-colors duration-200 hover:border-violet-400"
									>
										<option value="">Selecione uma estrutura para análise</option>
										{FOCUS_AREAS.map((area) => (
											<option key={area.value} value={area.value}>
												{area.icon} {area.label}
											</option>
										))}
									</select>
								</div>

								{selectedFocusArea && (
									<div>
										<label htmlFor="itemSelect" className="text-sm font-medium text-gray-300">
											Selecione o {selectedFocusAreaOption?.label.slice(0, -1)} específico
										</label>
										<select
											id="itemSelect"
											value={selectedItemId || ''}
											onChange={handleItemChange}
											disabled={isLoadingItems}
											className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-700 bg-[#161f2c] text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500transition-colors duration-200 hover:border-violet-400disabled:opacity-50 disabled:cursor-not-allowed"
										>
											<option value="">
												{isLoadingItems ? 'Carregando...' : `Selecione um ${selectedFocusAreaOption?.label.slice(0, -1).toLowerCase()}`}
											</option>
											{selectedFocusArea === 'projects' && projects.map((project) => (
												<option key={project.id} value={project.id}>
													{project.name}
												</option>
											))}
											{selectedFocusArea === 'branche' && branches.map((branch) => (
												<option key={branch.id} value={branch.id}>
													{branch.address}
												</option>
											))}
											{selectedFocusArea === 'department' && departments.map((department) => (
												<option key={department.id} value={department.id}>
													{department.name}
												</option>
											))}
											{selectedFocusArea === 'campaigns' && campaigns.map((campaign) => (
												<option key={campaign.id} value={campaign.id}>
													{campaign.name}
												</option>
											))}
										</select>
									</div>
								)}

								{selectedFocusAreaOption && selectedItemId && (
									<div className="p-4 bg-violet-900/20 rounded-md border border-violet-800">
										<h3 className="font-medium flex items-center text-white">
											<span className="mr-2">{selectedFocusAreaOption.icon}</span>
											{selectedFocusAreaOption.label}
										</h3>
										<p className="text-sm text-gray-300 mt-1">{selectedFocusAreaOption.description}</p>
										<p className="text-sm text-violet-400 mt-2">
											<Brain className="inline-block mr-2 h-4 w-4" />
											Todas as informações e relações do item selecionado serão incluídas na análise da IA.
										</p>
									</div>
								)}
							</div>
						</div>
						<div className="p-6 bg-gray-800/50 flex justify-end">
							<button
								onClick={handleSubmit}
								disabled={isLoading || !selectedFocusArea || !selectedItemId}
								className="bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{isLoading ? (
									<>
										<Loader2 className="inline mr-2 h-4 w-4 animate-spin" />
										Analisando...
									</>
								) : (
									<>
										<Brain className="h-4 w-4" />
										Realizar Análise
									</>
								)}
							</button>
						</div>
					</div>
				)}

				{activeTab === 'result' && analysisResult && (
					<div className="bg-[#161f2c] rounded-lg shadow-md overflow-hidden border border-gray-700">
						<div className="p-6 border-b border-gray-700">
							<h2 className="text-xl font-semibold mb-2 flex items-center text-white">
								<CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
								Resultados da Análise
							</h2>
							{selectedFocusAreaOption && (
								<p className="text-gray-400">
									Análise de {selectedFocusAreaOption.label.toLowerCase()} concluída
								</p>
							)}
						</div>
						<div className="p-6">
							{renderAnalysisResult()}
						</div>
						<div className="p-6 bg-gray-800/50 flex justify-end">
							<button onClick={() => setActiveTab('request')} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 mr-2">
								Nova Análise
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}