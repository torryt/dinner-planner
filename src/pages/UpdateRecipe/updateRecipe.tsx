import { firebase } from "../../firebase";
import { Recipe } from "types";

const db = firebase.firestore();

async function updateRecipe(recipe: Recipe, recipeId: string) {
  try {
    await db
      .collection("recipes")
      .doc(recipeId)
      .set(recipe);
  } catch (err) {
    console.error(`Could not update recipe with id ${recipeId}`);
    throw err;
  }
}

export { updateRecipe };
