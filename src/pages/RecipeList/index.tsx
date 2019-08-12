import React, { useState, useEffect } from "react";
// import styled, { css } from "styled-components";
import styled from "styled-components";

import { List, ListItem, ListItemText, Fab } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { AvTimer, Add, AddShoppingCartOutlined } from "@material-ui/icons";

import { firebase } from "../../firebase";
import { Container } from "../../components/Container";
import { Recipe } from "../../types";

const db = firebase.firestore();

const StyledList = styled(List)`
  margin-left: -1rem;
  width: calc(100% + 2rem);
`;

const ListSecondary = styled.div`
  display: flex;
  align-items: center;
`;

const StyledAvTimer = styled(AvTimer)`
  margin-right: 6px;
  font-size: 1.4em;
`;

const StyledAddShoppingCart = styled(AddShoppingCartOutlined)`
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

const RecipeInfo = styled.span`
  margin-right: 16px;
  display: flex;
  align-items: center;
`;

interface RecipeComponentProps {
  recipe: Recipe;
}
function RecipeComponent(props: RecipeComponentProps) {
  return (
    <ListItem button component="a">
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

function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      db.collection("recipeCollections")
        .where("ownerId", "==", currentUser.uid)
        .get()
        .then(querySnapshot => {
          const recipeCollections = querySnapshot.docs.map(x => x.id);
          recipeCollections.forEach(recipeCollectionId => {
            db.collection("recipes")
              .where("recipeCollectionId", "==", recipeCollectionId)
              .get()
              .then(querySnapshot => {
                const recipes = querySnapshot.docs.map(x =>
                  x.data()
                ) as Recipe[];
                setRecipes(recipes);
              });
          });
        });
    }
  }, []);

  const recipeComponents = recipes.map(x => (
    <RecipeComponent recipe={x} key={x.name} />
  ));
  const classes = useStyles();

  return (
    <Container>
      <>
        <StyledList>{recipeComponents}</StyledList>
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="legg til ny oppskrift"
          component="a"
        >
          <Add />
        </Fab>
      </>
    </Container>
  );
}

export { RecipeList };
