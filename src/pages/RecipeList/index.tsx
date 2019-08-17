import React from "react";
import styled from "styled-components";

import { List, Fab } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";

import { Recipe } from "../../types";
import { RecipeListItem } from "./RecipeListItem";
import { AdapterLink } from "components/Link";
import { PageProgress } from "components/PageProgress";
import { useFetchCollection } from "hooks/useFetchCollection";

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

function RecipeList() {
  const [recipes, isPending] = useFetchCollection<Recipe>("recipes");

  const recipeComponents = recipes.map(x => (
    <RecipeListItem recipe={x} key={x.name} />
  ));
  const classes = useStyles();

  if (isPending) {
    return <PageProgress />;
  }
  return (
    <>
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

export { RecipeList };
