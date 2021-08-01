


const domUpdates = {




  

  // CREATE RECIPE INSTRUCTIONS
  renderRecipeInfo() {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")

    fullRecipeInfo.style.display = "inline";
    fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
  },

  renderRecipeTitle(recipe, ingredients) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")
    let recipeTitle = `
    <button id="exit-recipe-btn">X</button>
    <h4 id="recipe-title">${recipe.name}</h4>
    <h3>Ingredients</h3>
    <p>${ingredients}</p>`;

    fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
  },

  renderRecipeIngredients(bloop) {
  // `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
  },

  renderRecipeInstructions(bloop) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")

    fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  },



























  toggleMenu(menuOpen) {
    var menuDropdown = document.querySelector(".drop-menu");
    menuOpen = !menuOpen;
    if (menuOpen) {
      menuDropdown.style.display = "block";
    } else {
      menuDropdown.style.display = "none";
    }
  },

  showAllRecipes(recipes) {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
  },

  displayPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      //updated id="${ingredient.name} to ${ingredient.id}"
      let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.id}">${ingredient.name}</li>`;
      document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
        ingredientHtml);
    });
  },

  hideUnchecked(recipe) {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  }








}

export default domUpdates;