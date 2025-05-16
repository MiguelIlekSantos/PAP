import Image from 'next/image'
import React from 'react'

export const Nav = () => {
    return (
        <>
            <div className="navbar bg-base-100 shadow-sm fixed z-10">
                <div className="flex-1">
                    <a className="pl-10 text-xl">Enterprises management</a>
                </div>
                <div className="flex gap-2">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image
                                    src="/icons/user.png"
                                    alt="icon"
                                    width={50}
                                    height={50}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li className='bg-red-800 rounded-lg'><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}
