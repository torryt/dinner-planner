type MeasurementUnit =
  | "stk"
  | "ml"
  | "dl"
  | "l"
  | "pose"
  | "pk"
  | "glass"
  | "g"
  | "kg";
export interface Ingredient {
  name: string;
  measurementUnit: string;
  quantity: number;
}

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  minutesToCook: number;
  numberOfPortions: number;
}

export interface ShoppingCartItem {
  id: string;
  shoppingCartId: string;
  ingredientId: string;
  recipeId?: string;
  quantity: number;
  measurementUnit: MeasurementUnit;
}

export interface ShoppingCart {
  id: string;
  users: string[];
  item: string[];
}

export type WhereFilterOp = "<" | "<=" | "==" | ">=" | ">" | "array-contains";
