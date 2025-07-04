import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type EnterpriseStore = {
    enterprise: number
    setEnterprise: (id: number) => void
    getEnterprise: () => number
}

export const useEnterpriseStore = create<EnterpriseStore>()(
    persist(
        (set, get) => ({
            enterprise: 0,
            setEnterprise: (id: number) => {
                // console.log("Enterprise" + id)
                set({ enterprise: id });
            },

            getEnterprise: () => get().enterprise,
        }),
        {
            name: 'enterprise-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);


