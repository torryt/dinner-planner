import React from "react";
import { Field } from "formik";
import { Select } from "@material-ui/core";
import { ingredientCategoryNames } from "consts";

interface IngredientCategorySelectProps {
  field: {
    onChange: () => {};
    name: string;
    value: string;
  };
  className: string;
}
function IngredientCategorySelect(props: IngredientCategorySelectProps) {
  return (
    <Select
      className={props.className}
      onChange={props.field.onChange}
      value={props.field.value}
      native
      inputProps={{
        name: props.field.name,
        id: `${props.field.name}-ingredient-select`
      }}
    >
      {Object.keys(ingredientCategoryNames).map(x => (
        <option value={x}>{ingredientCategoryNames[x]}</option>
      ))}
    </Select>
  );
}

function IngredientCategoryInput({ name, ...restProps }: { name: string }) {
  return (
    <Field {...restProps} name={name} component={IngredientCategorySelect} />
  );
}

export { IngredientCategoryInput };
