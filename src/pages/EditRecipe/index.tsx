import React from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";

import { RecipeForm } from "components/RecipeForm";
import { updateRecipe } from "./updateRecipe";
import { RouteComponentProps } from "react-router";
import { useFetchDocument } from "hooks/useFetchDocument";
import { PageProgress } from "components/PageProgress";

function EditRecipe({
  match: {
    params: { id }
  }
}: RouteComponentProps<{ id: string }>) {
  const [recipe] = useFetchDocument<Recipe>("recipes", id);
  if (!recipe) {
    return <PageProgress />;
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
          await updateRecipe(values, id);
          setSubmitting(false);
        }}
        render={(props: FormikProps<Recipe>) => <RecipeForm {...props} />}
      />
    </>
  );
}

export { EditRecipe };
