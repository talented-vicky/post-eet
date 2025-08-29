import type { Control, FieldError } from "react-hook-form";

export interface DropdownOptions {
    label: string;
}

export default interface DropdownFieldProps {
    name: string;
    placeholder: string;
    control: Control<any>;
    // options: Array<{label: string, value: number}>;
    options: Array<any>;
    rules: any;
    error?: FieldError;
    className?: string;
    labelKey?: string;
    valueKey?: string;
    floatAnim?: boolean;
    onchange?: (value: any) => void;
    onclick?: (value: any) => any;
}
