import { combineReducers } from "redux";
import { recipesReducer } from "./entities/recipes/reducer";
import { shoppingCartReducer } from "./entities/shoppingCart/reducer";
import { AppState } from "./store";

const rootReducer = combineReducers<AppState>({
  recipes: recipesReducer,
  shoppingCart: shoppingCartReducer
});

export default rootReducer;
