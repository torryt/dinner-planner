import React from "react";
import { RouteComponentProps } from "react-router";
import { useFetchDocument } from "hooks/useFetchDocument";

import { Typography } from "@material-ui/core";

import { Recipe } from "types";
import { PageProgress } from "components/PageProgress";

function RecipeDetails({ match }: RouteComponentProps<{ id: string }>) {
  const [recipe] = useFetchDocument<Recipe>("recipes", match.params.id);
  if (!recipe) {
    return <PageProgress />;
  }
  return (
    <Typography variant="h6" component="h1">
      {recipe.name}
    </Typography>
  );
}

export { RecipeDetails };
