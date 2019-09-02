import React from "react";
import styled from "styled-components";
import { Form, Field, FieldArray, FormikProps, FieldProps } from "formik";
import { Button, IconButton, Typography, Divider } from "@material-ui/core";

import { TimeSlider } from "../../pages/AddRecipe/TimeSlider";
import { Delete } from "@material-ui/icons";
import { Recipe } from "types";
import { TextField } from "components/TextField";
import { IngredientCategoryInput } from "./IngredientCategorySelect";

const StyledField = styled(Field)`
  margin-bottom: 2rem;
`;

const IngredientRow1 = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const IngredientRow2 = styled.div`
  display: flex;
`;

const QuantityField = styled(Field)`
  max-width: 40px;
  margin-right: 1rem;
`;

const MeasurementUnitField = styled(Field)`
  max-width: 80px;
  margin-right: 1rem;
`;

const SubmitButton = styled(Button)`
  margin-bottom: 2rem;
`;

const AddIngredientButton = styled(Button)`
  margin-bottom: 2rem;
`;

const TextAreaWrapper = styled.div`
  margin-bottom: 1rem;
`;

const StyledNumberOfPortionsField = styled(TextField)`
  margin-bottom: 2rem;
`;

const IngredientDivider = styled(Divider)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyledIngredientCategoryInput = styled(IngredientCategoryInput)`
  margin-right: 12px;
`;
const NumberOfPortionsField = (props: { label: string; field: any }) => {
  return (
    <StyledNumberOfPortionsField
      {...props.field}
      name={props.field.name}
      label={props.label}
      type="number"
    />
  );
};

function RecipeForm(props: FormikProps<Recipe>) {
  const values = props.values;
  return (
    <Form>
      <StyledField
        name="name"
        label="Navn på retten"
        type="text"
        fullWidth
        component={TextField}
        touched={props.touched.name}
        error={!!props.errors.name}
      />

      <TimeSlider
        onChange={(_, value) => props.setFieldValue("minutesToCook", value)}
        onBlur={() => props.setFieldTouched("minutesToCook")}
        value={props.values.minutesToCook}
        name="minutesToCook"
      />
      <Field
        name="numberOfPortions"
        label="Antall porsjoner"
        type="number"
        component={NumberOfPortionsField}
      />
      <FieldArray
        name="ingredients"
        render={arrayHelpers => (
          <>
            {values.ingredients.map((ingredient, index) => (
              <>
                <IngredientRow1 key={index}>
                  <QuantityField
                    name={`ingredients.${index}.quantity`}
                    label="Antall"
                    type="number"
                    component={TextField}
                  />
                  <MeasurementUnitField
                    name={`ingredients.${index}.measurementUnit`}
                    label="Måleenhet"
                    type="text"
                    component={TextField}
                  />
                  <Field
                    name={`ingredients.${index}.name`}
                    label="Navn"
                    component={TextField}
                  />
                </IngredientRow1>
                <IngredientRow2>
                  <StyledIngredientCategoryInput
                    name={`ingredients.${index}.category`}
                  />
                  {index !== 0 && (
                    <IconButton
                      aria-label="delete"
                      onClick={() => arrayHelpers.remove(index)}
                      size="small"
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                </IngredientRow2>

                {(index !== values.ingredients.length - 1 || true) && (
                  <IngredientDivider />
                )}
              </>
            ))}
            <div>
              <AddIngredientButton
                aria-label="Legg til ingrediens"
                variant="outlined"
                color="primary"
                onClick={() =>
                  arrayHelpers.push({
                    name: "",
                    measurementUnit: "stk",
                    quantity: ""
                  })
                }
              >
                Legg til ingrediens
              </AddIngredientButton>
            </div>
          </>
        )}
      />
      <TextAreaWrapper>
        <Typography variant="h6" component="h2">
          Beskrivelse
        </Typography>
        <Field
          name="description"
          label="Beskrivelse"
          render={(props: FieldProps) => (
            <TextField
              {...props.field}
              {...props}
              multiline
              fullWidth
              variant="outlined"
              rows={8}
            />
          )}
        />
      </TextAreaWrapper>

      <SubmitButton
        type="submit"
        disabled={props.isSubmitting}
        aria-label="Lagre oppskrift"
        variant="contained"
        color="primary"
      >
        Lagre oppskrift
      </SubmitButton>
    </Form>
  );
}

export { RecipeForm };
