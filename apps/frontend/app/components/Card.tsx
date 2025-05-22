import Link from 'next/link'
import React from 'react'

export const Card = () => {
    return (
        <>
            <Link href={"/details"}>
                <div className="bg-gray-700/30 rounded-lg overflow-hidden w-96 shadow-sm">
                    <figure>
                        <img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                            alt="Shoes" />
                            
                    </figure>
                    <div className="card-body ">
                        <h2 className="card-title">Card Title</h2>
                        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary hover:border hover:border-purple-500">Buy Now</button>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}
