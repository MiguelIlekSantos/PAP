'use client'
import React, { useState } from 'react'
import Link from 'next/link'


type Props = {
	children: React.ReactNode
}


export const DrawerMenu = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDrawer = () => setIsOpen(!isOpen)

	return (
		<div className="flex">
			{/* Drawer */}
			<div
				className={`h-screen bg-base-200 text-base-content transition-all duration-300 ease-in-out
				${isOpen ? 'w-64' : 'w-20'} flex flex-col items-center py-4 shadow-md`}
			>
				{/* Toggle button */}
				<button
					onClick={toggleDrawer}
					className="mb-10 p-2 hover:bg-base-300 rounded transition"
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
				<img src="/icons/management.png" alt="logo" className="w-10 h-10 mb-8" />

				{/* Menu Items */}
				<ul className="flex flex-col gap-6 w-full items-center">
					<li className="w-full">
						<Link
							href="/"
							className={`flex items-center gap-3 p-2 hover:bg-base-300 rounded w-full ${
								isOpen ? 'justify-start pl-10' : 'justify-center'
							}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
							</svg>
							{isOpen && <span>Início</span>}
						</Link>
					</li>

					<li className="w-full">
						<Link
							href="/sobre"
							className={`flex items-center gap-3 p-2 hover:bg-base-300 rounded w-full ${
								isOpen ? 'justify-start pl-10' : 'justify-center'
							}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							{isOpen && <span>Sobre</span>}
						</Link>
					</li>

					<li className="w-full">
						<Link
							href="/dashboard"
							className={`flex items-center gap-3 p-2 hover:bg-base-300 rounded w-full ${
								isOpen ? 'justify-start pl-10' : 'justify-center'
							}`}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none"
								viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
							</svg>
							{isOpen && <span>Relatórios</span>}
						</Link>
					</li>
				</ul>
			</div>

			{/* Conteúdo principal */}
			<div className="flex-1 p-6">
				<h1 className="text-2xl font-bold">Conteúdo da Página</h1>
			</div>
		</div>
	)
}
