import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createSelector } from "redux-starter-kit";
import { AppState } from "state/store";
import { getRecipes } from "state/entities/recipes/actions";
import { Recipe } from "types";

interface ListData {
  recipes?: Recipe[];
  loading: boolean;
  error: boolean;
  ingredientsInCart?: number;
}

function useFetchListData() {
  const state = useSelector<AppState, ListData>(state => ({
    loading: state.recipes.loading || state.shoppingCart.loading,
    error: state.recipes.error || state.shoppingCart.loading,
    recipes: state.recipes.allIds.map(x => state.recipes.byId[x]),
    shoppingCart: state.shoppingCart,
    ingredientsInCart: undefined
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRecipes());
  }, []);
  return state;
}
export { useFetchListData };
