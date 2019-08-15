export interface Ingredient {
  name: string;
  measurementUnit: string;
  quantity: string;
}

export interface Recipe {
  id?: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  minutesToCook: number;
}

export type WhereFilterOp = "<" | "<=" | "==" | ">=" | ">" | "array-contains";
