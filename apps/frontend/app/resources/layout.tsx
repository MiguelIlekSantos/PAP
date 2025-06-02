import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { ResourcesTabs } from '../data/tabs'

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu tabs={ResourcesTabs} page='/resources'/>

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}
