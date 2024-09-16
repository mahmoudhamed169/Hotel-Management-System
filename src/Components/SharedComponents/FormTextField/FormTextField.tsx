import { InputAdornment, TextField } from "@mui/material";
import { ReactNode } from "react";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";
interface FormTextFieldType {
  placeholder: string;
  errors: any;
  name: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
  icon?: ReactNode;
  type?: string;
}
export const FormTextField = ({
  placeholder,
  errors,
  name,
  register,
  rules,
  icon = null,
  type = "text",
}: FormTextFieldType) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      error={!!errors}
      helperText={errors ? errors.message : ""}
      InputProps={{
        sx: {
          "& input": {
            padding: "12px 16px",
          },
        },
        endAdornment: icon ? (
          <InputAdornment
            sx={{ cursor: "pointer" }}
            onMouseUp={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
            position="end"
          >
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
