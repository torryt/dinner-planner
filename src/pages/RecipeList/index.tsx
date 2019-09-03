import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { List, Fab, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { parse } from "query-string";
import { useAsyncFn, useEffectOnce } from "react-use";
import { Redirect } from "react-router";

import { AdapterLink } from "components/Link";
import { PageProgress } from "components/PageProgress";
import { PageWrapper } from "components/PageWrapper";
import { RecipeListItem } from "./RecipeListItem";
import { firebase } from "firebaseSetup";
import { RecipeListBar } from "./RecipeListBar";
import { mapStateToProps, mapDispatchToProps } from "./state";
import { Recipe } from "types";

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

interface RecipeListProps {
  loading: boolean;
  error: boolean;
  recipes: (Recipe & { isInShoppingCart: boolean })[];
  ingredientsInCart?: number;
  fetchInitialData: () => void;
  addToShoppingCart: (recipeId: string) => void;
  removeFromShoppingCart: (recipeId: string) => void;
}
function RecipeListComponent(props: RecipeListProps) {
  const queryParams = parse(window.location.search);
  const deletedRecipeId = queryParams.deletedRecipeId as string;

  useEffectOnce(() => {
    props.fetchInitialData();
  });
  const classes = useStyles();

  const [deleteRecipeState, deleteTrigger] = useAsyncFn(
    undoDeleteRecipe(deletedRecipeId),
    [deletedRecipeId]
  );

  if (props.error) {
    throw Error("Kunne ikke laste oppskrifter");
  }
  if (props.loading) {
    return <PageProgress />;
  }
  if (deleteRecipeState.value) {
    return <Redirect to={`/recipes/${deletedRecipeId}`} />;
  }

  const recipeComponents = props.recipes.map(x => (
    <RecipeListItem
      recipe={x}
      key={x.id}
      addRecipe={props.addToShoppingCart}
      removeRecipe={props.removeFromShoppingCart}
    />
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

const RecipeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeListComponent);

export { RecipeList };
