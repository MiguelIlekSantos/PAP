import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu page='documentation' />

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}
