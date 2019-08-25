import { keyBy } from "lodash";
import { RecipeActionTypes, RecipeState } from "./types";
import { combineReducers } from "redux";
import { Recipe } from "types";

function recipesById(
  state: { [id: string]: Recipe } = {},
  action: RecipeActionTypes
) {
  switch (action.type) {
    case "FETCH_RECIPES_SUCCESS":
      return keyBy(action.payload.recipes, "id");
    case "UPDATE_RECIPE":
      return {
        ...state,
        [action.payload.recipeId]: action.payload.recipe
      };
    case "UPDATE_RECIPE_ERROR": {
      return {
        ...state,
        [action.payload.recipeId]: action.payload.oldRecipe
      };
    }
    default:
      return state;
  }
}

function allRecipeIds(state: string[] = [], action: RecipeActionTypes) {
  switch (action.type) {
    case "FETCH_RECIPES_SUCCESS":
      return action.payload.recipes.map(x => x.id);
    default:
      return state;
  }
}

function fetchStatus(
  state: { loading: boolean; error?: string } = {
    loading: false,
    error: undefined
  },
  action: RecipeActionTypes
) {
  switch (action.type) {
    case "FETCH_RECIPES_START":
      return {
        loading: true,
        error: undefined
      };
    case "FETCH_RECIPES_SUCCESS":
      return {
        loading: false,
        error: undefined
      };
    case "FETCH_RECIPES_ERROR": {
      return {
        loading: false,
        error: "Could not fetch recipes"
      };
    }
    default:
      return state;
  }
}

function updateError(
  state: { error: boolean; message?: string } = {
    error: false,
    message: undefined
  },
  action: RecipeActionTypes
) {
  switch (action.type) {
    case "UPDATE_RECIPE":
      return {
        error: false,
        message: undefined
      };
    case "UPDATE_RECIPE_ERROR": {
      return {
        error: true,
        message: undefined
      };
    }
    default:
      return state;
  }
}

const recipesReducer = combineReducers<RecipeState>({
  byId: recipesById,
  allIds: allRecipeIds,
  fetchStatus,
  updateError
});

export { recipesReducer };
