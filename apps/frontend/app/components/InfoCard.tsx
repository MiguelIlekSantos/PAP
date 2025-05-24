import React from 'react'
import { Pencil } from 'lucide-react'

type Props = {
	label: string
	value: string
	isLink?: boolean
	isEmail?: boolean
	onEdit?: () => void
}

export const InfoCard = ({ label, value, isLink = false, isEmail = false, onEdit }: Props) => {
	let content: React.ReactNode = value

	if (isLink) {
		content = (
			<a href={value} target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline break-all transition-colors duration-200">
				{value}
			</a>
		)
	} else if (isEmail) {
		content = (
			<a href={`mailto:${value}`} className="text-violet-300 hover:text-violet-200 underline break-all transition-colors duration-200">
				{value}
			</a>
		)
	}

	return (
		<div className="relative bg-[#11161d] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-xl p-5 flex flex-col gap-3 shadow-lg text-white hover:shadow-violet-900/20">
			{onEdit && (
				<button
					onClick={onEdit}
					className="absolute top-3 right-3 text-gray-500 hover:text-violet-300 transition-colors duration-200"
				>
					<Pencil size={18} />
				</button>
			)}
			<span className="text-sm text-violet-400 font-medium">{label}</span>
			<span className="text-base font-medium break-words">{content}</span>
		</div>
	)
}
