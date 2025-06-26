import React from 'react'
import { InfoCard } from './InfoCard'
import { BranchDepartmentsList } from './BranchDepartmentsList'

type BranchProps = {
    id?: number
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
    }[],
    setDptModal: () => void
}

export const Branch = (props: BranchProps) => {
    const dpts = props.departments || []

    return (
        <div className="bg-[#11161d] border border-gray-800 hover:border-violet-700 rounded-xl p-6 shadow-lg transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-violet-400">{props.name}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
                <InfoCard module="branches" name='address' label="Endereço completo" value={props.address} />
                <InfoCard module="branches" name='phone' label="Telefone" value={props.contact.phone} />
                <InfoCard module="branches" name='email' label="Email de contato" value={props.contact.email} isEmail />
                <InfoCard module="branches" name='purpose' label="Função da unidade" value={props.function} />
            </div>

            {/* Lista de departamentos na filial */}
            <div className="mt-6">
                <BranchDepartmentsList departments={dpts} setDptModal={props.setDptModal}/>
            </div>
        </div>
    )
}