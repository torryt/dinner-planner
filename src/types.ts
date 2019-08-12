export interface Ingredient {
  name: string;
}

export interface Recipe {
  name: string;
  minutesToCook: number;
  ingredients: Ingredient[];
}
