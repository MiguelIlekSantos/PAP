import React, { ReactNode, useEffect, useState } from 'react'

type Props = {
	children: ReactNode
	title: string
	changeData?: () => void
}

export const Fieldset = (props: Props) => {

	const childrenWithMethods = React.Children.map(props.children, (child) => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child as React.ReactElement<any>, {
				changeData: props.changeData
			})
		}
		return child;
	})


	return (
		<>
			<fieldset className='w-full md:w-3/4 flex flex-col border border-gray-400 rounded-md p-2 md:p-5 mb-3'>
				<legend className='text-lg font-bold p-2'>{props.title}</legend>
				<div className='flex flex-wrap gap-5 lg:gap-y-10 w-full'>
					{childrenWithMethods}
				</div>
			</fieldset>
		</>
	)
}
