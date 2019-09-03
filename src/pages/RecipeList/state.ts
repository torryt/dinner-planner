import { AppState } from "state/store";
import { Dispatch } from "redux";
import { getRecipes } from "state/entities/recipes/actions";
import {
  getShoppingCart,
  addRecipeItems
} from "state/entities/shoppingCart/actions";
import { makeId } from "utils/getId";

function mapRecipeListRecipes(state: AppState) {
  if (
    state.recipes.allIds.length === 0 ||
    !state.shoppingCart.fetchStatus.success
  ) {
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
    (state.recipes.fetchStatus.loading ||
      state.shoppingCart.fetchStatus.loading) &&
    (!state.shoppingCart.fetchStatus.success &&
      state.recipes.allIds.length === 0)
  );
}

function mapStateToProps(state: AppState) {
  return {
    loading: isRecipeListLoading(state),
    error:
      !!state.recipes.fetchStatus.error ||
      !!state.shoppingCart.fetchStatus.error,
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
    removeFromShoppingCart: (recipeId: string) => {},
    addToShoppingCart: (recipeId: string) => {
      const ingredients = getState().recipes.byId[recipeId].ingredients;
      const shoppingCartItems = ingredients.map(x => ({
        id: makeId(),
        ...x,
        recipeId: recipeId
      }));
      dispatch<any>(addRecipeItems(shoppingCartItems));
    }
  };
}

export { mapStateToProps, mapDispatchToProps };
