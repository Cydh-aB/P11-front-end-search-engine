import { recipes } from "../recipes.js";
import { recipeFactory } from "../factory/recipeFactory.js";

let recipesArray = Object.entries(recipes);

console.log(recipesArray);

recipesArray.forEach(recipe => recipeFactory(recipe));