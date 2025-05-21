import type { FC } from "react";
import type { ControlledInputTextProps } from "./controlledInputText.types";
import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";

const ControlledInputText: FC<ControlledInputTextProps> = (
  props: ControlledInputTextProps
) => {
  return (
    <div style={{ padding: 10 }}>
      <Controller
        name={props.name}
        control={props.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <InputText
                data-test={`input-text-${props.name}`}
                {...field}
                hidden={props.hidden}
                disabled={props.disabled}
                keyfilter={props.keyFilter ? props.keyFilter : undefined}
                value={props.formControl.watch(props.name)}
                placeholder={props.placeHolder}
                className={
                  fieldState.error &&
                  fieldState.error.message &&
                  "p-invalid"
                }
              />
              {fieldState.error && fieldState.error.message ? (
                <small style={{color: "red"}}>{fieldState.error?.message}</small>
              ) : (
                <></>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default ControlledInputText;
