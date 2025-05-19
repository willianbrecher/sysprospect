export interface ControlledDropdownProps {
    name: string;
    options: ControlledDropdownOptionItem[]
    formControl: any;
    placeHolder: string;
    disabled?: boolean;
    hidden?: boolean;
}

export interface ControlledDropdownOptionItem {
    label: string;
    value: string
}