import React from "react";
import { ListItem, ListItemText } from "@material-ui/core";
import {
  RecipeComponentProps,
  ListSecondary,
  StyledAvTimer,
  RecipeInfo,
  StyledAddShoppingCart
} from "./index";
import { AdapterLink } from "components/Link";
export function RecipeListItem(props: RecipeComponentProps) {
  return (
    <ListItem button component={AdapterLink} to={`/recipes/${props.recipe.id}`}>
      <ListItemText
        primary={props.recipe.name}
        secondary={
          <ListSecondary>
            <StyledAvTimer />
            {props.recipe.minutesToCook} min
            <RecipeInfo />
            <RecipeInfo>
              <StyledAddShoppingCart />
              {props.recipe.ingredients.length} ingr.
            </RecipeInfo>
          </ListSecondary>
        }
      />
    </ListItem>
  );
}
