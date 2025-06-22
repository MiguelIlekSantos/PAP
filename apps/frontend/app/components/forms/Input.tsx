import React from 'react'


type Props = {
    name: string,
    type?: string,
}

export const Input = (props: Props) => {

    return (
        <>
            {typeSorting(props)}
        </>
    )
}


function typeSorting(props: Props) : JSX.Element | undefined {
    switch (props.type) {
        case undefined:
        case null:
            return (
                <div className='flex w-full md:w-auto h-full flex-col gap-2'>
                    <label htmlFor="input" className="font-bold text-sm pl-1">{props.name}</label>
                    <input
                        type="text"
                        name="input"
                        placeholder={"Insert " + props.name}
                        className="w-full md:w-52 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            )
            break;

        case "file":
            return (
                <div className='flex w-full md:w-auto h-full flex-col gap-2'>
                    <label htmlFor="input" className="font-bold text-sm pl-1">{props.name}</label>
                    <input
                        type="file"
                        name="input"
                        className="w-full md:w-96 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
            )
            break;

        default:
            return (<></>)
            break;
    }
}



