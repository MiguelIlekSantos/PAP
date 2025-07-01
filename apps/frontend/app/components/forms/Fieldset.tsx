import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
	children: ReactNode
	title: string
	changeData?: () => void
	initialData?: any
}

export const Fieldset = (props: Props) => {

	const childrenWithMethods = React.Children.map(props.children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child as React.ReactElement<any>, {
				changeData: props.changeData,
				initialData: props.initialData
			})
		}
		return child;
	})


	return (
		<>
			<fieldset className='w-full flex flex-col bg-white dark:bg-gray-800 
			border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm 
			p-6 mb-6 transition-all duration-200 hover:shadow-md'>
				<legend className='text-xl font-semibold text-gray-900 dark:text-white 
				px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
				rounded-lg shadow-sm mb-4'>
					{props.title}
				</legend>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full'>
					{childrenWithMethods}
				</div>
			</fieldset>
		</>
	)
}
