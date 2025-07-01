export interface NotifStoreProps {
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