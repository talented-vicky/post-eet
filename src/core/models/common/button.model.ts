export interface ButtonProps {
    label: string;
    type: 'submit' | 'reset' | 'button';
    disabled: boolean;
    loading: boolean;
    onclick: () => void;
}