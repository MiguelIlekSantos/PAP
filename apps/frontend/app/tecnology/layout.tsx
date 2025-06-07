import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { TechnologyTabs } from '../data/tabs'

export default function TechnologyLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu tabs={TechnologyTabs} page='/tecnology'/>

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}