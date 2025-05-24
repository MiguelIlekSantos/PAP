'use client'

import React from 'react'
import { Pencil } from 'lucide-react'
import { InfoCard } from '@/app/components/InfoCard'

export default function SeetingsPage() {
	return (
		<div className="min-h-screen ml-20 bg-base-300 text-white p-10">
			<h1 className="text-4xl font-bold text-white mb-10 border-b border-violet-900/30 pb-4">
				⚙️ Configurações Gerais
			</h1>

			{/* Seção: Interface e Localização */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Interface e Localização</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Idioma padrão da interface" value="Português (Portugal)" onEdit={() => alert("Editar idioma")} />
					<InfoCard label="Formato de data" value="DD/MM/AAAA" onEdit={() => alert("Editar formato de data")} />
					<InfoCard label="Formato de hora" value="24 horas" onEdit={() => alert("Editar formato de hora")} />
					<InfoCard label="Fuso horário" value="GMT+00:00 (Lisboa)" onEdit={() => alert("Editar fuso horário")} />
					<InfoCard label="Formato de moeda" value="EUR (€)" onEdit={() => alert("Editar formato de moeda")} />
					<InfoCard label="Primeiro dia da semana" value="Segunda-feira" onEdit={() => alert("Editar primeiro dia")} />
				</div>
			</div>

			{/* Seção: Identidade Visual */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Identidade Visual</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{/* Logotipo */}
					<div className="relative bg-[#11161d] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-xl p-5 flex flex-col gap-3 shadow-lg hover:shadow-violet-900/20">
						<span className="text-sm text-violet-400 font-medium">Logotipo da empresa</span>
						<div className="w-full h-32 bg-gray-900 rounded-lg flex items-center justify-center border border-gray-800 hover:border-violet-900/50 transition-all duration-300">
							<span className="text-gray-500 text-sm">[Logotipo exibido aqui]</span>
						</div>
						<button
							onClick={() => alert("Editar logotipo")}
							className="absolute top-3 right-3 text-gray-500 hover:text-violet-300 transition-colors duration-200"
						>
							<Pencil size={18} />
						</button>
					</div>

					{/* Cores da marca */}
					<div className="relative bg-[#11161d] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-xl p-5 flex flex-col gap-3 shadow-lg hover:shadow-violet-900/20">
						<span className="text-sm text-violet-400 font-medium">Cores da marca</span>
						<div className="flex gap-2 mt-2">
							<div className="w-10 h-10 rounded-full bg-violet-600 border border-gray-700"></div>
							<div className="w-10 h-10 rounded-full bg-indigo-600 border border-gray-700"></div>
							<div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700"></div>
							<div className="w-10 h-10 rounded-full bg-white border border-gray-700"></div>
						</div>
						<button
							onClick={() => alert("Editar cores")}
							className="absolute top-3 right-3 text-gray-500 hover:text-violet-300 transition-colors duration-200"
						>
							<Pencil size={18} />
						</button>
					</div>

					<InfoCard label="Tema da interface" value="Dark Mode" onEdit={() => alert("Editar tema")} />
					<InfoCard label="Fonte principal" value="Inter" onEdit={() => alert("Editar fonte")} />
					<InfoCard label="Tamanho de fonte padrão" value="16px" onEdit={() => alert("Editar tamanho")} />
					<InfoCard label="Densidade da interface" value="Compacta" onEdit={() => alert("Editar densidade")} />
				</div>
			</div>

			{/* Seção: Segurança e Autenticação */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Segurança e Autenticação</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Autenticação de dois fatores" value="Ativada" onEdit={() => alert("Editar 2FA")} />
					<InfoCard label="Tempo de expiração da sessão" value="8 horas" onEdit={() => alert("Editar tempo")} />
					<InfoCard label="Política de senhas" value="Mínimo 10 caracteres, letras, números e símbolos" onEdit={() => alert("Editar política")} />
					<InfoCard label="Métodos de login permitidos" value="Email/senha, Google, Microsoft" onEdit={() => alert("Editar métodos")} />
					<InfoCard label="Bloqueio após tentativas" value="5 tentativas" onEdit={() => alert("Editar bloqueio")} />
					<InfoCard label="Renovação de senha" value="A cada 90 dias" onEdit={() => alert("Editar renovação")} />
				</div>
			</div>

			{/* Seção: Notificações */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Notificações</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Notificações por email" value="Ativadas" onEdit={() => alert("Editar notificações email")} />
					<InfoCard label="Notificações no aplicativo" value="Ativadas" onEdit={() => alert("Editar notificações app")} />
					<InfoCard label="Notificações por SMS" value="Desativadas" onEdit={() => alert("Editar notificações SMS")} />
					<InfoCard label="Resumo diário" value="Ativado (18:00)" onEdit={() => alert("Editar resumo")} />
					<InfoCard label="Alertas de segurança" value="Ativados (Alta prioridade)" onEdit={() => alert("Editar alertas")} />
					<InfoCard label="Notificações de tarefas" value="Ativadas (Média prioridade)" onEdit={() => alert("Editar notificações tarefas")} />
				</div>
			</div>

			{/* Seção: Privacidade e Conformidade */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Privacidade e Conformidade</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Política de privacidade" value="Versão 2.3 (Atualizada em 10/05/2023)" onEdit={() => alert("Editar política")} />
					<InfoCard label="Termos de uso" value="Versão 3.1 (Atualizada em 10/05/2023)" onEdit={() => alert("Editar termos")} />
					<InfoCard label="Conformidade RGPD" value="Implementada" onEdit={() => alert("Editar RGPD")} />
					<InfoCard label="Retenção de dados" value="5 anos para dados financeiros, 2 anos para outros" onEdit={() => alert("Editar retenção")} />
					<InfoCard label="Auditoria de acessos" value="Ativada (logs por 180 dias)" onEdit={() => alert("Editar auditoria")} />
					<InfoCard label="Exportação de dados" value="Permitida (formato JSON, CSV)" onEdit={() => alert("Editar exportação")} />
				</div>
			</div>

			{/* Botão para salvar configurações */}
			<div className="mt-8 flex justify-center">
				<button 
					onClick={() => alert("Configurações salvas com sucesso!")}
					className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
				>
					Salvar todas as configurações
				</button>
			</div>
		</div>
	)
}