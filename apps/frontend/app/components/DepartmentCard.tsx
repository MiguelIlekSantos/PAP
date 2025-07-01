import React from 'react';
import { ArrowRight, Users, DollarSign, MapPin, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { InfoCard } from './InfoCard';

type DepartmentCardProps = {
	id: number;
	name: string;
	manager: string;
	employeeCount: number;
	description: string;
	onClick: (departmentId: number) => void;
	onDelete?: (departmentId: number) => void;
};

export const DepartmentCard = (props: DepartmentCardProps) => {


	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation(); // Evita que o clique se propague para elementos pai
		props.onClick(props.id);
	};

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
					title="Deletar departamento"
				>
					<Trash2 size={16} />
				</button>
			)}
			<div className='mt-7'></div>
			<InfoCard elementId={props.id} module="departments" name='name' label="Name" value={props.name} />
			<InfoCard elementId={props.id} module="departments" name='responsible' label="Responsible" value={props.manager} />
			<InfoCard elementId={props.id} module="departments" name='totalEmployees' label="Total employees" value={props.employeeCount.toString()} />
			<InfoCard elementId={props.id} module="departments" name='description' label="Description" value={props.description} />
		</div>
	);
};