import React, { useState } from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import { AdapterLink } from "components/Link";
import { AvTimer, AddShoppingCartOutlined, Done } from "@material-ui/icons";
import { Recipe } from "types";
import { useAsyncFn } from "react-use";

import { addRecipeToCart, removeRecipeFromCart } from "./recipeCartFunctions";
import debugModule from "debug";
const debug = debugModule("dinner-planner:recipe-list");

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

const IsInCartBox = styled(IconButton)`
  color: green;
  background: #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
`;

function SecondaryButton(props: {
  isInShoppingCart: boolean;
  recipeId: string;
}) {
  const { isInShoppingCart, recipeId } = props;
  debug("Secondary button props", props);
  const [addToCartState, addToCartTrigger] = useAsyncFn(
    addRecipeToCart(recipeId as string)
  );
  const removeFromCartHook = useAsyncFn(
    removeRecipeFromCart(recipeId as string)
  );
  const removeFromCartStateTrigger = removeFromCartHook[1];
  const [toggle, setIsInShoppingCart] = useState(isInShoppingCart);

  const transitions = useTransition(toggle, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  if (addToCartState.error) {
    throw Error("Could not add recipe to shopping cart");
  }
  return (
    <ButtonWrapper>
      {transitions.map(({ item, key, props }) =>
        item ? (
          <animated.div style={props} key={key}>
            <IsInCartBox
              edge="end"
              aria-label="er i handlevogn"
              onClick={() => {
                removeFromCartStateTrigger();
                setIsInShoppingCart(false);
              }}
            >
              <Done />
            </IsInCartBox>
          </animated.div>
        ) : (
          <animated.div style={props} key={key}>
            <IconButton
              edge="end"
              aria-label="legg til handlevogn"
              onClick={() => {
                addToCartTrigger();
                setIsInShoppingCart(true);
              }}
            >
              <AddShoppingCartOutlined />
            </IconButton>
          </animated.div>
        )
      )}
    </ButtonWrapper>
  );
}

interface RecipeComponentProps {
  recipe: Recipe & { isInShoppingCart: boolean };
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
      <ListItemSecondaryAction>
        <>
          <SecondaryButton
            recipeId={props.recipe.id as string}
            isInShoppingCart={props.recipe.isInShoppingCart}
          />
        </>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
