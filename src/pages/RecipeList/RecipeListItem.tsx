import React from "react";
import styled from "styled-components";
import { ListItem, ListItemText } from "@material-ui/core";
import { AdapterLink } from "components/Link";
import { AvTimer, AddShoppingCartOutlined } from "@material-ui/icons";
import { Recipe } from "types";

const ListSecondary = styled.span`
  display: flex;
  align-items: center;
`;

const StyledAddShoppingCart = styled(AddShoppingCartOutlined)`
  margin-right: 6px;
  font-size: 1.4em;
`;

const StyledAvTimer = styled(AvTimer)`
  margin-right: 6px;
  font-size: 1.4em;
`;

const RecipeInfo = styled.span`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

interface RecipeComponentProps {
  recipe: Recipe;
}

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
