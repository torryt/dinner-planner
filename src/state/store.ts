import thunkMiddleware from "redux-thunk";
import { configureStore } from "redux-starter-kit";

import rootReducer from "./reducer";
import { RecipeState } from "./entities/recipes/types";
import { ShoppingCartState } from "./entities/shoppingCart/types";

export interface AppState {
  recipes: RecipeState;
  shoppingCart: ShoppingCartState;
}

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  devTools: true
});

export { store };
