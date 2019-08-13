import React from "react";
import styled from "styled-components";
import { Form, Field, FieldArray, FormikProps, FieldProps } from "formik";
import { TextField } from "formik-material-ui";
import {
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
  Fab
} from "@material-ui/core";
import { SelectProps } from "@material-ui/core/Select";

import { TimeSlider } from "./TimeSlider";
import { PlusOneOutlined, Add } from "@material-ui/icons";

const StyledField = styled(Field)`
  margin-bottom: 3rem;
`;

const StyledTimeSlider = styled(TimeSlider)`
  margin-bottom: 2rem;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: bottom;
`;

const QuantityField = styled(Field)`
  max-width: 80px;
  margin-right: 1rem;
`;

const MeasurementUnitSelect = styled(Select)`
  margin-right: 1rem;
  min-width: 100px;
`;

export interface Ingredient {
  name: string;
  measurementUnit: string;
  quantity: string;
}

export interface RecipeFormValues {
  name: string;
  ingredients: Ingredient[];
  minutesToCook: number;
}
function RecipeForm(props: FormikProps<RecipeFormValues>) {
  const values = props.values;
  return (
    <Form>
      <StyledField
        name="name"
        label="Navn på retten"
        type="text"
        component={TextField}
      />

      {/* <Typography id="discrete-slider" gutterBottom>
        Tilberedningstid?
      </Typography> */}
      <StyledTimeSlider />

      {/* <Heading component="h2" variant="h6">
        Ingredienser
      </Heading> */}
      <FieldArray
        name="ingredients"
        render={arrayHelpers => (
          <div>
            {values && values.ingredients.length > 0 ? (
              values.ingredients.map((ingredient, index) => (
                <IngredientRow key={index}>
                  <QuantityField
                    name={`ingredients.${index}.quantity`}
                    label="Antall"
                    type="number"
                    component={TextField}
                  />
                  <MeasurementUnitSelect
                    // native
                    value={ingredient.measurementUnit}
                    onChange={props.handleChange(
                      `ingredients.${index}.measurementUnit`
                    )}
                    onBlur={props.handleBlur(
                      `ingredients.${index}.measurementUnit`
                    )}
                    inputProps={{
                      name: `ingredients.${index}.measurementUnit`,
                      id: `ingredients.${index}.measurementUnit`
                    }}
                  >
                    {/* <option value="stk">Stk</option>
                    <option value="dl">Desiliter</option>
                    <option value="l">Liter</option>
                    <option value="kg">Kilo</option>
                    <option value="gram">Gram</option>
                    <option value="ts">Teskjeer</option>
                    <option value="ss">Spiseskjeer</option>
                    <option value="pose">Pose</option>
                    <option value="pakke">Pakke</option>
                    <option value="klype">Klype</option> */}

                    <MenuItem value="stk">Stk</MenuItem>
                    <MenuItem value="dl">Desiliter</MenuItem>
                    <MenuItem value="l">Liter</MenuItem>
                    <MenuItem value="kg">Kilo</MenuItem>
                    <MenuItem value="gram">Gram</MenuItem>
                    <MenuItem value="ts">Teskjeer</MenuItem>
                    <MenuItem value="ss">Spiseskjeer</MenuItem>
                    <MenuItem value="pose">Pose</MenuItem>
                    <MenuItem value="pakke">Pakke</MenuItem>
                    <MenuItem value="klype">Klype</MenuItem>
                  </MeasurementUnitSelect>
                  <Field
                    name={`ingredients.${index}.name`}
                    label="Navn"
                    component={TextField}
                  />
                </IngredientRow>
              ))
            ) : (
              <div>Hello</div>
            )}
            <div>
              <Button variant="outlined" color="secondary">
                Legg til ingrediens
              </Button>
            </div>
          </div>
        )}
      />
      <Button variant="contained" color="primary">
        Lagre oppskrift
      </Button>
    </Form>
  );
}

export { RecipeForm };
