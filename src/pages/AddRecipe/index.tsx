import React, { useState } from "react";
import { Formik, FormikProps } from "formik";
import { Recipe } from "types";
import * as yup from "yup";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { ingredientCategories } from "consts";
import { RecipeForm } from "components/RecipeForm";
import { PageWrapper } from "components/PageWrapper";
import { AddRecipeBar } from "./AddRecipeBar";
import { submitRecipe as submitRecipeThunk } from "state/entities/recipes/actions";
import { useEffectOnce } from "react-use";
import { makeId } from "utils/getId";
import debugModule from "debug";

const debug = debugModule("dinner-planner:add-recipe");

let validationSchema = yup.object().shape({
  name: yup.string().required()
});

interface AddRecipeProps {
  submitRecipe: (recipe: Recipe) => void;
}
function AddRecipeComponent(props: AddRecipeProps) {
  const [success, setSuccess] = useState(false);
  const [recipeId, setRecipeId] = useState<string>("");
  useEffectOnce(() => {
    setRecipeId(makeId());
  });
  if (success) {
    return <Redirect to={`/recipes/${recipeId}`} />;
  }
  if (!recipeId) {
    return null;
  }
  debug("Generated recipe id", recipeId);
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
              quantity: 1,
              category: ingredientCategories.FRUIT
            }
          ],
          numberOfPortions: 4,
          minutesToCook: 30
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          props.submitRecipe({ ...values, id: recipeId });
          setSuccess(true);
        }}
        render={(props: FormikProps<Recipe>) => (
          <PageWrapper renderAppBar={AddRecipeBar}>
            {(wrapperProps: any) => <RecipeForm {...props} {...wrapperProps} />}
          </PageWrapper>
        )}
      />
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submitRecipe: (recipe: Recipe) => dispatch<any>(submitRecipeThunk(recipe))
});

const AddRecipe = connect(
  undefined,
  mapDispatchToProps
)(AddRecipeComponent);

export { AddRecipe };
