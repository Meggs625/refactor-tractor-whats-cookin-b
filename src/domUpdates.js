


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

renderRecipeInstructions(instructionsList) {
  let fullRecipeInfo = document.querySelector(".recipe-instructions")

  fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
  fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
},

renderRecipeImage(recipe) {
  let fullRecipeInfo = document.querySelector(".recipe-instructions")
  // let recipeTitle = document.getElementById("recipe-title")
  // .style.backgroundImage = `url(${recipe})`;
  fullRecipeInfo.insertAdjacentHTML('afterbegin', `<img class="recipe-title" src="${recipe}" />`)
}































}

export default domUpdates;