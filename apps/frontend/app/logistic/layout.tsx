import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { LogisticsTabs } from '../data/tabs'

export default function LogisticLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu tabs={LogisticsTabs} page='/logistic'/>

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}
