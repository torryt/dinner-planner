import React from "react";
import styled from "styled-components";
import { List, Fab, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { parse } from "query-string";
import { useAsyncFn } from "react-use";
import { Redirect } from "react-router";
import { User } from "firebase";

import { AdapterLink } from "components/Link";
import { PageProgress } from "components/PageProgress";
import { PageWrapper } from "components/PageWrapper";
import { ErrorPage } from "components/ErrorPage";
import { RecipeListItem } from "./RecipeListItem";
import { firebase } from "../../firebaseSetup";
import { RecipeListBar } from "./RecipeListBar";
import { useFetchListData } from "./useFetchListData";

import debugModule from "debug";
import { useShoppingCart } from "services/shoppingCarts/useShoppingCart";

const StyledList = styled(List)`
  margin-left: -1rem;
  width: calc(100% + 2rem);
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

function undoDeleteRecipe(recipeId: string) {
  return async () => {
    const db = firebase.firestore();
    return await db
      .collection("recipes")
      .doc(recipeId)
      .update({ isDeleted: false })
      .then(() => ({ success: true }));
  };
}

function RecipeList() {
  const currentUser = firebase.auth().currentUser as User;

  const queryParams = parse(window.location.search);
  const deletedRecipeId = queryParams.deletedRecipeId as string;

  const data = useFetchListData();
  // const [recipes, recipesState] = useFetchCollection<Recipe>(
  //   "recipes",
  //   recipeFilter
  // );

  const cartState = useShoppingCart(currentUser.uid);

  const [deleteRecipeState, deleteTrigger] = useAsyncFn(
    undoDeleteRecipe(deletedRecipeId),
    [deletedRecipeId]
  );
  const classes = useStyles();

  if (deleteRecipeState.error || data.error || cartState.error) {
    return <ErrorPage />;
  }
  if (data.loading || cartState.loading || !data.recipes || !cartState.value) {
    return <PageProgress />;
  }
  if (deleteRecipeState.value) {
    return <Redirect to={`/recipes/${deletedRecipeId}`} />;
  }
  const recipes = data.recipes;
  const shoppingCart = cartState.value;
  const mappedRecipes = recipes.map(x => ({
    ...x,
    isInShoppingCart: shoppingCart
      ? shoppingCart.recipes.includes(x.id as string)
      : false
  }));

  const recipeComponents = mappedRecipes.map(x => (
    <RecipeListItem recipe={x} key={x.id} />
  ));
  return (
    <PageWrapper renderAppBar={() => <RecipeListBar />}>
      {deletedRecipeId ? (
        <div>
          Oppskriften er slettet.{" "}
          <Button onClick={deleteTrigger} disabled={deleteRecipeState.loading}>
            {deleteRecipeState.loading || deleteRecipeState.value ? (
              <CircularProgress size={25} />
            ) : (
              "Angre?"
            )}
          </Button>
        </div>
      ) : null}
      <StyledList>{recipeComponents}</StyledList>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="legg til ny oppskrift"
        to="/recipes/add"
        component={AdapterLink}
      >
        <Add />
      </Fab>
    </PageWrapper>
  );
}

export { RecipeListBar } from "./RecipeListBar";
export { RecipeList };
