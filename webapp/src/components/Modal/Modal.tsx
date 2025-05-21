import type { FC } from "react";
import type { ModalProps } from "./modal.types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const footerContent = (
    <div>
      <Button
        label={props.closeButtonText}
        onClick={props.onClose}
        severity="secondary"
      />
      <Button
        label={props.submitButtonText}
        onClick={props.onSubmit}
        disabled={props.disableSubmitButton}
        severity="success"
      />
    </div>
  );

  return (
    <Dialog
      style={{
        display: "block",
        minWidth: "30vw",
      }}
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
