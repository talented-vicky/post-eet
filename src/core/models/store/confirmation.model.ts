export interface ConfirmationStoreProps {
    isOpen: boolean;
    icon: string;
    iconBg: string;
    title: string;
    titleColor: string;
    msg: string;
    buttons: ConfirmationButtonProps[];
    hideConfirmation: () => void;
    showConfirmation: (
        icon: string, iconBg: string, title: string, titleColor: string,
        msg: string, buttons: ConfirmationButtonProps[]
    ) => void;
}

interface ConfirmationButtonProps {
    label: string;
    labelColor: string;
    bgColor: string;
    onclick: () => void;
}