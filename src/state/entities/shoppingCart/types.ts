import { createAction } from "redux-starter-kit";
import { ShoppingCart, ShoppingCartItem, FetchStatus } from "types";

export const fetchShoppingCartStart = createAction("shoppingCart/fetch/start");
export const fetchShoppingCartSuccess = createAction(
  "shoppingCart/fetch/success"
);
export const fetchShoppingCartError = createAction("shoppingCart/fetch/error");
export const addRecipeItems = createAction("shoppingCart/recipe/add");
// export const FETCH_SHOPPING_CART_START = "FETCH_SHOPPING_CART_START";
// export const FETCH_SHOPPING_CART_SUCCESS = "FETCH_SHOPPING_CART_SUCCESS";
// export const FETCH_SHOPPING_CART_ERROR = "FETCH_SHOPPING_CART_ERROR";
// export const ADD_RECIPE_ITEMS = "ADD_RECIPE_ITEMS";

export interface FetchShoppingCartsStartAction {
  type: typeof fetchShoppingCartStart.type;
  payload: { userId: string };
}

export interface FetchShoppingCartsSuccessAction {
  type: typeof fetchShoppingCartSuccess.type;
  payload: { shoppingCart: ShoppingCart };
}

export interface FetchShoppingCartsErrorAction {
  type: typeof fetchShoppingCartError.type;
  payload: { message: string };
}

export interface AddRecipeItemsAction {
  type: typeof addRecipeItems.type;
  payload: { items: ShoppingCartItem[] };
}

export type ShoppingCartActionTypes =
  | FetchShoppingCartsStartAction
  | FetchShoppingCartsSuccessAction
  | FetchShoppingCartsErrorAction
  | AddRecipeItemsAction;

export interface ShoppingCartState {
  fetchStatus: FetchStatus;
  itemsById: { [id: string]: ShoppingCartItem };
  allItemIds: string[];
  users: string[];
  id: string | null;
}
