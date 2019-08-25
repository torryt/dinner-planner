import { AppState } from "state/store";
import { Dispatch } from "redux";
import { getRecipes } from "state/entities/recipes/actions";

function mapStateToProps(state: AppState) {
  return {
    recipesById: state.recipes.byId,
    error: state.recipes.error
  };
}

function mapDispatchToProps(dispatch: Dispatch, getState: () => AppState) {
  return {
    loadRecipes: () => dispatch<any>(getRecipes())
  };
}

export { mapStateToProps, mapDispatchToProps };
