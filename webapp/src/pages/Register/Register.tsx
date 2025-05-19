import type { FC } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import useRegister from "./hooks/useRegister";
import ControlledInputText from "../../components/ControlledInputText/ControlledInputText";
import ControlledDropdown from "../../components/ControlledDropdown/ControlledDropdown";
import { Toast } from "primereact/toast";

const Register: FC = () => {
  const { form, toast } = useRegister();

  return (
    <Card title="Contato">
      <Toast ref={toast} />
      <div className="p-fluid">
        <ControlledInputText
          name={"name"}
          formControl={form.formControl}
          placeHolder={"Name"}
        />
        <ControlledInputText
          name={"email"}
          formControl={form.formControl}
          placeHolder={"Email"}
        />
        <ControlledInputText
          name={"phone"}
          formControl={form.formControl}
          placeHolder={"Phone"}
          keyFilter={"int"}
        />
        <ControlledDropdown
          name={"knowAbout"}
          formControl={form.formControl}
          placeHolder={"How do you know about us?"}
          options={form.knowAboutOptions} 
        />
        <Button label="Send" onClick={form.submit} />
      </div>
    </Card>
  );
};

export default Register;
