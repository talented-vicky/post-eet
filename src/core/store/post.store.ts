import { create } from 'zustand';
import type { PostStoreProps } from '../models/store/post.model';


export const usePostStore = create<PostStoreProps>((set) => ({
    isOpen: false,
    showPost: () => set({ isOpen: true }),
    hidePost: () => set({ isOpen: false })
}))