import React from "react";
import { RouteComponentProps } from "react-router";

function RecipeDetails({ match }: RouteComponentProps<{ id: string }>) {
  return <div>{match.params.id}</div>;
}

export { RecipeDetails };
