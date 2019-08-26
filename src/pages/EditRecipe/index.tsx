import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";

import { RecipeForm } from "components/RecipeForm";
import { RouteComponentProps, Redirect } from "react-router";
import { PageProgress } from "components/PageProgress";
import { ErrorPage } from "components/ErrorPage";
import { PageWrapper } from "components/PageWrapper";
import { EditRecipeBar } from "./EditRecipeBar";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { AppState } from "state/store";
import { RecipeDict } from "state/entities/recipes/types";
import { updateRecipe, getRecipes } from "state/entities/recipes/actions";
import { useEffectOnce } from "react-use";

interface EditRecipeProps extends RouteComponentProps<{ id: string }> {
  updateRecipeValues: (recipe: Recipe, recipeId: string) => void;
  fetchRecipes: () => void;
  recipesById: RecipeDict;
  isError: boolean;
}
function EditRecipeComponent({
  match: {
    params: { id }
  },
  updateRecipeValues,
  fetchRecipes,
  recipesById,
  isError
}: EditRecipeProps) {
  useEffectOnce(() => {
    fetchRecipes();
  });
  const [success, setSuccess] = useState(false);
  const recipe = recipesById[id];

  if (!recipe) {
    return <PageProgress />;
  }
  if (success) {
    return <Redirect to={`/recipes/${id}`} />;
  }
  if (isError) {
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
        onSubmit={async values => {
          updateRecipeValues(values, id);
          setSuccess(true);
        }}
        render={(props: FormikProps<Recipe>) => (
          <PageWrapper renderAppBar={() => <EditRecipeBar recipeId={id} />}>
            {() => <RecipeForm {...props} />}
          </PageWrapper>
        )}
      />
    </>
  );
}

const mapStateToProps = (state: AppState) => ({
  recipesById: state.recipes.byId,
  isError: state.recipes.updateError.error || !!state.recipes.fetchStatus.error,
  loading: state.recipes.fetchStatus.loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateRecipeValues: (recipe: Recipe, recipeId: string) =>
    dispatch<any>(updateRecipe(recipe, recipeId)),
  fetchRecipes: () => dispatch<any>(getRecipes())
});

const EditRecipe = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipeComponent);

export { EditRecipe };
