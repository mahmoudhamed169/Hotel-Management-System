import { useState } from "react";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

interface PasswordTextFieldProps {
  placeholder: string;
  errors: any;
  name: string;
  register: UseFormRegister<FieldValues>;
  rules?: RegisterOptions;
}

export function PasswordTextField({
  placeholder,
  errors,
  name,
  register,
  rules,
}: PasswordTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      placeholder={placeholder}
      type={showPassword ? "text" : "password"}
      error={!!errors}
      helperText={errors ? errors.message : ""}
      InputProps={{
        sx: {
          backgroundColor: "#F5F6F8",
          "& input": {
            padding: "12px 16px",
          },
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
              onMouseUp={(e) => e.preventDefault()}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        marginTop: "3px",
        width: "100%",
      }}
      {...register(name, rules)}
    />
  );
}
