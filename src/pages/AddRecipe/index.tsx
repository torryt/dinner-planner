import React from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";

import { RecipeForm } from "../../components/RecipeForm";
import { submitRecipe } from "./submitRecipe";

function AddRecipe() {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          ingredients: [
            {
              name: "",
              measurementUnit: "stk",
              quantity: ""
            }
          ],
          numberOfPortions: 4,
          minutesToCook: 25
        }}
        validate={(values: Recipe) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = "Obligatorisk";
          }
          if (!values.description) {
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
