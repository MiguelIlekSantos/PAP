import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function LogisticLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu page='logistic'/>

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}
