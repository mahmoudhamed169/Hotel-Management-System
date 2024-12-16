import { InputAdornment, TextField } from "@mui/material";
import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
interface FormTextFieldType {
  placeholder?: string;
  errors: any;
  name: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  icon?: ReactNode;
  type?: string;
  label?: string;
  defaultValue?: string;
}
export const FormTextField = ({
  placeholder,
  errors,
  name,
  register,
  rules,
  label,
  icon = null,
  type = "text",
  defaultValue,
}: FormTextFieldType) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      error={!!errors}
      defaultValue={defaultValue}
      helperText={errors ? errors.message : ""}
      label={label}
      InputProps={{
        sx: {
          "& input": {
            padding: "16.5px 16px",
          },
        },
        endAdornment: icon ? (
          <InputAdornment
            sx={{ cursor: "pointer" }}
            onMouseUp={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            position="end">
            {icon}
          </InputAdornment>
        ) : null,
      }}
      sx={{
        marginTop: "3px",
        width: "100%",
      }}
      {...register(name, rules)}
    />
  );
};
