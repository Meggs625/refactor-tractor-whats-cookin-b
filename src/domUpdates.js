


const domUpdates = {

// CREATE RECIPE CARD
renderRecipeCard(recipeInfo, shortRecipeName) {
  let main = document.querySelector("main");
  let cardHtml = `
    <div class="recipe-card" id=${recipeInfo.id}>
      <h4 maxlength="40">${shortRecipeName}</h4>
      <div class="card-photo-container">
        <img src=${recipeInfo.image} class="card-photo-preview" title="${recipeInfo.name} recipe">
        <div class="text">
          <div>Click for Instructions</div>
        </div>
      </div>
      <h4>${recipeInfo.tags[0]}</h4>
      <img src="./images/apple-logo-outline.png" class="card-apple-icon">
    </div>`
    main.insertAdjacentHTML("beforeend", cardHtml);
},

// LIST TAGS
renderTags(allTags) {
  let tagList = document.querySelector(".tag-list");
  allTags.forEach(tag => {
    let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">${tag}</li>`;
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

renderRecipeIngredients(bloop) {
  // `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
},

renderRecipeInstructions(bloop) {
  let fullRecipeInfo = document.querySelector(".recipe-instructions")

  fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
  fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
}

































}

export default domUpdates;