import {
  ShoppingCartActionTypes,
  ShoppingCartState,
  FetchShoppingCartsSuccessAction,
  FetchShoppingCartsErrorAction
} from "./types";
import { ShoppingCartItem, FetchStatus } from "types";
import { combineReducers } from "redux";
import { createReducer } from "redux-starter-kit";
import { keyBy } from "lodash";
import {
  fetchShoppingCartSuccess,
  fetchShoppingCartStart,
  fetchShoppingCartError
} from "./actions";

function shoppingCartItemsById(
  state: { [id: string]: ShoppingCartItem } = {},
  action: ShoppingCartActionTypes
) {
  switch (action.type) {
    case fetchShoppingCartSuccess.type:
      return keyBy(action.payload.shoppingCart.items, "id");
    default:
      return state;
  }
}

const allItemIds = createReducer([] as string[], {
  [fetchShoppingCartSuccess.type]: (
    _state,
    action: FetchShoppingCartsSuccessAction
  ) => action.payload.shoppingCart.items.map(x => x.id)
});

const users = createReducer([] as string[], {
  [fetchShoppingCartSuccess.type]: (
    _state,
    action: FetchShoppingCartsSuccessAction
  ) => action.payload.shoppingCart.users
});

const id = createReducer(null as string | null, {
  [fetchShoppingCartSuccess.type]: (
    _state,
    action: FetchShoppingCartsSuccessAction
  ) => action.payload.shoppingCart.id
});

const initialFetchStatus: FetchStatus = {
  error: false,
  errorMessage: "",
  loading: false,
  success: false
};
const fetchStatus = createReducer(initialFetchStatus, {
  [fetchShoppingCartStart.type]: () => ({
    error: false,
    loading: true,
    success: false,
    errorMessage: ""
  }),
  [fetchShoppingCartSuccess.type]: () => ({
    error: false,
    loading: false,
    success: true,
    errorMessage: ""
  }),
  [fetchShoppingCartError.type]: (
    _state,
    action: FetchShoppingCartsErrorAction
  ) => ({
    error: true,
    loading: false,
    success: false,
    errorMessage: action.payload.message
  })
});

const shoppingCartReducer = combineReducers<ShoppingCartState>({
  itemsById: shoppingCartItemsById,
  allItemIds: allItemIds,
  fetchStatus: fetchStatus,
  users: users,
  id: id
});

export { shoppingCartReducer };
