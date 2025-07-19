import { create } from 'zustand';
import type { NotifStoreProps } from '../models/store/notif.model';


export const useNotifStore = create<NotifStoreProps>((set) => ({
    isOpen: false, title: '', msg: '', code: 'success',
    showNotif: (title, msg, code ) => set({
        isOpen: true, title, msg, code
    }),
    hideNotif: () => set({
        isOpen: false, title: '', msg: '', code: 'success'
    })
}))