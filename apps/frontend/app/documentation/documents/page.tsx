'use client'

import React from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { DrawerMenu } from '../../components/DrawerMenu'
import { DocumentationTabs } from '../../data/tabs'

export default function DocumentsPage() {
  return (
    <>
      <SlideFrame />
      <Nav />
      <DrawerMenu tabs={DocumentationTabs} page="/documentation" />
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Documentos</h1>
        </div>
        
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400">Gestão de documentos da empresa</p>
        </div>
      </div>
    </>
  );
}