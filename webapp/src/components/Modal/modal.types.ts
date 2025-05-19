export interface ModalProps {
    title: string;
    children: React.ReactNode;
    onSubmit: () => void;
    onClose: () => void;
    submitButtonText: string;
    closeButtonText: string;
    disableSubmitButton?: boolean;
    isOpen: boolean;
}