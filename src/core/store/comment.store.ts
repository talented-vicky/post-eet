import { create } from 'zustand';
import type { CommentStoreProps } from '../models/store/comment.model';


export const useCommentStore = create<CommentStoreProps>((set) => ({
    isOpen: false,
    showPost: () => set({ isOpen: true }),
    hidePost: () => set({ isOpen: false })
}))