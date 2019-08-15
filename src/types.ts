export interface Ingredient {
  name: string;
  measurementUnit: string;
  quantity: string;
}

export interface Recipe {
  id?: string;
  name: string;
  ingredients: Ingredient[];
  minutesToCook: number;
}
