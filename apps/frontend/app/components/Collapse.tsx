import React, { ReactNode } from 'react'

type Props = {
    title?: string;
    limited?: boolean;
    children: ReactNode;
}

export const Collapse = (props: Props) => {
    return (
        <>
            <div className={`collapse bg-base-100 border-base-300 border mt-1
                ${props.limited ? "max-h-60 overflow-auto": ""}
                `}>
                <input type="checkbox" />
                <div className="collapse-title font-semibold">{props.title}</div>
                <div className="collapse-content text-sm overflow-auto">
                    {props.children}
                </div>
            </div>
        </>
    )
}
