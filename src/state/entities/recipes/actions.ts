import { ThunkAction } from "redux-thunk";
import { AppState } from "state/store";
import { Action, Dispatch } from "redux";
import { User } from "firebase";

import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_ERROR,
  FETCH_RECIPES_SUCCESS,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE
} from "./types";
import { firebase } from "firebaseSetup";
import {
  fetchRecipes,
  updateRecipe as updateRecipeAsync
} from "services/recipes";
import { Recipe } from "types";

function getRecipes(): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
    const currentUser = firebase.auth().currentUser as User;
    dispatch({
      type: FETCH_RECIPES_START
    });
    try {
      const recipes = await fetchRecipes(currentUser.uid);
      dispatch({
        type: FETCH_RECIPES_SUCCESS,
        payload: { recipes }
      });
      return recipes;
    } catch (error) {
      dispatch({
        type: FETCH_RECIPES_ERROR,
        payload: { message: error }
      });
    }
  };
}

function updateRecipe(dispatch: Dispatch) {
  return async (recipe: Recipe, recipeId: string) => {
    dispatch({
      type: UPDATE_RECIPE,
      payload: { recipe, recipeId }
    });
    try {
      await updateRecipeAsync(recipe, recipeId);
    } catch (error) {
      dispatch({
        type: UPDATE_RECIPE_ERROR,
        payload: { recipeId, errorMessage: error, oldRecipe: recipe }
      });
    }
  };
}
export { getRecipes, updateRecipe };
