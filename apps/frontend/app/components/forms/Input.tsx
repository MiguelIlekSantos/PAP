import React, { useState, useEffect } from 'react'

type InputData = {
    input: string
    value: string
}

type Props = {
    name: string,
    nameOnDB: string
    type?: string,
    step?: string,
    changeData?: (name: string, value: string) => void;
    initialData?: any;
}

export const Input = (props: Props) => {
    const [value, setValue] = useState<string>('');

    // Atualizar valor quando initialData mudar
    useEffect(() => {
        if (props.initialData && props.initialData[props.nameOnDB] !== undefined) {
            const initialValue = props.initialData[props.nameOnDB];
            // Converter Date para string se necessário
            if (initialValue instanceof Date) {
                setValue(initialValue.toISOString().split('T')[0]);
            } else {
                setValue(String(initialValue || ''));
            }
        }
    }, [props.initialData, props.nameOnDB]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
        props.changeData?.(props.nameOnDB, newValue);
    };

    return (
        <>
            <div className='flex w-full h-full flex-col space-y-2'>
                <label htmlFor="input" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {props.name}
                    <span className="text-red-500 ml-1">*</span>
                </label>
                {typeSorting(props, value, handleChange)}
            </div>
        </>
    )
}


function typeSorting(props: Props, value: string, handleChange: (value: string) => void): JSX.Element | undefined {

    const commonProps = {
        className: `w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
        placeholder-gray-500 dark:placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-colors duration-200 shadow-sm hover:shadow-md
        disabled:opacity-50 disabled:cursor-not-allowed`,
        name: "input",
        value: value,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)
    }

    switch (props.type) {
        case undefined:
        case null:
            return (
                <input
                    type="text"
                    {...commonProps}
                    placeholder={`Enter ${props.name.toLowerCase()}`}
                />
            )
            break;

        case "date":
            return (
                <input
                    type="date"
                    {...commonProps}
                />
            )
            break;

        case "number":
            return (
                <input
                    type="number"
                    step={props.step}
                    {...commonProps}
                    placeholder={`Enter ${props.name.toLowerCase()}`}
                />
            )
            break;

        case "email":
            return (
                <input
                    type="email"
                    {...commonProps}
                    placeholder={`Enter ${props.name.toLowerCase()}`}
                />
            )
            break;

        case "tel":
            return (
                <input
                    type="tel"
                    {...commonProps}
                    placeholder={`Enter ${props.name.toLowerCase()}`}
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



