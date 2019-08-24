import { Recipe } from "types";

export const ADD_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FETCH_RECIPES_START = "FETCH_RECIPES_START";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_RECIPES_ERROR = "FETCH_RECIPES_ERROR";

interface AddRecipeAction {
  type: typeof ADD_RECIPE;
  payload: Recipe;
}

interface DeleteRecipeAction {
  type: typeof DELETE_RECIPE;
}

interface FetchRecipesStartAction {
  type: typeof FETCH_RECIPES_START;
  payload: { userId: string };
}

interface FetchRecipesSuccessAction {
  type: typeof FETCH_RECIPES_SUCCESS;
  payload: { recipes: Recipe[] };
}

interface FetchRecipesErrorAction {
  type: typeof FETCH_RECIPES_ERROR;
  payload: { message: string };
}

export type RecipeActionTypes =
  | AddRecipeAction
  | DeleteRecipeAction
  | FetchRecipesStartAction
  | FetchRecipesSuccessAction
  | FetchRecipesErrorAction;
