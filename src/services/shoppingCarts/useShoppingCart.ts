import { useAsync } from "react-use";
import { getOrCreateUserShoppingCart } from "services/shoppingCarts/shoppingCarts";

function useShoppingCart(userId: string) {
  const state = useAsync(() => getOrCreateUserShoppingCart(userId));
  return state;
}

export { useShoppingCart };
