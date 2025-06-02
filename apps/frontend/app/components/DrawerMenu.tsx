'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Tabs } from '../interfaces/tabs'

type Props = {
	tabs: Tabs[]
	page: string
}

export const DrawerMenu = ({ tabs, page }: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDrawer = () => setIsOpen(!isOpen)

	return (
		<div
			className={`fixed top-0 left-0 h-full bg-base-200 text-base-content z-40 transition-all duration-300 ease-in-out shadow-md
			${isOpen ? 'w-64' : 'w-20'} flex flex-col items-start py-4 px-2`}
		>
			{/* Toggle Button */}
			<button
				onClick={toggleDrawer}
				className="mb-6 ml-1 p-2 rounded hover:bg-base-300 transition"
			>
				{isOpen ? (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
						viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
					</svg>
				)}
			</button>

			{/* Logo */}
			<div className="w-full flex justify-center mb-8">
				<Image
					src="/icons/logo.png"
					alt="Logo"
					width={40}
					height={40}
					className="rounded"
				/>
			</div>

			{/* Menu Items */}
			<ul className="w-full space-y-1">
				{tabs.map((tab, i) => (
					<li key={i}>
						<Link
							href={page + tab.url}
							onClick={() => setIsOpen(false)}
							className="h-16 flex items-center gap-4 px-4 py-3 hover:bg-base-300 rounded transition w-full"
						>
							{tab.img && (
								<Image
									src={tab.img}
									alt={""}
									width={28}
									height={28}
									className="rounded"
								/>
							)}
							{isOpen && <span className="text-sm font-medium">{tab.title}</span>}
						</Link>
					</li>
				))}

				{/* Back/Logout button */}
				<li className="mt-6">
					<Link
						href="/details"
						className="flex items-center justify-center gap-3 bg-error text-white px-4 py-3 rounded w-full hover:bg-red-600 transition"
					>
						<ArrowLeft size={24} />
						{isOpen && <span className="font-medium">Sair</span>}
					</Link>
				</li>
			</ul>
		</div>
	)
}
