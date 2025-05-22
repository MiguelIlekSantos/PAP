'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Tabs } from "../interfaces/tabs";
import Image from 'next/image'

type Props = {
	tabs: Tabs[]
}

export const DrawerMenu = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDrawer = () => setIsOpen(!isOpen)

	return (
		<>
			{/* Drawer flutuante por cima */}
			<div
				className={`fixed top-0 left-0 h-full bg-base-200 text-base-content z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'} flex flex-col items-center py-4 shadow-md`}
			>
				{/* Botão de toggle */}
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
					{props.tabs.map((tab, i) => (
						<li className="w-full" key={i}>


							{tab.img && (
								<Image
									src={tab.img}
									width={30}
									height={30}
									alt={tab.title}
									className="rounded"
								/>
							)}
							{isOpen && <span>{tab.title}</span>}

						</li>
					))}
				</ul>
			</div>

			{/* Conteúdo principal sem ser afetado pelo drawer */}
			<div className="relative z-0 min-h-screen p-6 ml-20">
				<h1 className="text-2xl font-bold">Conteúdo da Página</h1>
			</div>
		</>
	)
}
