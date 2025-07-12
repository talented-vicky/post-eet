import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthStoreProps } from '../models/store/auth.model';


export const useAuthStore = create<AuthStoreProps>()(
    persist(
        set => ({
            token: null,
            setToken: (token) => set({token}),
            logout: () => {
                set({token: null})
            }
        }),
        {
            name: 'auth-store',
        }
    )
)