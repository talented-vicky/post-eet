import { create } from 'zustand';
import type { ConfirmationStoreProps } from '../models/store/confirmation.model';

export const useConfirmationStore = create<ConfirmationStoreProps>((set) => ({
    isOpen: false,
    icon: '', iconBg: '', title: '', titleColor: '',
    msg: '', buttons: [],
    showConfirmation: (icon, iconBg, title, titleColor, msg, buttons) => set({
        isOpen: true, icon, iconBg, title, titleColor, msg, buttons
    }),
    hideConfirmation: () => set({
        isOpen: false, icon: '', iconBg: '', title: '', 
        titleColor: '', msg: '', buttons: [],
    })
}))