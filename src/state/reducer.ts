import { combineReducers } from "redux";
import { recipesReducer } from "./entities/recipes/reducer";
import { shoppingCart } from "./entities/shoppingCart/reducer";
import { AppState } from "./store";

const rootReducer = combineReducers<AppState>({
  recipes: recipesReducer,
  shoppingCart
});

export default rootReducer;
