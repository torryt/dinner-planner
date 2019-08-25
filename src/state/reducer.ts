import { combineReducers } from "redux";
import { recipes } from "./entities/recipes/reducer";
import { shoppingCart } from "./entities/shoppingCart/reducer";

const rootReducer = combineReducers({
  recipes,
  shoppingCart
});

export default rootReducer;
