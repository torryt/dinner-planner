import React from "react";
import styled from "styled-components";

import { List, Fab, Button, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import { parse } from "query-string";

import { Recipe, WhereFilterOp } from "../../types";
import { RecipeListItem } from "./RecipeListItem";
import { AdapterLink } from "components/Link";
import { PageProgress } from "components/PageProgress";
import { useFetchCollection } from "hooks/useFetchCollection";
import { firebase } from "../../firebase";
import { useAsyncFn } from "react-use";
import { ErrorPage } from "components/ErrorPage";
import { Redirect } from "react-router";

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
  const filter = {
    fieldPath: "isDeleted",
    opStr: "==" as WhereFilterOp,
    value: false
  };
  const queryParams = parse(window.location.search);
  const deletedRecipeId = queryParams.deletedRecipeId as string;

  const [recipes, isPending] = useFetchCollection<Recipe>("recipes", filter);
  const [deleteRecipeState, deleteTrigger] = useAsyncFn(
    undoDeleteRecipe(deletedRecipeId),
    [deletedRecipeId]
  );

  const recipeComponents = recipes.map(x => (
    <RecipeListItem recipe={x} key={x.id} />
  ));
  const classes = useStyles();

  if (isPending) {
    return <PageProgress />;
  }
  if (deleteRecipeState.error) {
    return <ErrorPage />;
  }
  if (deleteRecipeState.value) {
    return <Redirect to={`/recipes/${deletedRecipeId}`} />;
  }
  return (
    <>
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
    </>
  );
}

export { RecipeListBar } from "./RecipeListBar";
export { RecipeList };
