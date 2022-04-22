import { recipes } from "../recipes.js";
import recipeClass from "../factory/recipeFactory.js";

// let recipesArray = Object.entries(recipes);

// -- DOM
const searchInput = document.getElementById("main_search_bar")
const recipeContainer = document.getElementById("recipe_container")

// -- Variables

let ingredients = []
let ingredientsArr = []
let appareils = []
let appareilsArr = []
let ustensils = []
let ustensilsArr = []
var searchWord = ""
var foundArray = []
var foundArrayTemp = []

//-------------------TEST----------------//
// console.log(recipesArray);

// recipesArray.forEach(recipe => recipeFactory(recipe));
//-------------------TEST----------------//


//On extrait tout les ingrédients, appareils, ustensiles

function ingredientsFilter(arr){
    ingredientsArr = []
    arr.forEach(recipe =>{
        recipe.ingredients.forEach(ingredient =>{
            ingredientsArr.push(ingredient.ingredient.toLowerCase())
            ingredients = [...new Set(ingredientsArr)].sort()
        })
    })
    return ingredients
};

function appareilsFilter(arr){
    appareilsArr = []
    arr.forEach(recipe =>{
        appareilsArr.push(recipe.appliance.toLowerCase())
        appareils = [...new Set(appareilsArr)].sort()
    })
    return appareils
};

function ustensilsFilter(arr) {
    ustensilsArr = []
    arr.forEach(recipe =>{
        recipe.ustensils.forEach(ustensil =>{
            ustensilsArr.push(ustensil.toLowerCase())
            ustensils = [...new Set(ustensilsArr)].sort()
        })
    })
    return ustensils
};


//-- Fonction pour générer/afficher l'HTML pour chaque recette


function createRecipe(recipeArr){
    recipeArr.map(function(recipe){
        let showRecipe = new recipeClass(
            recipe.name,
            recipe.servings,
            recipe.time,
            recipe.ingredients,
            recipe.description,
            recipe.appliance,
            recipe.ustensils,
        )
        showRecipe.recipeCard()
    }).join("")
};


//-- Fonction de recherche V2


function search(recipeArrays, value){
    const foundArray = recipeArrays.filter((recipeArray) => {
        // On prends tout les ingrédient pour chaque recette pour la validité de condition plus tard
        function ingredientList(){
            let x = ""
            recipeArray.ingredients.forEach(ingredient => {
                x += ingredient.ingredient.toLowerCase() + ' '
            })
            return x
        }

        // On prends tout les ustensiles pour chaque recette pour la validité de condition plus tard
        function ustensilList(){
            let y = ""
            recipeArray.ustensils.forEach(ustensil => {
                y += ustensil.toLowerCase() + ' '
            })
            return y
        }

        return recipeArray.name.toLowerCase().includes(value) ||
        recipeArray.description.toLowerCase().includes(value) ||
        ingredientList().includes(value) ||
        ustensilList().includes(value) ||
        recipeArray.appliance.toLowerCase().includes(value)
    })

    if(foundArray.length > 0) {
        recipeContainer.innerHTML = ""
        ingredientsFilter(foundArray)
        appareilsFilter(foundArray)
        ustensilsFilter(foundArray)
        createRecipe(foundArray)
        foundArrayTemp = foundArray

        return foundArray
    } else {
        // Aucuns resultats
        recipeContainer.innerText= "Aucune recette ne correspond à votre critère...vous pouvez chercher 'tarte aux pommes', 'poisson'. etc"
    }
}


// -- On initialise tout les recettes au chargement de page avec le call createRecipe()


createRecipe(recipes)
ingredientsFilter(recipes)
appareilsFilter(recipes)
ustensilsFilter(recipes)
searchInput.focus()


// Input de recherche -- on récupère la valeur et on call la fonction search() avec le keyword en param


searchInput.addEventListener("keyup", (e)=> {
    e.preventDefault()
    let searchKey = searchInput.value
        searchWord = searchKey.toLowerCase()
        searchWord = searchWord.trim()
    let searchWordLength = searchInput.value.length

    //On valide le length de searchWord
    if(searchWordLength <= 3) {
        return
    }
    // on call la fonction search et donne l'array cherché avec la valeur de searchWord
    search(recipes, searchWord)
})

console.log(foundArray);