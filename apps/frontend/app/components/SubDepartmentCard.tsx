import React from 'react';
import { ArrowRight, Users, DollarSign, MapPin, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { InfoCard, Option } from './InfoCard';

type SubDepartmentCardProps = {
	id: number;
	name: string;
	manager: string;
	employeeCount: number;
	description: string;
	departmentName?: string;
	departmentId: number;
	departmentOptions: Array<{ value: number; label: string }>;
	onDelete?: (subDepartmentId: number) => void;
};

export const SubDepartmentCard = (props: SubDepartmentCardProps) => {

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Evita que o clique se propague para elementos pai
		if (props.onDelete) {
			props.onDelete(props.id);
		}
	};

	return (
		<div className="bg-[#11161d] border border-gray-800 rounded-xl p-5 shadow-lg transition-all duration-300 relative">
			{/* Botão de deletar no canto superior direito */}
			{props.onDelete && (
				<button
					onClick={handleDeleteClick}
					className="absolute top-3 right-3 p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-all duration-200"
					title="Deletar subdepartamento"
				>
					<Trash2 size={16} />
				</button>
			)}

			<div className='mt-7'></div>

			<InfoCard elementId={props.id} module="subdepartments" name='name' label="Name" value={props.name} />
			<InfoCard elementId={props.id} module="subdepartments" name='responsible' label="Responsible" value={props.manager} />
			<InfoCard elementId={props.id} module="subdepartments" name='totalEmployees' label="Total employees" value={props.employeeCount.toString()} />
			<InfoCard elementId={props.id} module="subdepartments" name='description' label="Description" value={props.description} />
			<InfoCard 
				elementId={props.id} 
				module="subdepartments" 
				name='departmentId' 
				label="Department" 
				value={props.departmentId.toString()} 
				displayValue={props.departmentName}
				isSelectable={true}
			>
				{props.departmentOptions.map((option) => (
					<Option key={option.value} value={option.value.toString()} selected={option.value === props.departmentId}>
						{option.label}
					</Option>
				))}
			</InfoCard>
		</div>
	);
};