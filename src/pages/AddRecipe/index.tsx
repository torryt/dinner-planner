import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";
import * as yup from "yup";

import { RecipeForm } from "../../components/RecipeForm";
import { submitRecipe } from "./submitRecipe";
import { Redirect } from "react-router";
import { ErrorPage } from "components/ErrorPage";

let validationSchema = yup.object().shape({
  name: yup.string().required()
});

function AddRecipe() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recipeId, setRecipeId] = useState<string>("");
  if (success) {
    return <Redirect to={`/recipes/${recipeId}`} />;
  }
  if (error) {
    return <ErrorPage />;
  }
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
              quantity: 1
            }
          ],
          numberOfPortions: 4,
          minutesToCook: 25
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await submitRecipe(values);
            setSubmitting(false);
            setRecipeId(response.id);
            setSuccess(true);
            setError(false);
          } catch (err) {
            setError(true);
          }
        }}
        render={(props: FormikProps<Recipe>) => <RecipeForm {...props} />}
      />
    </>
  );
}

export { AddRecipeBar } from "./AddRecipeBar";
export { AddRecipe };
