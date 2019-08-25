import { keyBy } from "lodash";
import { RecipeActionTypes, RecipeState } from "./types";

const initialState: RecipeState = {
  loading: false,
  error: false,
  errorMessage: "",
  byId: {},
  allIds: []
};

function recipes(
  state: RecipeState = initialState,
  action: RecipeActionTypes
): RecipeState {
  switch (action.type) {
    case "FETCH_RECIPES_START":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "FETCH_RECIPES_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        byId: keyBy(action.payload.recipes, "id"),
        allIds: action.payload.recipes.map(x => x.id)
      };
    case "FETCH_RECIPES_ERROR": {
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
      };
    }
    default:
      return state;
  }
}

export { recipes };
