import React, { useState } from 'react'
import { Pencil, Check, X } from 'lucide-react'

type OptionProps = {
    value: string
    selected?: boolean
    children?: React.ReactNode
}

export const Option = ({ value, selected, children }: OptionProps) => {
    return (
        <option value={value} selected={selected}>
            {children || value}
        </option>
    )
}

type Props = {
    label: string
    value: string
    isLink?: boolean
    isEmail?: boolean
    isSelectable?: boolean
    children?: React.ReactNode
    onChange?: (value: string) => void
}

export const InfoCard = (props: Props) => {
    let content: React.ReactNode = props.value
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [currentValue, setCurrentValue] = useState<string>(props.value)

    if (props.isLink) {
        content = (
            <a href={props.value} target="_blank" rel="noopener noreferrer" className="text-violet-300 hover:text-violet-200 underline break-all transition-colors duration-200">
                {props.value}
            </a>
        )
    } else if (props.isEmail) {
        content = (
            <a href={`mailto:${props.value}`} className="text-violet-300 hover:text-violet-200 underline break-all transition-colors duration-200">
                {props.value}
            </a>
        )
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setCurrentValue(e.target.value)
    }

    const handleSave = () => {
        if (props.onChange) {
            props.onChange(currentValue)
        }
        setIsEditing(false)
    }

    const handleCancel = () => {
        setCurrentValue(props.value)
        setIsEditing(false)
    }

    return (
        <div className="relative bg-[#0d1218] border border-gray-800 hover:border-violet-700 transition-all duration-300 rounded-lg p-3 flex flex-col gap-2 shadow-md text-white hover:shadow-violet-900/20">
            <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-2 right-2 text-gray-500 hover:text-violet-300 transition-colors duration-200"
            >
                <Pencil size={14} />
            </button>

            <span className="text-xs text-violet-400 font-medium">{props.label}</span>
            {
                isEditing ? (
                    <div className="flex flex-col gap-3">
                        {
                            props.isSelectable ? (
                                <select 
                                    value={currentValue}
                                    onChange={handleChange}
                                    className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500"
                                >
                                    {props.children}
                                </select>
                            ) : (
                                <input 
                                    type="text" 
                                    value={currentValue}
                                    onChange={handleChange}
                                    placeholder={content.toString()} 
                                    className="bg-[#161f2c] text-white border border-gray-700 focus:border-violet-500 rounded-md py-2 px-3 w-full outline-none transition-all duration-200 hover:border-violet-400 focus:ring-1 focus:ring-violet-500" 
                                />
                            )
                        }
                        <div className="flex gap-2 justify-end">
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-1 bg-violet-700 hover:bg-violet-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm"
                            >
                                <Check size={14} />
                                Salvar
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md transition-all duration-200 text-sm"
                            >
                                <X size={14} />
                                Cancelar
                            </button>
                        </div>
                    </div>
                ) : (
                    <span className="text-sm font-medium break-words">{content}</span>
                )
            }
        </div>
    )
}
