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


//-- Fonction de recherche v1 : Boucle FOR

function search(arr, value) {
    foundArray = []
    //chaque recette en string-lowercase
    for(let i=0; i <arr.length; i++) {
        function listIngredient(){
            let x = ""
            arr[i].ingredients.forEach(ingredient => {
                x += ingredient.ingredient + ' '
            });
            return x
        } 
        
        function listUstensil(){
            let y = ""
            arr[i].ustensils.forEach(ustensil=> {
                y += ustensil
            })
            return y
        }
        //on met le nom + tout les ingredients + description dans une variable pour la recherche
        let recipeTemp = arr[i].name + " , " +
                         listIngredient() + " , " +
                         arr[i].description +
                         arr[i].appliance + " , " +
                         listUstensil()
        
        recipeTemp = recipeTemp.toLocaleLowerCase()
        recipeTemp = recipeTemp.trim()
        console.log(recipeTemp)
        let foundBoolean = recipeTemp.includes(value)
        if(foundBoolean === true) {
            foundArray.push(arr[i])
        }
    } 
    //On check si found array a quelque chose
    if(foundArray.length > 0){
        recipeContainer.innerHTML = ""
        //on apelle la fonction createRecipe() pour charque recette trouvée
        ingredientsFilter(foundArray)
        appareilsFilter(foundArray)
        ustensilsFilter(foundArray)
        createRecipe(foundArray)
    } else {
        //Aucuns résultats
        recipeContainer.innerText = "Aucune recette ne correspond à votre critère...vous pouvez chercher 'tarte aux pommes', 'poisson'. etc" 
    }

    foundArrayTemp = foundArray
    return foundArrayTemp, foundArray
};


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
