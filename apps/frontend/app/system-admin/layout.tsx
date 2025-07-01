import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function SystemAdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu page="system-admin" />
            <main className="relative z-0 ml-20">
                {children}
            </main>
        </div>
    )
}