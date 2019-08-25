import { ShoppingCartActionTypes, ShoppingCartState } from "./types";

const initialState = {
  loading: false,
  error: false,
  errorMessage: "",
  value: undefined
};
function shoppingCart(
  state: ShoppingCartState = initialState,
  action: ShoppingCartActionTypes
): ShoppingCartState {
  switch (action.type) {
    case "FETCH_SHOPPING_CART_START":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "FETCH_SHOPPING_CART_SUCCESS":
      return {
        ...state,
        loading: false,
        error: false,
        value: action.payload.shoppingCart
      };
    case "FETCH_SHOPPING_CART_ERROR": {
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

export { shoppingCart };
