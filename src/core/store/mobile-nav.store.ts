import { create } from 'zustand';

interface MobileNavStore {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
}

export const useMobileNavStore = create<MobileNavStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({isOpen: !state.isOpen})),
    closeMenu: () => set(() => ({isOpen: false}))
}))