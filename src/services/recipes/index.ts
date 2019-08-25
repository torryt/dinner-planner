import { firebase } from "../../firebaseSetup";
import { Recipe } from "types";
import { User } from "firebase";
import debugModule from "debug";
import { getOrCreateUserShoppingCart } from "services/shoppingCarts/shoppingCarts";

const debug = debugModule("dinner-planner:recipes-service");

function fetchRecipes(userId: string) {
  const db = firebase.firestore();
  const result = db
    .collection("recipes")
    .where("isDeleted", "==", false)
    .get()
    .then(x =>
      x.docs.map(x => ({
        ...(x.data() as Recipe),
        id: x.id
      }))
    );
  return result;
}

function addRecipeToCart(recipeId: string) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser as User;

  return async () => {
    const shoppingCart = await getOrCreateUserShoppingCart(currentUser.uid);
    return db
      .collection("shoppingCarts")
      .doc(shoppingCart.id)
      .update({
        recipes: firebase.firestore.FieldValue.arrayUnion(recipeId)
      })
      .then(() => {
        debug("Updated user shopping cart!");
        return { success: true };
      });
  };
}

function removeRecipeFromCart(recipeId: string) {
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser as User;

  return async () => {
    const collection = db.collection("shoppingCarts");
    debug(`Fetching existing shopping cart`, { user: currentUser.uid });
    const userShoppingCart = await collection
      .where("users", "array-contains", currentUser.uid)
      .limit(1)
      .get();
    if (userShoppingCart.empty) {
      throw Error("Found no shopping cart for user. Cannot remove recipe");
    }
    debug("Found 1 shopping cart. Removing recipe from shopping cart...");
    return await db
      .collection("shoppingCarts")
      .doc(userShoppingCart.docs[0].id)
      .update({
        recipes: firebase.firestore.FieldValue.arrayRemove(recipeId)
      })
      .then(x => ({ success: true }));
  };
}
export { fetchRecipes, addRecipeToCart, removeRecipeFromCart };
