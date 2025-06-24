import React from 'react'

type InputData = {
    input: string
    value: string
}

type Props = {
    name: string,
    nameOnDB: string
    type?: string,
    changeData?: (name: string, value: string) => void;
}

export const Input = (props: Props) => {

    return (
        <>
            <div className='flex w-full md:w-auto h-full flex-col gap-2'>
                <label htmlFor="input" className="font-bold text-sm pl-1">{props.name}</label>
                {typeSorting(props)}
            </div>
        </>
    )
}


function typeSorting(props: Props): JSX.Element | undefined {

    const commonProps = {
        className: "w-full md:w-52 px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500",
        name:"input"
    }

    switch (props.type) {
        case undefined:
        case null:
            return (
                <input
                    type="text"
                    {...commonProps}
                    placeholder={"Insert " + props.name}
                    onChange={(e) => props.changeData?.(props.nameOnDB, e.target.value)}
                />
            )
            break;

        case "file":
            return (
                <input
                    type="file"
                    {...commonProps}
                />
            )
            break;

        default:
            return (<></>)
            break;
    }
}



