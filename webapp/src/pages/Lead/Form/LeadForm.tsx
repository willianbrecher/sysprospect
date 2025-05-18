import type { FC } from "react";
import type { IFormProps } from "../../../types/form.types";
import Modal from "../../../components/Modal/Modal";

const LeadForm: FC<IFormProps> = (props: IFormProps) => {
  const { type } = props;

  return (
    <Modal
      title={type}
      onSubmit={() => console.log(1)}
      onClose={() => console.log(2)}
      submitButtonText={""}
      closeButtonText={""}
      isOpen={true}
    >
      LeadForm
    </Modal>
  );
};

export default LeadForm;
