
let recipeFactory = (recipe) => {
    //Image
    let img = document.createElement('img');
    img.classList.add('recipe_card_img');
    //Titre
    let title = document.createElement('h2');
    title.textContent = recipe[1].name;
    //Durée
    let timeParent = document.createElement('div');
    let timeIcon = document.createElement('span');
    let timeText = document.createElement('p');
    timeText.textContent = recipe[1].time + " min";

    //On regroupe le header card 
    let headerCard = document.createElement('div');
    headerCard.appendChild(title);
    headerCard.appendChild(timeParent);

    //Liste d'ingrédient 
    let ingredients = document.createElement('div');
    ingredients.classList.add('ingredient_container');


    let eachIngredient = recipe[1].ingredients.map(function(ingredients) {
        if (Object.prototype.hasOwnProperty.call(ingredients, "quantity") && Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
            return "<p><span class='ingredient'>" + ingredients.ingredient + "</span>: " + ingredients.quantity + ingredients.unit + "</p>";    
        } else if (Object.prototype.hasOwnProperty.call(ingredients, "quantity") && !Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
            return "<p><span class='ingredient'>" + ingredients.ingredient + "</span>: " + ingredients.quantity + "</p>";
        } else if (Object.prototype.hasOwnProperty.call(ingredients, "quantity") && !Object.prototype.hasOwnProperty.call(ingredients, "unit")) {
            return "<p><span class='ingredient'>" + ingredients.ingredient + "</span></p>";
        }
    }).join("");

    ingredients.innerHTML = eachIngredient;

    //Méthode de cuisson
    let method = document.createElement('p');
    method.classList.add('cuisson_description');
    method.textContent = recipe[1].description;

    //Appareil
    let appliances = document.createElement('p');
    appliances.classList.add('appareil');
    appliances.textContent = recipe[1].appliances;
    
    //Ustensile
    let utensils = document.createElement('div');
    let eachUtensils = recipe[1].ustensils.map((utensil) => {
        return "<p class='ustensil sr_only'>" + utensil + "</p>";
    }).join("");
    utensils.innerHTML = eachUtensils;

    //Carte recette body + DOM
    let recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe_card');

    recipeCard.appendChild(ingredients);
    recipeCard.appendChild(method);
    recipeCard.appendChild(appliances);
    recipeCard.appendChild(utensils);

    //Container
    let recipeContainer = document.createElement('article');
    recipeContainer.classList.add('recipe_container');

    //DOM
    recipeContainer.appendChild(img);
    recipeContainer.appendChild(headerCard);
    recipeContainer.appendChild(recipeCard);

    let main = document.getElementById("main");
    main.appendChild(recipeContainer);

}

export { recipeFactory };