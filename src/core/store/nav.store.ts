import { create } from 'zustand';
import type { NavStoreProps } from '../models/store/nav.model';

export const useNavStore = create<NavStoreProps>((set) => ({
    activeNav: 'dashboard',
    setActiveNav: (nav) => set({activeNav: nav})
}))