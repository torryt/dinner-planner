import { firebase } from "../../firebaseSetup";
import { User } from "firebase";
import debugModule from "debug";
const debug = debugModule("dinner-planner:recipe-list");

function addRecipeToCart(recipeId: string) {
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
      debug("No shopping cart found. Creating new shopping cart...");
      return await collection.add({
        users: [currentUser.uid],
        recipes: [recipeId]
      });
    }
    debug("Found 1 shopping cart. Updating user shopping cart...");
    return await db
      .collection("shoppingCarts")
      .doc(userShoppingCart.docs[0].id)
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

export { addRecipeToCart, removeRecipeFromCart };