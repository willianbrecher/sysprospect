import type { FC } from "react";
import type { ControlledDropdownProps } from "./controlledDropdown.types";
import { Dropdown } from "primereact/dropdown";
import { Controller } from "react-hook-form";
import { Message } from "primereact/message";

const ControlledDropdown: FC<ControlledDropdownProps> = (
  props: ControlledDropdownProps
) => {
  return (
    <Controller
      name={"knowAbout"}
      control={props.formControl.control}
      render={({ field, fieldState }) => {
        return (
          <>
            <Dropdown
              {...field}
              optionLabel="label"
              onChange={(e) => props.formControl.setValue(props.name, e.value)}
              options={props.options}
              value={
                props.options.find(
                  (op) => op["value"] === props.formControl.watch(props.name)
                )?.value
              }
              placeholder={props.placeHolder}
              className={
                fieldState.error && fieldState.error.message && "p-invalid mr-2"
              }
            />
            {fieldState.error && fieldState.error.message ? (
              <Message severity="error" text={fieldState.error?.message} />
            ) : (
              <></>
            )}
          </>
        );
      }}
    />
  );
};

export default ControlledDropdown;
