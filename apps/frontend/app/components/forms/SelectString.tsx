import React, { useState, useEffect } from 'react';

type SelectStringOption = {
	value: string;
	label: string;
};

type SelectStringProps = {
	nameOnDB: string;
	name: string;
	options: SelectStringOption[];
	placeholder?: string;
	required?: boolean;
	changeData?: (name: string, value: string) => void;
	initialData?: any;
};

export const SelectString = ({ nameOnDB, name, options, placeholder, required = false, changeData, initialData }: SelectStringProps) => {
	const [selectedValue, setSelectedValue] = useState<string>('');

	// Atualizar valor quando initialData mudar
	useEffect(() => {
		if (initialData && initialData[nameOnDB] !== undefined) {
			setSelectedValue(String(initialData[nameOnDB]));
		}
	}, [initialData, nameOnDB]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;
		setSelectedValue(value);

		// Chama a função changeData do ModalForms
		if (changeData) {
			changeData(nameOnDB, value);
		}
	};

	return (
		<div className='flex w-full h-full flex-col space-y-2'>
			<label htmlFor={nameOnDB} className="text-sm font-medium text-gray-700 dark:text-gray-300">
				{name}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			<select
				id={nameOnDB}
				name={nameOnDB}
				value={selectedValue}
				onChange={handleChange}
				className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
				bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
				focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
				transition-colors duration-200 shadow-sm hover:shadow-md
				disabled:opacity-50 disabled:cursor-not-allowed"
				required={required}
			>
				<option value="">{placeholder || `Select ${name.toLowerCase()}...`}</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
};