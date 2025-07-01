import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type BranchStore = {
    branch: number
    setBranch: (id: number) => void
    getBranch: () => number
}

export const useBranchStore = create<BranchStore>()(
    persist(
        (set, get) => ({
            branch: 0,
            setBranch: (id: number) => {
                set({ branch: id });
            },

            getBranch: () => get().branch,
        }),
        {
            name: 'branch-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
