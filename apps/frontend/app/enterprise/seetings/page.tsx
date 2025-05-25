'use client'

import React from 'react'
import { InfoCard, Option } from '@/app/components/InfoCard'

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
					<InfoCard label="Idioma padrão da interface" value="Português (Portugal)" isSelectable={true}>
						<Option value="Português (Brasil)" selected/>
					</InfoCard>
					<InfoCard label="Formato de data" value="DD/MM/AAAA" isSelectable={true}>
						<Option value="DD/MM/AAAA" selected />
						<Option value="MM/DD/AAAA" />
						<Option value="AAAA-MM-DD" />
						<Option value="DD.MM.AAAA" />
					</InfoCard>
					<InfoCard label="Formato de hora" value="24 horas" isSelectable={true}>
						<Option value="24 horas" selected />
						<Option value="12 horas (AM/PM)" />
					</InfoCard>
					<InfoCard label="Fuso horário" value="GMT+00:00 (Lisboa)" isSelectable={true}>
						<Option value="GMT+00:00 (Lisboa)" selected />
						<Option value="GMT+01:00 (Berlin, Paris)" />
						<Option value="GMT-03:00 (São Paulo)" />
						<Option value="GMT-05:00 (New York)" />
						<Option value="GMT-08:00 (Los Angeles)" />
						<Option value="GMT+01:00 (London)" />
						<Option value="GMT+08:00 (Singapore)" />
						<Option value="GMT+09:00 (Tokyo)" />
					</InfoCard>
					<InfoCard label="Formato de moeda" value="EUR (€)" isSelectable={true}>
						<Option value="EUR (€)" selected />
						<Option value="USD ($)" />
						<Option value="GBP (£)" />
						<Option value="BRL (R$)" />
						<Option value="JPY (¥)" />
						<Option value="CNY (¥)" />
					</InfoCard>
					<InfoCard label="Primeiro dia da semana" value="Segunda-feira" isSelectable={true}>
						<Option value="Segunda-feira" selected />
						<Option value="Domingo" />
						<Option value="Sábado" />
					</InfoCard>
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
					</div>
				</div>
			</div>

			{/* Seção: Segurança e Autenticação */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Segurança e Autenticação</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Autenticação de dois fatores" value="Ativada" isSelectable={true}>
						<Option value="Ativada" selected />
						<Option value="Desativada" />
					</InfoCard>
					<InfoCard label="Tempo de expiração da sessão" value="8 horas" isSelectable={true}>
						<Option value="1 hora" />
						<Option value="4 horas" />
						<Option value="8 horas" selected />
						<Option value="24 horas" />
						<Option value="7 dias" />
					</InfoCard>
					<InfoCard label="Política de senhas" value="Mínimo 10 caracteres, letras, números e símbolos" isSelectable={true}>
						<Option value="Mínimo 8 caracteres" />
						<Option value="Mínimo 10 caracteres, letras, números e símbolos" selected />
						<Option value="Mínimo 12 caracteres, letras maiúsculas, minúsculas, números e símbolos" />
					</InfoCard>
					<InfoCard label="Métodos de login permitidos" value="Email/senha, Google, Microsoft" isSelectable={true}>
						<Option value="Apenas Email/senha" />
						<Option value="Email/senha, Google" />
						<Option value="Email/senha, Google, Microsoft" selected />
						<Option value="Email/senha, Google, Microsoft, Apple" />
					</InfoCard>
					<InfoCard label="Bloqueio após tentativas" value="5 tentativas" isSelectable={true}>
						<Option value="3 tentativas" />
						<Option value="5 tentativas" selected />
						<Option value="10 tentativas" />
					</InfoCard>
					<InfoCard label="Renovação de senha" value="A cada 90 dias" isSelectable={true}>
						<Option value="A cada 30 dias" />
						<Option value="A cada 60 dias" />
						<Option value="A cada 90 dias" selected />
						<Option value="A cada 180 dias" />
						<Option value="Nunca" />
					</InfoCard>
				</div>
			</div>

			{/* Seção: Notificações */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Notificações</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Notificações por email" value="Ativadas" isSelectable={true}>
						<Option value="Ativadas" selected />
						<Option value="Desativadas" />
					</InfoCard>
					<InfoCard label="Notificações no aplicativo" value="Ativadas" isSelectable={true}>
						<Option value="Ativadas" selected />
						<Option value="Desativadas" />
					</InfoCard>
					<InfoCard label="Notificações por SMS" value="Desativadas" isSelectable={true}>
						<Option value="Ativadas" />
						<Option value="Desativadas" selected />
					</InfoCard>
					<InfoCard label="Resumo diário" value="Ativado (18:00)" isSelectable={true}>
						<Option value="Desativado" />
						<Option value="Ativado (9:00)" />
						<Option value="Ativado (12:00)" />
						<Option value="Ativado (18:00)" selected />
					</InfoCard>
					<InfoCard label="Alertas de segurança" value="Ativados (Alta prioridade)" isSelectable={true}>
						<Option value="Desativados" />
						<Option value="Ativados (Baixa prioridade)" />
						<Option value="Ativados (Média prioridade)" />
						<Option value="Ativados (Alta prioridade)" selected />
					</InfoCard>
					<InfoCard label="Notificações de tarefas" value="Ativadas (Média prioridade)" isSelectable={true}>
						<Option value="Desativadas" />
						<Option value="Ativadas (Baixa prioridade)" />
						<Option value="Ativadas (Média prioridade)" selected />
						<Option value="Ativadas (Alta prioridade)" />
					</InfoCard>
				</div>
			</div>

			{/* Seção: Privacidade e Conformidade */}
			<div className="mb-12">
				<h2 className="text-2xl font-semibold text-violet-400 mb-6">Privacidade e Conformidade</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					<InfoCard label="Política de privacidade" value="Versão 2.3 (Atualizada em 10/05/2023)" />
					<InfoCard label="Termos de uso" value="Versão 3.1 (Atualizada em 10/05/2023)" />
					<InfoCard label="Conformidade RGPD" value="Implementada" isSelectable={true}>
						<Option value="Implementada" selected />
						<Option value="Em implementação" />
						<Option value="Não implementada" />
					</InfoCard>
					<InfoCard label="Retenção de dados" value="5 anos para dados financeiros, 2 anos para outros" isSelectable={true}>
						<Option value="3 anos para dados financeiros, 1 ano para outros" />
						<Option value="5 anos para dados financeiros, 2 anos para outros" selected />
						<Option value="7 anos para dados financeiros, 3 anos para outros" />
					</InfoCard>
					<InfoCard label="Auditoria de acessos" value="Ativada (logs por 180 dias)" isSelectable={true}>
						<Option value="Desativada" />
						<Option value="Ativada (logs por 90 dias)" />
						<Option value="Ativada (logs por 180 dias)" selected />
						<Option value="Ativada (logs por 365 dias)" />
					</InfoCard>
					<InfoCard label="Exportação de dados" value="Permitida (formato JSON, CSV)" isSelectable={true}>
						<Option value="Não permitida" />
						<Option value="Permitida (formato JSON)" />
						<Option value="Permitida (formato CSV)" />
						<Option value="Permitida (formato JSON, CSV)" selected />
						<Option value="Permitida (formato JSON, CSV, XML)" />
					</InfoCard>
				</div>
			</div>

			{/* Botão para salvar configurações */}
			<div className="mt-8 flex justify-center">
				<button 
					className="bg-violet-700 hover:bg-violet-600 text-white px-6 py-3 rounded-lg transition-all duration-300"
				>
					Salvar todas as configurações
				</button>
			</div>
		</div>
	)
}
