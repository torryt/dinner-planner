import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";

import { RecipeForm } from "components/RecipeForm";
import { updateRecipe } from "./updateRecipe";
import { RouteComponentProps, Redirect } from "react-router";
import { useFetchDocument } from "hooks/useFetchDocument";
import { PageProgress } from "components/PageProgress";
import { ErrorPage } from "components/ErrorPage";

function EditRecipe({
  match: {
    params: { id }
  }
}: RouteComponentProps<{ id: string }>) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recipe] = useFetchDocument<Recipe>("recipes", id);
  if (!recipe) {
    return <PageProgress />;
  }
  if (success) {
    return <Redirect to={`/recipes/${id}`} />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <Formik
        initialValues={recipe}
        validate={(values: Recipe) => {
          let errors: any = {};
          if (!values.name) {
            errors.name = "Obligatorisk";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateRecipe(values, id);
            setSubmitting(false);
            setSuccess(true);
            setError(false);
          } catch (err) {
            setError(true);
          }
          await updateRecipe(values, id);
          setSubmitting(false);
        }}
        render={(props: FormikProps<Recipe>) => <RecipeForm {...props} />}
      />
    </>
  );
}

export { EditRecipeBar } from "./EditRecipeBar";
export { EditRecipe };
