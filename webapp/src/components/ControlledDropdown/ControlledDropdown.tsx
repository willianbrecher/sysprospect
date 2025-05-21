import type { FC } from "react";
import type { ControlledDropdownProps } from "./controlledDropdown.types";
import { Dropdown } from "primereact/dropdown";
import { Controller } from "react-hook-form";

const ControlledDropdown: FC<ControlledDropdownProps> = (
  props: ControlledDropdownProps
) => {
  return (
    <div style={{ padding: 10 }}>
      <Controller
        name={"knowAbout"}
        control={props.formControl.control}
        render={({ field, fieldState }) => {
          return (
            <>
              <Dropdown
                {...field}
                data-test={`dropdown-${props.name}`}
                hidden={props.hidden}
                disabled={props.disabled}
                optionLabel="label"
                onChange={(e) =>
                  props.formControl.setValue(props.name, e.value)
                }
                options={props.options}
                value={
                  props.options.find(
                    (op) => op["value"] === props.formControl.watch(props.name)
                  )?.value
                }
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

export default ControlledDropdown;
