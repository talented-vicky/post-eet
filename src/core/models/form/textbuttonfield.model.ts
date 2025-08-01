import type { ReactNode } from "react";
import type { Control, FieldError } from "react-hook-form";

export interface TextbuttonFieldProps {
    name: string;
    label: string;
    rules: any;
    floatAnim?: boolean;
    type?: 'text' | 'email'
    placeholder?: string;
    control: Control<any>;
    error?: FieldError;
    addOn: ReactNode | (() => ReactNode);
}