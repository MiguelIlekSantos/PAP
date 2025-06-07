'use client'

import React, { useState } from 'react'
import { SlideFrame } from '../../components/SlideFrame'
import { Nav } from '../../components/Nav'
import { DrawerMenu } from '../../components/DrawerMenu'
import { FilterPanel } from '../../components/FilterPanel'
import { Table } from '../../components/Table'
import { Modal } from '../../components/Modal'
import { Plus, Search, Play, Pause, Edit, Trash2 } from 'lucide-react'
import { MarketingTabs } from '../../data/tabs'

export default function CampaignsPage() {
  return (
    <>
      <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Campanhas de Marketing</h1>
          <button className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200">
            <Plus size={18} />
            Nova Campanha
          </button>
        </div>
        
        <div className="bg-[#0d1218] border border-gray-800 rounded-lg p-6">
          <p className="text-gray-400">Gestão detalhada de campanhas de marketing</p>
        </div>
      </div>
    </>
  );
}