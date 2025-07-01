import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu page='tecnology' />

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}