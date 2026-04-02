import { HelperText, TextInput } from "flowbite-react";
import { useController, UseControllerProps } from "react-hook-form";

type InputProps = {
  label: string;
  type?: string;
  showLabel?: boolean;
} & UseControllerProps;

export default function Input(props: InputProps) {
  const { field, fieldState } = useController({ ...props });
  return (
    <div className="mb-3 block">
      {props.showLabel && (
        <label htmlFor={props.name} className="mb-2 block">
          {props.label}
        </label>
      )}
      <TextInput
        {...props}
        {...field}
        value={field.value || ""}
        type={props.type || "text"}
        placeholder={props.label}
        color={
          fieldState.error ? "failure" : !fieldState.isDirty ? "" : "success"
        }
      />
      <HelperText color="failure">
        {fieldState.error?.message as string}
      </HelperText>
    </div>
  );
}
