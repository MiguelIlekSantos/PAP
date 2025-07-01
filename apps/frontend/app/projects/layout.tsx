import React from 'react'
import { DrawerMenu } from '../components/DrawerMenu'

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <DrawerMenu page='projects'/>

            <main className="relative z-0">
                {children}
            </main>
        </div>
    )
}