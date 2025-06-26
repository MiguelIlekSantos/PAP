import React from 'react'
import { PageButton } from './PageButton'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
	last: number
	actualPage: number
	updatePage: React.Dispatch<React.SetStateAction<number>>
}

type PagesStruct = {
	pages: number[]
	longBeg: boolean
	longEnd: boolean
	total: number
}

export const Pagination = (props: Props) => {
	function getPages(): PagesStruct | undefined {
		if (props.last === undefined) return

		const pages: number[] = []
		let longBeg = false
		let longEnd = false

		if (props.actualPage > 2) {
			pages.push(1)

			if (props.actualPage > 3) {
				longBeg = true
			}

			if (props.actualPage <= props.last - 3) {
				longEnd = true
			}

			pages.push(props.actualPage - 1)
			pages.push(props.actualPage)

			if (props.actualPage <= props.last - 3) {
				pages.push(props.actualPage + 1)
				pages.push(props.last)
			} else {
				if (props.actualPage === props.last - 2) {
					pages.push(props.last - 1, props.last)
				} else if (props.actualPage === props.last - 1) {
					pages.push(props.last)
				}
			}
		} else if (props.actualPage === 2) {
			pages.push(1, 2, 3)

			if (props.last > 4) {
				longEnd = true
				pages.push(props.last)
			}
		} else {
			pages.push(1)
			if (props.last > 3) {
				pages.push(2)
				longEnd = true
				pages.push(props.last)
			}
		}

		return {
			pages,
			longBeg,
			longEnd,
			total: pages.length,
		}
	}

	const pagination = getPages()

	return (
		<div className='w-full flex justify-center items-center'>
			<div className='join'>
				<div className='p-4 btn'>
					<ChevronLeft
						size={25}
						onClick={() => props.updatePage((prev) => Math.max(prev - 1, 1))}
					/>
				</div>

				{pagination?.pages.map((page, idx) => {
					const isActual = page === props.actualPage

					if (page === 1) {
						return (
							<React.Fragment key={idx}>
								<PageButton num={page} updatePage={props.updatePage} actual={isActual} />
								{pagination.longBeg && <div className='join-item btn'>...</div>}
							</React.Fragment>
						)
					}

					if (page === props.last) {
						return (
							<React.Fragment key={idx}>
								{pagination.longEnd && <div className='join-item btn'>...</div>}
								<PageButton num={page} updatePage={props.updatePage} actual={isActual} />
							</React.Fragment>
						)
					}

					return (
						<PageButton key={idx} num={page} updatePage={props.updatePage} actual={isActual} />
					)
				})}

				<div className='p-4 btn'>
					<ChevronRight
						size={25}
						onClick={() => props.updatePage((prev) => Math.min(prev + 1, props.last))}
					/>
				</div>
			</div>
		</div>
	)
}
