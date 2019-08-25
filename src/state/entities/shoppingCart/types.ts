import { Recipe, ShoppingCart } from "types";

export const FETCH_SHOPPING_CARTS_START = "FETCH_SHOPPING_CART_START";
export const FETCH_SHOPPING_CARTS_SUCCESS = "FETCH_SHOPPING_CART_SUCCESS";
export const FETCH_SHOPPING_CARTS_ERROR = "FETCH_SHOPPING_CART_ERROR";

interface FetchShoppingCartsStartAction {
  type: typeof FETCH_SHOPPING_CARTS_START;
  payload: { userId: string };
}

interface FetchShoppingCartsSuccessAction {
  type: typeof FETCH_SHOPPING_CARTS_SUCCESS;
  payload: { shoppingCart: ShoppingCart };
}

interface FetchShoppingCartsErrorAction {
  type: typeof FETCH_SHOPPING_CARTS_ERROR;
  payload: { message: string };
}

export type ShoppingCartActionTypes =
  | FetchShoppingCartsStartAction
  | FetchShoppingCartsSuccessAction
  | FetchShoppingCartsErrorAction;

export interface ShoppingCartState {
  loading: boolean;
  error: boolean;
  errorMessage: string;
  value?: ShoppingCart;
}
