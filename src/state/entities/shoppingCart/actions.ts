import { ThunkAction } from "redux-thunk";
import { AppState } from "state/store";
import { Action } from "redux";
import { User } from "firebase";

import {
  fetchShoppingCartStart,
  fetchShoppingCartSuccess,
  fetchShoppingCartError
} from "./types";
import { firebase } from "firebaseSetup";
import { getOrCreateUserShoppingCart } from "services/shoppingCarts";
import { ShoppingCartItem } from "types";

function getShoppingCart(): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
    const currentUser = firebase.auth().currentUser as User;
    fetchShoppingCartStart();
    try {
      const shoppingCart = await getOrCreateUserShoppingCart(currentUser.uid);
      fetchShoppingCartSuccess({ shoppingCart });
      return shoppingCart;
    } catch (error) {
      fetchShoppingCartError({ message: error });
    }
  };
}

function addRecipeItems(
  recipeItems: ShoppingCartItem[]
): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {};
}

export {
  getShoppingCart,
  addRecipeItems,
  fetchShoppingCartStart,
  fetchShoppingCartSuccess,
  fetchShoppingCartError
};
