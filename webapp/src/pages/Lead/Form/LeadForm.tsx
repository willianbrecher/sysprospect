import type { FC } from "react";
import type { IFormProps } from "../../../types/form.types";
import Modal from "../../../components/Modal/Modal";
import useLeadFormRequests from "./hooks/useLeadFormRequests";
import ControlledInputText from "../../../components/ControlledInputText/ControlledInputText";
import ControlledDropdown from "../../../components/ControlledDropdown/ControlledDropdown";

const LeadForm: FC<IFormProps> = (props: IFormProps) => {
  const { form } = useLeadFormRequests(props);
  const { type } = props;

  return (
    <Modal
      title={type.toUpperCase()}
      onSubmit={form.submit}
      onClose={form.close}
      submitButtonText={"Save"}
      closeButtonText={"Close"}
      isOpen={true}
      disableSubmitButton={type === "detail"}
    >
      <div className="p-fluid">
        <ControlledInputText
          name={"name"}
          disabled={type === "detail"}
          formControl={form.methods}
          placeHolder={"Name"}
        />
        <ControlledInputText
          name={"email"}
          disabled={type === "detail"}
          formControl={form.methods}
          placeHolder={"Email"}
        />
        <ControlledInputText
          name={"phone"}
          disabled={type === "detail"}
          formControl={form.methods}
          placeHolder={"Phone"}
          keyFilter={"int"}
        />
        <ControlledDropdown
          name={"knowAbout"}
          disabled={type === "detail"}
          formControl={form.methods}
          placeHolder={"How do you know about us?"}
          options={form.knowAboutOptions}
        />
        <ControlledInputText
          hidden={type === "new"}
          name={"amount"}
          disabled={true}
          formControl={form.methods}
          placeHolder={"Amount"}
        />
        <ControlledInputText
          hidden={type === "new"}
          name={"createdAt"}
          disabled={true}
          formControl={form.methods}
          placeHolder={"Created at"}
        />
      </div>
    </Modal>
  );
};

export default LeadForm;
