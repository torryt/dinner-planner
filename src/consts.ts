import { IngredientCategory } from "types";

const ingredientCategories: { [key: string]: IngredientCategory } = {
  FRUIT: "FRUIT",
  REFRIGIRATED: "REFRIGIRATED",
  FRESH_PRODUCE: "FRESH_PRODUCE",
  PASTRY: "PASTRY",
  DAIRY: "DAIRY",
  FROZEN_PRODUCE: "FROZEN_PRODUCE",
  DRINKS: "DRINKS",
  DRY_FOOD: "DRY_FOOD",
  SNACKS: "SNACKS",
  HYGIENE: "HYGIENE",
  OTHER: "OTHER"
};

const ingredientCategoryNames: { [key: string]: string } = {
  FRUIT: "Frukt og grønnsaker",
  REFRIGIRATED: "Kjølevarer",
  FRESH_PRODUCE: "Ferskvarer",
  PASTRY: "Brød og bakverk",
  DAIRY: "Meieriprodukter",
  FROZEN_PRODUCE: "Frysevarer",
  DRINKS: "Drikke",
  DRY_FOOD: "Tørrvarer",
  SNACKS: "Snacks",
  HYGIENE: "Hygiene og bad",
  OTHER: "Annet"
};

export { ingredientCategories, ingredientCategoryNames };
