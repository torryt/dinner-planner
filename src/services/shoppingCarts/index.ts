import { firebase } from "../../firebaseSetup";
import debugModule from "debug";
import { ShoppingCart } from "types";
const debug = debugModule("dinner-planner:shopping-cart");

async function getUserShoppingCart(userId: string) {
  const db = firebase.firestore();
  const collection = db.collection("shoppingCarts");
  const result = await collection
    .where("users", "array-contains", userId)
    .limit(1)
    .get();
  if (result.empty) {
    return null;
  }
  return result.docs.map(x => x.data())[0] as ShoppingCart;
}

async function createUserShoppingCart(userId: string) {
  const db = firebase.firestore();
  const collection = db.collection("shoppingCarts");

  const result = await collection.add({
    users: [userId],
    recipes: []
  });
  debug("Created new shopping cart!");

  return result.get().then(
    x =>
      ({
        ...x.data(),
        id: x.id
      } as ShoppingCart)
  );
}

async function getOrCreateUserShoppingCart(userId: string) {
  const shoppingCart = await getUserShoppingCart(userId);
  if (shoppingCart) {
    debug("Found user shopping cart");
    return shoppingCart;
  }
  debug("No shopping cart. Creating a new one...");
  return createUserShoppingCart(userId);
}

export {
  getUserShoppingCart,
  createUserShoppingCart,
  getOrCreateUserShoppingCart
};
