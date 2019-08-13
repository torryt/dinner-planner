import React from "react";
import { Formik, FormikProps } from "formik";

import { RecipeForm, RecipeFormValues } from "./RecipeForm";

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
            },
            {
              name: "",
              measurementUnit: "stk",
              quantity: ""
            },
            {
              name: "",
              measurementUnit: "stk",
              quantity: ""
            }
          ],
          minutesToCook: 20
        }}
        validate={(values: RecipeFormValues) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = "Obligatorisk";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        render={(props: FormikProps<RecipeFormValues>) => (
          <RecipeForm {...props} />
        )}
      />
    </>
  );
}

export { AddRecipe };
