import type { Control, FieldError } from "react-hook-form";

export interface TextFieldProps {
    name: string;
    label: string;
    rules: any;
    floatAnim?: boolean;
    type?: 'text' | 'email' | 'password'
    placeholder?: string;
    height?: string;
    className?: string;
    control: Control<any>;
    error?: FieldError;
}