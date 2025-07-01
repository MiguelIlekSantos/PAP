'use client'

import React, { useState } from 'react'
import { Plus, Search, Play, Pause, Edit, Trash2 } from 'lucide-react'

export default function CampaignsPage() {
    return (
        <>
            <div className="min-h-screen ml-20 bg-base-300 text-white p-6 relative">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-white">Social Media</h1>
                    <button className="flex items-center gap-2 bg-violet-700 hover:bg-violet-600 text-white px-4 py-2 rounded-md transition-all duration-200">
                        <Plus size={18} />
                        Register new social media account
                    </button>
                </div>
            </div>
        </>
    );
}