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
  setShowPassword?: (show: boolean) => void;
  showPassword?: boolean;
}
export const FormTextField = ({
  placeholder,
  errors,
  name,
  register,
  rules,
  icon = null,
  type = "text",
  setShowPassword,
  showPassword,
}: FormTextFieldType) => {
  return (
    <TextField
      placeholder={placeholder}
      type={type}
      error={!!errors}
      helperText={errors ? errors.message : ""}
      InputProps={{
        sx: {
          backgroundColor: "rgba(245, 246, 248, 1)",
          "& input": {
            padding: "12px 16px",
          },
        },
        endAdornment: icon ? (
          <InputAdornment
            sx={{ cursor: "pointer" }}
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
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
