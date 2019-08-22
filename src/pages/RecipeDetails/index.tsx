import React from "react";
import { RouteComponentProps } from "react-router";
import { useFetchDocument } from "hooks/useFetchDocument";

import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";

import { Recipe, Ingredient } from "types";
import { PageProgress } from "components/PageProgress";
import { AvTimer } from "@material-ui/icons";
import { ErrorPage } from "components/ErrorPage";
import { PageWrapper } from "components/PageWrapper";
import { RecipeDetailsBar } from "./RecipeDetailsBar";

interface IngredientItemProps {
  ingredient: Ingredient;
}
function IngredientItem({ ingredient }: IngredientItemProps) {
  return (
    <li>{`${ingredient.quantity} ${ingredient.measurementUnit} ${
      ingredient.name
    }`}</li>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subtitle: {
      display: "flex",
      alignItems: "center",
      color: theme.palette.text.secondary,
      marginBottom: theme.spacing(4)
    },
    avTimer: {
      marginRight: theme.spacing()
    }
  })
);

function RecipeDetails({ match }: RouteComponentProps<{ id: string }>) {
  const classes = useStyles();
  const [recipe, fetchState] = useFetchDocument<Recipe>(
    "recipes",
    match.params.id
  );
  if (fetchState.error) {
    return <ErrorPage />;
  }
  if (!recipe) {
    return <PageProgress />;
  }
  return (
    <PageWrapper
      renderAppBar={() => <RecipeDetailsBar recipeId={match.params.id} />}
    >
      <Typography variant="h6" component="h1">
        {recipe.name}
      </Typography>
      <Typography
        variant="subtitle2"
        component="p"
        className={classes.subtitle}
      >
        <AvTimer className={classes.avTimer} />
        {recipe.minutesToCook} minutter
      </Typography>
      <ul>
        {recipe.ingredients.map(x => (
          <IngredientItem ingredient={x} key={x.name} />
        ))}
      </ul>
      <p>{recipe.description}</p>
    </PageWrapper>
  );
}

export { RecipeDetailsBar } from "./RecipeDetailsBar";
export { RecipeDetails };
