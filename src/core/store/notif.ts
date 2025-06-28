import { create } from 'zustand';

interface NotifStoreProps {
    isOpen: boolean;
    code: 'success' | 'error' | 'notif' | 'warning';
    title: string;
    msg: string;

    showNotif: (
        title: string, msg: string, 
        code: 'success' | 'error' | 'notif' | 'warning'
    ) => void;
    hideNotif: () => void;
}

const useNotifStore = create<NotifStoreProps>(set => ({
    isOpen: false, title: '', msg: '', code: 'success',
    showNotif: (title, msg, code ) => set({
        isOpen: true, title, msg, code
    }),
    hideNotif: () => set({
        isOpen: false, title: '', msg: '', code: 'success'
    })
}))

export default useNotifStore