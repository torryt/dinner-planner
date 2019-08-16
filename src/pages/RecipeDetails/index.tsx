import React from "react";
import { RouteComponentProps } from "react-router";
import { useFetchDocument } from "hooks/useFetchDocument";

import { Typography } from "@material-ui/core";

import { Recipe, Ingredient } from "types";
import { PageProgress } from "components/PageProgress";

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

function RecipeDetails({ match }: RouteComponentProps<{ id: string }>) {
  const [recipe] = useFetchDocument<Recipe>("recipes", match.params.id);
  if (!recipe) {
    return <PageProgress />;
  }
  return (
    <>
      <Typography variant="h6" component="h1">
        {recipe.name}
      </Typography>
      <ul>
        {recipe.ingredients.map(x => (
          <IngredientItem ingredient={x} />
        ))}
      </ul>
    </>
  );
}

export { RecipeDetails };
