'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Tabs } from "../interfaces/tabs";
import Image from 'next/image'

type Props = {
	tabs: Tabs[]
	page: string
}

export const DrawerMenu = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleDrawer = () => setIsOpen(!isOpen)

	return (
		<>
			<div
				className={`fixed top-0 left-0 h-full bg-base-200 text-base-content z-50 transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'} flex flex-col items-center py-4 shadow-md`}
			>
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

				<img src="/icons/recursos_humanos.png" alt="logo" className="w-10 h-10 mb-8" />

				<ul className="flex flex-col gap-8 w-full items-center">
					{props.tabs.map((tab, i) => (
						<Link onClick={() => {setIsOpen(false)}} href={props.page + tab.url} key={i} className={`flex w-full pl-5 hover:scale-110`}>
							<li className="w-full flex flex-row">
								{tab.img && (

									<Image
										src={tab.img}
										width={30}
										height={30}
										alt={""}
										className="rounded"
									/>

								)}
								{isOpen && <span className='pl-5'>{tab.title}</span>}

							</li>
						</Link>

					))}
				</ul>
			</div>
		</>
	)
}
