import { combineReducers } from "redux";
import { recipes } from "./entities/recipes/reducer";
import { shoppingCart } from "./entities/shoppingCart/reducer";
import { AppState } from "./store";

const rootReducer = combineReducers({
  recipes,
  shoppingCart
});

export default rootReducer;
