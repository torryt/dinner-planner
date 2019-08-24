import { ShoppingCartActionTypes } from "./types";

function shoppingCarts(state = {}, action: ShoppingCartActionTypes) {
  switch (action.type) {
    case "FETCH_SHOPPING_CARTS_START":
      return {
        ...state
      };
    case "FETCH_SHOPPING_CARTS_SUCCESS":
      return {
        ...state
      };
    case "FETCH_SHOPPING_CARTS_ERROR": {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}

export { shoppingCarts };
