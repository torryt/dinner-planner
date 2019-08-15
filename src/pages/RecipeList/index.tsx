import React from "react";
import styled from "styled-components";

import { List, Fab, CircularProgress } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AvTimer, Add, AddShoppingCartOutlined } from "@material-ui/icons";

import { Recipe } from "../../types";
import { RecipeListItem } from "./RecipeListItem";
import { AdapterLink } from "components/Link";
import { PageProgress } from "components/PageProgress";
import { useFetchCollection } from "hooks/useFetchCollection";

const StyledList = styled(List)`
  margin-left: -1rem;
  width: calc(100% + 2rem);
`;

export const ListSecondary = styled.span`
  display: flex;
  align-items: center;
`;

export const StyledAvTimer = styled(AvTimer)`
  margin-right: 6px;
  font-size: 1.4em;
`;

export const StyledAddShoppingCart = styled(AddShoppingCartOutlined)`
  margin-right: 6px;
  font-size: 1.4em;
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

export const RecipeInfo = styled.span`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

export interface RecipeComponentProps {
  recipe: Recipe;
}
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
