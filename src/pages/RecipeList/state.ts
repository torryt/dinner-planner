import { AppState } from "state/store";
import { Dispatch } from "redux";
import { getRecipes } from "state/entities/recipes/actions";
import { getShoppingCart } from "state/entities/shoppingCart/actions";

function mapRecipeListRecipes(state: AppState) {
  if (state.recipes.allIds.length === 0 || !state.shoppingCart.value) {
    return [];
  }
  return state.recipes.allIds.map(x => ({
    ...state.recipes.byId[x],
    // isInShoppingCart: shoppingCart.recipes.includes(x) TODO: this
    isInShoppingCart: false
  }));
}

function isRecipeListLoading(state: AppState) {
  return (
    (state.recipes.fetchStatus.loading || state.shoppingCart.loading) &&
    (!state.shoppingCart.value && state.recipes.allIds.length === 0)
  );
}

function mapStateToProps(state: AppState) {
  return {
    loading: isRecipeListLoading(state),
    error: !!state.recipes.fetchStatus.error || state.shoppingCart.error,
    recipes: mapRecipeListRecipes(state),
    ingredientsInCart: undefined
  };
}

function mapDispatchToProps(dispatch: Dispatch, getState: () => AppState) {
  return {
    fetchInitialData: () => {
      dispatch<any>(getRecipes());
      dispatch<any>(getShoppingCart());
    },
    addToShoppingCart: () => {},
    removeFromShoppingCart: () => {}
  };
}

export { mapStateToProps, mapDispatchToProps };
