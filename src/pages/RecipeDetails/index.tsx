import React from "react";
import { RouteComponentProps } from "react-router";

import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";

import { Recipe, Ingredient } from "types";
import { PageProgress } from "components/PageProgress";
import { AvTimer } from "@material-ui/icons";
import { ErrorPage } from "components/ErrorPage";
import { PageWrapper } from "components/PageWrapper";
import { RecipeDetailsBar } from "./RecipeDetailsBar";
import { useEffectOnce } from "react-use";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "./state";

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

interface RecipeDetailProps extends RouteComponentProps<{ id: string }> {
  recipesById: { [id: string]: Recipe };
  loading: boolean;
  error: boolean;
  loadRecipes: () => void;
}
function RecipeDetailsComponent({
  match,
  recipesById,
  error,
  loadRecipes
}: RecipeDetailProps) {
  const classes = useStyles();
  const recipe = recipesById[match.params.id];
  useEffectOnce(() => {
    loadRecipes();
  });
  // const [recipe, fetchState] = useFetchDocument<Recipe>(
  //   "recipes",
  //   props.match.params.id
  // );
  if (error) {
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

const RecipeDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetailsComponent);

export { RecipeDetails };
