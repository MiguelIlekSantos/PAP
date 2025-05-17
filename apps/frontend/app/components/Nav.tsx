import Image from 'next/image'
import React, { useState } from 'react'
import { Modal } from './Modal'

export const Nav = () => {

    const [ProfileModal, setProfileModal] = useState<boolean>(false)
    const [SettingsModal, setSettingsModal] = useState<boolean>(false)
    const [LogOutModal, setLogOutModal] = useState<boolean>(false)

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
                            <li onClick={() => { setProfileModal(true) }}><a>Profile</a></li>
                            <li onClick={() => { setSettingsModal(true) }}><a>Settings</a></li>
                            <li onClick={() => { setLogOutModal(true) }} className='bg-red-800 rounded-lg'><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            {ProfileModal &&
                <Modal onclick={() => { setProfileModal(false) }} isCreate={false} isLarge={true}>
                    <p>Profile modal</p>
                </Modal>
            }
            {SettingsModal &&
                <Modal onclick={() => { setSettingsModal(false) }} isCreate={false} isLarge={true}>
                    <p>Settings modal</p>
                </Modal>
            }
            {LogOutModal &&
                <Modal onclick={() => { setLogOutModal(false) }} isCreate={false} isLarge={false}>
                    <p>Log Out modal</p>
                </Modal>
            }
        </>
    )
}
