import React from "react";
import styled from "styled-components";
import { Form, Field, FieldArray, FormikProps } from "formik";
import { TextField, TextFieldProps } from "formik-material-ui";
import { Button, IconButton, Typography } from "@material-ui/core";

import { TimeSlider } from "../pages/AddRecipe/TimeSlider";
import { Delete } from "@material-ui/icons";
import { Recipe } from "types";

const StyledField = styled(Field)`
  margin-bottom: 2rem;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: flex-end;
`;

const QuantityField = styled(Field)`
  max-width: 80px;
  margin-right: 1rem;
`;

const MeasurementUnitField = styled(Field)`
  max-width: 80px;
  margin-right: 1rem;
`;

const SubmitButton = styled(Button)``;

const AddIngredientButton = styled(Button)`
  margin: 1rem 0 2rem;
`;

const TextAreaWrapper = styled.div`
  margin-bottom: 1rem;
`;

const FullWidthTextField = (props: TextFieldProps) => (
  <TextField {...props} fullWidth />
);

const StyledNumberOfPortionsField = styled(Field)`
  margin-bottom: 2rem;
`;
const NumberOfPortionsField = () => (
  <StyledNumberOfPortionsField
    name="numberOfPortions"
    label="Antall porsjoner"
    type="number"
    component={TextField}
  />
);

function RecipeForm(props: FormikProps<Recipe>) {
  const values = props.values;
  return (
    <Form>
      <StyledField
        name="name"
        label="Navn på retten"
        type="text"
        component={FullWidthTextField}
      />

      <TimeSlider
        onChange={(_, value) => props.setFieldValue("minutesToCook", value)}
        onBlur={() => props.setFieldTouched("minutesToCook")}
        value={props.values.minutesToCook}
        name="minutesToCook"
      />
      <Field component={NumberOfPortionsField} />
      <FieldArray
        name="ingredients"
        render={arrayHelpers => (
          <>
            {values.ingredients.map((ingredient, index) => (
              <IngredientRow key={index}>
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
                {index !== 0 && (
                  <IconButton
                    aria-label="delete"
                    onClick={() => arrayHelpers.remove(index)}
                    size="small"
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                )}
              </IngredientRow>
            ))}
            <div>
              <AddIngredientButton
                aria-label="Legg til ingrediens"
                variant="outlined"
                color="secondary"
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
          render={(props: TextFieldProps) => (
            <TextField
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
