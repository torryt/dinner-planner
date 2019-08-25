import { ThunkAction } from "redux-thunk";
import { AppState } from "state/store";
import { Action } from "redux";
import { User } from "firebase";

import {
  FETCH_SHOPPING_CART_ERROR,
  FETCH_SHOPPING_CART_START,
  FETCH_SHOPPING_CART_SUCCESS
} from "./types";
import { firebase } from "firebaseSetup";
import { getOrCreateUserShoppingCart } from "services/shoppingCarts";

function getShoppingCart(): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
    const currentUser = firebase.auth().currentUser as User;
    dispatch({
      type: FETCH_SHOPPING_CART_START
    });
    try {
      const shoppingCart = await getOrCreateUserShoppingCart(currentUser.uid);
      dispatch({
        type: FETCH_SHOPPING_CART_SUCCESS,
        payload: { shoppingCart }
      });
      return shoppingCart;
    } catch (error) {
      dispatch({
        type: FETCH_SHOPPING_CART_ERROR,
        payload: { message: error }
      });
    }
  };
}

export { getShoppingCart };
