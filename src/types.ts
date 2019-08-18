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

export type WhereFilterOp = "<" | "<=" | "==" | ">=" | ">" | "array-contains";
