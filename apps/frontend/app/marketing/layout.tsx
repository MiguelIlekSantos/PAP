import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'
import { MarketingTabs } from '../data/tabs'

export default function LogisticLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu tabs={MarketingTabs} page="/marketing" />

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}
