import { combineReducers } from "redux";
import { recipes } from "./recipes/reducer";
import { shoppingCarts } from "./shoppingCarts/reducer";

const rootReducer = combineReducers({
  recipes,
  shoppingCarts
});

export default rootReducer;
