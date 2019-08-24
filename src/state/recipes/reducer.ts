import { RecipeActionTypes } from "./types";

function recipes(state = {}, action: RecipeActionTypes) {
  switch (action.type) {
    case "FETCH_RECIPES_START":
      return {
        ...state
      };
    case "FETCH_RECIPES_SUCCESS":
      return {
        ...state
      };
    case "FETCH_RECIPES_ERROR": {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}

export { recipes };
