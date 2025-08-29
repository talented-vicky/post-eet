export interface TextButtonProps {
    label: string;
    disabled: boolean;
    loading: boolean;
    onclick: () => void;
}

export interface ButtonProps {
    label: string;
    loadingLabel: string;
    classname?: string;
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