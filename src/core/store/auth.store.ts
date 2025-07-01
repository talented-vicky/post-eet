import { create } from 'zustand';
import type { AuthStoreProps } from '../models/store/auth.model';

export const useAuthStore = create<AuthStoreProps>(set => ({
    token: null,
    setToken: (token) => set({token}),
    logout: () => set({token: null})
}))