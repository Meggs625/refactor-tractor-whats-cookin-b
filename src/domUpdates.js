


const domUpdates = {

  // maxlength="40"

// CREATE RECIPE CARD
renderRecipeCard(recipeInfo, shortRecipeName) {
  let main = document.querySelector("main");
  let cardHtml = `

    <div class="recipe-card" id=${recipeInfo.id}>
      <h3 class="recipe-name">${shortRecipeName}</h3>
      <div class="card-photo-container">
        <img src=${recipeInfo.image} class="card-photo-preview" title="${recipeInfo.name} recipe">
        <div class="text">
          <div>Click for Instructions</div>
        </div>
      </div>
      <h4>${recipeInfo.tags[0]}</h4>
      <img src="./images/apple-logo-outline.png" class="card-apple-icon" alt="apple outline icon">
    </div>`
    main.insertAdjacentHTML("beforeend", cardHtml);
  },

  // LIST TAGS
  renderTags(allTags) {
    let tagList = document.querySelector(".tag-list");
    allTags.forEach(tag => {
      let tagHtml = 
      `<li>
      <input type="checkbox" name="${tag}" class="checked-tag" id="${tag}">
      <label for="${tag}">${tag}</label>
      </li>`;
      tagList.insertAdjacentHTML("beforeend", tagHtml);
    });
  },
  

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

  renderRecipeIngredients(ingredients) {
    // let fullRecipeInfo = document.querySelector(".recipe-instructions")
    // fullRecipeInfo.insertAdjacentElement('', )

    // `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
  },

  renderRecipeInstructions(bloop) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")

    fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  },



  renderRecipeInstructions(instructionsList) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")

    fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
    fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
  },


  renderRecipeImage(recipe) {
    let fullRecipeInfo = document.querySelector(".recipe-instructions")
    // let recipeTitle = document.getElementById("recipe-title")
    // .style.backgroundImage = `url(${recipe})`;
    fullRecipeInfo.insertAdjacentHTML('afterbegin', `<img class="recipe-title" src="${recipe}" alt="recipe image" />`)
  },





















  renderAllRecipes(recipes) {
    recipes.forEach(recipe => {
      let domRecipe = document.getElementById(`${recipe.id}`);
      domRecipe.style.display = "block";
    });
  },

  renderPantryInfo(pantry) {
    pantry.forEach(ingredient => {
      //updated id="${ingredient.name} to ${ingredient.id}"
      let ingredientHtml = 
      `<li>
      <input type="checkbox" name="${ingredient.name}"class="pantry-checkbox" id="${ingredient.id}">
      <label for="${ingredient.name}">${ingredient.name}</label>
      </li>`;
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