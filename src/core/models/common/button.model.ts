export interface ButtonProps {
    label: string;
    loadingLabel: string;
    type: 'submit' | 'reset' | 'button';
    disabled: boolean;
    loading: boolean;
    onclick: () => void;
}

export interface ButtonStaticProps {
    label: string;
    link: string;
    textColor: string;
    bgColor: string;
}