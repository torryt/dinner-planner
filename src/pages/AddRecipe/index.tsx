import React from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";

import { RecipeForm } from "./RecipeForm";
import { submitRecipe } from "./submitRecipe";

function AddRecipe() {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          ingredients: [
            {
              name: "",
              measurementUnit: "stk",
              quantity: ""
            }
          ],
          minutesToCook: 25
        }}
        validate={(values: Recipe) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = "Obligatorisk";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await submitRecipe(values);
          setSubmitting(false);
        }}
        render={(props: FormikProps<Recipe>) => <RecipeForm {...props} />}
      />
    </>
  );
}

export { AddRecipe };
