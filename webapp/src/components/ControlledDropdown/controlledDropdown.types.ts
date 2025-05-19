import type { UseFormReturn } from "react-hook-form";

export interface ControlledDropdownProps {
    name: string;
    optionLabel: string;
    options: ControlledDropdownOptionItem[]
    formControl: UseFormReturn;
    placeHolder: string;
    disabled?: boolean;
    hidden?: boolean;
}

export interface ControlledDropdownOptionItem {
    label: string;
    value: string
}