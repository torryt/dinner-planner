import { ThunkAction } from "redux-thunk";
import { AppState } from "state/store";
import { Action, Dispatch } from "redux";
import { User } from "firebase";

import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_ERROR,
  FETCH_RECIPES_SUCCESS,
  UPDATE_RECIPE_ERROR,
  UPDATE_RECIPE,
  SUBMIT_RECIPE,
  SUBMIT_RECIPE_ERROR
} from "./types";
import { firebase } from "firebaseSetup";
import {
  fetchRecipes,
  updateRecipe as updateRecipeAsync,
  submitRecipe as submitRecipeAsync
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

function updateRecipe(
  recipe: Recipe,
  recipeId: string
): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
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

function submitRecipe(
  recipe: Recipe
): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
    dispatch({
      type: SUBMIT_RECIPE,
      payload: { recipe }
    });
    try {
      await submitRecipeAsync(recipe);
    } catch (error) {
      dispatch({
        type: SUBMIT_RECIPE_ERROR,
        payload: { errorMessage: error, oldRecipe: recipe }
      });
    }
  };
}
export { getRecipes, updateRecipe, submitRecipe };
