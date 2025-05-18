import type { FC } from "react";
import type { ModalProps } from "./modal.types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const footerContent = (
    <div>
      <Button
        label={props.submitButtonText}
        onClick={props.onSubmit}
        className="p-button-text"
      />
      <Button label={props.closeButtonText} onClick={props.onClose} />
    </div>
  );

  return (
    <Dialog
      onHide={props.onClose}
      visible={props.isOpen}
      header={props.title}
      footer={footerContent}
    >
      {props.children}
    </Dialog>
  );
};

export default Modal;
