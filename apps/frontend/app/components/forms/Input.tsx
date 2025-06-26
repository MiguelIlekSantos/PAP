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
            <div className='flex w-full h-full flex-col space-y-2'>
                <label htmlFor="input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {props.name}
                    <span className="text-red-500 ml-1">*</span>
                </label>
                {typeSorting(props)}
            </div>
        </>
    )
}


function typeSorting(props: Props): JSX.Element | undefined {

    const commonProps = {
        className: `w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
        placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-colors duration-200 shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed`,
        name:"input"
    }

    switch (props.type) {
        case undefined:
        case null:
            return (
                <input
                    type="text"
                    {...commonProps}
                    placeholder={`Enter ${props.name.toLowerCase()}`}
                    onChange={(e) => props.changeData?.(props.nameOnDB, e.target.value)}
                />
            )
            break;

        case "file":
            return (
                <input
                    type="file"
                    className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    transition-colors duration-200 shadow-sm hover:shadow-md
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                    file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300`}
                    name="input"
                />
            )
            break;

        default:
            return (<></>)
            break;
    }
}



