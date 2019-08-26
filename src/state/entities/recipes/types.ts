import { Recipe } from "types";

export const ADD_RECIPE = "ADD_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";
export const FETCH_RECIPES_START = "FETCH_RECIPES_START";
export const FETCH_RECIPES_SUCCESS = "FETCH_RECIPES_SUCCESS";
export const FETCH_RECIPES_ERROR = "FETCH_RECIPES_ERROR";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const UPDATE_RECIPE_ERROR = "UPDATE_RECIPE_ERROR";
export const SUBMIT_RECIPE = "SUBMIT_RECIPE";
export const SUBMIT_RECIPE_ERROR = "SUBMIT_RECIPE_ERROR";

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

type RecipeFromApi = Recipe & { id: string };
interface FetchRecipesSuccessAction {
  type: typeof FETCH_RECIPES_SUCCESS;
  payload: { recipes: RecipeFromApi[] };
}

interface FetchRecipesErrorAction {
  type: typeof FETCH_RECIPES_ERROR;
  payload: { message: string };
}

interface UpdateRecipeAction {
  type: typeof UPDATE_RECIPE;
  payload: { recipe: Recipe; recipeId: string };
}

interface UpdateRecipeErrorAction {
  type: typeof UPDATE_RECIPE_ERROR;
  payload: { errorMessage: string; recipeId: string; oldRecipe: Recipe };
}

interface SubmitRecipeAction {
  type: typeof SUBMIT_RECIPE;
  payload: { recipe: Recipe };
}

interface SubmitRecipeErrorAction {
  type: typeof SUBMIT_RECIPE_ERROR;
  payload: { errorMessage: string; submittedRecipe: Recipe };
}

export type RecipeActionTypes =
  | AddRecipeAction
  | DeleteRecipeAction
  | FetchRecipesStartAction
  | FetchRecipesSuccessAction
  | FetchRecipesErrorAction
  | UpdateRecipeAction
  | UpdateRecipeErrorAction
  | SubmitRecipeAction
  | SubmitRecipeErrorAction;

export type RecipeDict = { [id: string]: Recipe };
export interface RecipeState {
  fetchStatus: { loading: boolean; error?: string };
  updateError: { error: boolean; message?: string };
  submitError: { error: boolean; message?: string };
  byId: RecipeDict;
  allIds: string[];
}
