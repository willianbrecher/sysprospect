import type { FC } from "react";
import type { ControlledInputTextProps } from "./controlledInputText.types";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";

const ControlledInputText: FC<ControlledInputTextProps> = (
  props: ControlledInputTextProps
) => {
  return (
    <Controller
      name={props.name}
      control={props.formControl.control}
      render={({ field, fieldState }) => {
        return (
          <>
            <InputText
              {...field}
              keyfilter={props.keyFilter ? props.keyFilter : undefined}
              value={props.formControl.watch(props.name)}
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

export default ControlledInputText;
