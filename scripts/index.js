import { recipes } from "../recipes.js";
import { recipeFactory } from "../factory/recipeFactory.js";

let recipesArray = Object.entries(recipes);

console.log(recipesArray);

recipesArray.forEach(recipe => recipeFactory(recipe));

// Algo 1, fonction de split

let splitstring = (array) => {
    let newArr = [];
    for (let i = 0; i<array.lenght; i++) {
        newArr.push(array[i].split(" "));
    }
    return newArr
}

//On extrait chaque ingredients dans un array
let ingredientsOptions = [...new Set(recipesArray.map(a => a[1].ingredients.map(b => b.ingredient.toLowerCase()).flat()))];

//Les mots options pour ingrédients
let ingredientsWords = [...new Set(splitstring(ingredientsOptions).flat())];

//On récupère la liste des mots depuis le nom des recettes
let recipeName = [...new Set(recipesArray.map(a => a[1].name.toLowerCase()))];
let recipeNameWords = [...new Set(splitstring(recipeName).flat())];

//On récupère la liste des mots des descriptions
let recipeDescription = [...new Set(recipesArray.map(a => a[1].description.toLowerCase().replace(/[^\w\s+è+ç+é+ï+à+ù+û+ô+ê+î]/gi, "")))];
let recipeDescriptionWords = splitstring(recipeDescription).flat();

//On combine toutes les options en un array pour la recherche principale
let searchOptions = [...new Set(ingredientsWords.concat(recipeNameWords, recipeDescriptionWords))];

console.log(searchOptions);

let searchInput = document.getElementById("search_input");

//Fonction de recherche

let mainSearch = (e) => {
    let mainSection = document.getElementById("main");
    if (searchInput.value.length > 2) {
        let input = e.target.value.toLowerCase();
        let selectedArr = [];
        mainSection.innerHTML = "";
        for (let i=0; i<recipesArray.length; i++) {
            if (recipesArray[i][1].name.toLowerCase().includes(input) || recipesArray[i][1].description.toLowerCase().includes(input) || Object.values(recipesArray[i][1].ingredients).indexOf(input) > -1) {
                selectedArr.push(recipesArray[i]);
            }
        }
        if (selectedArr.length > 0) {
            selectedArr.forEach(recipe => {
                recipeFactory(recipe);
            })
        } else {
            mainSection.innerHTML = "<p id='msg_noResult'> Aucune recette ne correspond à votre critère... vous pouvez chercher << tarte aux pommes >>, << poisson >> etc...</p>";
        }
    } else {
        mainSection.innerHTML = "";
        recipesArray.forEach(recipe => recipeFactory(recipe));
    }
}

// implemention sur la barre de recherche principale

searchInput.addEventListener("keyup", function(e) {mainSearch(e)});