import { ThunkAction } from "redux-thunk";
import { AppState } from "state/store";
import { Action } from "redux";
import { User } from "firebase";

import {
  FETCH_RECIPES_START,
  FETCH_RECIPES_ERROR,
  FETCH_RECIPES_SUCCESS
} from "./types";
import { firebase } from "../../../firebaseSetup";
import { fetchRecipes } from "../../../services/recipes";

function getRecipes(): ThunkAction<void, AppState, null, Action<string>> {
  return async dispatch => {
    const currentUser = firebase.auth().currentUser as User;
    dispatch({
      type: FETCH_RECIPES_START
    });
    try {
      const recipes = await fetchRecipes(currentUser.uid);
      dispatch({
        type: FETCH_RECIPES_SUCCESS,
        payload: { recipes }
      });
      return recipes;
    } catch (error) {
      dispatch({
        type: FETCH_RECIPES_ERROR,
        payload: { message: error }
      });
    }
  };
}

export { getRecipes };
