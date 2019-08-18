import { firebase } from "../../firebase";
import { Recipe } from "types";

const db = firebase.firestore();

async function submitRecipe(recipe: Recipe) {
  const currentUser = firebase.auth().currentUser;
  const userRecipeCollectionResponse = await db
    .collection("recipeCollections")
    .where("ownerId", "==", currentUser ? currentUser.uid : "")
    .get();

  const userRecipeCollectionId = userRecipeCollectionResponse.docs[0].id;
  const payload = {
    ...recipe,
    recipeCollectionId: userRecipeCollectionId
  };
  return await db.collection("recipes").add(payload);
}

export { submitRecipe };
