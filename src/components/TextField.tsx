import React from "react";
import { FieldProps } from "formik";
import { TextField as MuiTextField } from "@material-ui/core";
import { TextFieldProps as MuiTextFieldProps } from "@material-ui/core/TextField";

interface TextFieldBaseProps {
  touched?: boolean;
}

type TextFieldProps = FieldProps & MuiTextFieldProps & TextFieldBaseProps;
// interface TextFieldPropss extends FieldProps, TextFieldProps {
//   touched?: boolean;
//   label?: string;
//   className?: string;
// }
function TextField(props: TextFieldProps) {
  return (
    <MuiTextField
      {...props.field}
      {...props}
      type="text"
      label={props.label}
      className={props.className}
      helperText={props.touched && props.error ? "Obligatorisk felt" : ""}
      error={!!(props.touched && props.error)}
    />
  );
}
export { TextField };
