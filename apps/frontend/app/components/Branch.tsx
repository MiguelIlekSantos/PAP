import React from 'react'
import { InfoCard } from './InfoCard'
import { BranchDepartmentsList } from './BranchDepartmentsList'

type BranchProps = {
    id?: string
    name: string
    address: string
    manager: string
    contact: {
        phone: string
        email: string
    }
    function: string
    departments?: {
        id: string
        name: string
        manager: string
        employeeCount: number
    }[]
}

export const Branch = ({ 
    id, 
    name, 
    address, 
    manager, 
    contact, 
    function: branchFunction,
    departments = [] 
}: BranchProps) => {
    return (
        <div className="bg-[#11161d] border border-gray-800 hover:border-violet-700 rounded-xl p-6 shadow-lg transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-violet-400">{name}</h2>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-6">
                <InfoCard label="Nome da filial" value={name} />
                <InfoCard label="Endereço completo" value={address} />
                <InfoCard label="Responsável local" value={manager} />
                <InfoCard label="Telefone" value={contact.phone} />
                <InfoCard label="Email de contato" value={contact.email} isEmail />
                <InfoCard label="Função da unidade" value={branchFunction} />
            </div>
            
            {/* Lista de departamentos na filial */}
            <div className="mt-6">
                <BranchDepartmentsList departments={departments} />
            </div>
        </div>
    )
}