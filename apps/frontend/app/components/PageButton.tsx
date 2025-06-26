import React from 'react'

type Props = {
    num: number,
    updatePage: React.Dispatch<React.SetStateAction<number>>;
    actual: boolean
}


export const PageButton = (props: Props) => {


    return (
        <>
            {props.num &&
                <button
                    className={`p-4 btn ${props.actual ? "btn-primary" : ""}`}
                    onClick={() => props.updatePage(props.num)}>
                    {props.num}
                </button>
            }
        </>
    )
}
