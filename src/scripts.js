import ingredientsData from './data/ingredient-data';
import {getData} from './apiCalls';
import domUpdates from './domUpdates.js';

import './css/base.scss';
import './css/styles.scss';

import User from './user';
import Recipe from './recipe';
import RecipeRepository from './RecipeRepository';

import Pantry from './Pantry';
import Ingredient from './Ingredient';
import IngredientRepository from './IngredientRepository'

import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/search.png'
import './images/cookbook.png'
import './images/seasoning.png'

let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
let main = document.querySelector("main");
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let searchBtn = document.querySelector(".search-btn");
let searchForm = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let menuOpen = false;
let recipes = [];
let user, recipeRepo, ingredientRepo, recipe;

window.addEventListener('load', gatherData);
allRecipesBtn.addEventListener("click", displayAllRecipes);
filterBtn.addEventListener("click", findCheckedBoxes);
main.addEventListener("click", function (event) {
  addToMyRecipes(event)
});
pantryBtn.addEventListener("click", displayPantryMenu);
savedRecipesBtn.addEventListener("click", showSavedRecipes);
searchBtn.addEventListener("click", searchRecipes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener("submit", pressEnterSearch);

function gatherData() {
  Promise.all([getData('users'), getData('ingredients'),
    getData('recipes')])
    .then(data => {
      generateUserData(data[0]);
      generateIngredientData(data[1]);
      generateRecipeData(data[2]);
    })
}

function generateUserData(data) {
  generateUser(data);
}

function generateIngredientData(data) {
  ingredientRepo = new IngredientRepository(data);
  findPantryInfo(data);
}

function generateRecipeData(data) {
  recipeRepo = new RecipeRepository(data);
  recipe = new Recipe(recipeRepo)
  createCards(recipeRepo.recipes);
  domUpdates.renderTags(recipeRepo.findRecipeTags())
}

function getUpdatedQuantity() {
  let updatedQuantity = {
    userID: 1, 
    ingredientID: 11477, 
    ingredientModification: 0
  }
  updateIngredientQuantity(updatedQuantity)
}

function updateIngredientQuantity(qty) {
  fetch('http://localhost:3001/api/v1/users', {
    method: 'POST',
    body: JSON.stringify(qty),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => checkForError(response))
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

function checkForError(res) {
  if (!res.ok) {
    throw new Error('An Error Occured - this is where the message goes')
  } else {
    return res.json()
  }
}

function generateUser(userInfo) {
  user = new User(userInfo[Math.floor(Math.random() * userInfo.length)]);
  let firstName = user.name.split(" ")[0];
  let welcomeMsg = `
    <div class="welcome-msg">
      <h1>Welcome ${firstName}!</h1>
    </div>`;
  document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
    welcomeMsg);
}

function createCards(recipeData) {
  recipeData.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    domUpdates.renderRecipeCard(recipeInfo, shortRecipeName)
  });
}

function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}

function findTaggedRecipes(selected) {
  let filteredResults = [];
  selected.forEach(tag => {
    let allRecipes = recipes.filter(recipe => {
      return recipe.tags.includes(tag.id);
    });
    allRecipes.forEach(recipe => {
      if (!filteredResults.includes(recipe)) {
        filteredResults.push(recipe);
      }
    })
  });
  domUpdates.renderAllRecipes(recipes);
  if (filteredResults.length > 0) {
    filterRecipes(filteredResults);
  }
}

function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  hideUnselectedRecipes(foundRecipes)
}

function hideUnselectedRecipes(foundRecipes) {
  foundRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  });
}

function addToMyRecipes(event) {
  if (event.target.className === "card-apple-icon") {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    if (!user.favoriteRecipes.includes(cardId)) {
      event.target.src = "../images/apple-logo.png";
      user.favoriteRecipe(cardId);
    } else {
      event.target.src = "../images/apple-logo-outline.png";
      user.removeFavoriteRecipe(cardId);
    }
  } else if (event.target.id === "exit-recipe-btn") {
    exitRecipe();
  } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
    let cardId = parseInt(event.target.closest(".recipe-card").id)
    displayRecipeInfo(cardId);
  }
}

function isDescendant(parent, child) {
  let node = child;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}

function showSavedRecipes() {
  let unsavedRecipes = recipes.filter(recipe => {
    return !user.favoriteRecipes.includes(recipe.id);
  });
  unsavedRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  });
  showMyRecipesBanner();
}

function pressEnterSearch(event) {
  event.preventDefault();
  searchRecipes();
}

function searchRecipes() {
  domUpdates.renderAllRecipes(recipes);
  let searchedRecipes = recipeRepo.recipes.filter(recipe => {
    return recipe.name.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  filterNonSearched(createRecipeObject(searchedRecipes));
}

function filterNonSearched(filtered) {
  let found = recipes.filter(recipe => {
    let ids = filtered.map(f => f.id);
    return !ids.includes(recipe.id)
  })
  hideUnselectedRecipes(found);
}

function createRecipeObject(recipes) {
  recipes = recipes.map(recipe => new Recipe(recipe));
  return recipes
}

function displayRecipeInfo(recipeID) {
  const currentRecipe = findRecipe(recipeID);
  const currentRecipeImage = findRecipeImage(currentRecipe);
  const listedIngredients = findIngredients(currentRecipe);
  const instructions = findInstructions(currentRecipe)

  domUpdates.renderRecipeInfo();
  domUpdates.renderRecipeImage(currentRecipeImage);
  domUpdates.renderRecipeTitle(currentRecipe, listedIngredients);
  domUpdates.renderRecipeInstructions(instructions);
}

function findRecipe(id) {
  const recipe = recipeRepo.recipes.find(recipe => recipe.id === id)
  const currentRecipe = new Recipe(recipe);
  return currentRecipe;
}

function findRecipeImage(recipe) {
  const recipePhoto = recipe.image;
  return recipePhoto;
}

function findIngredients(recipe) {
  const listedIngredients = [];
  recipe.ingredients.map(ingredient => {
    ingredientRepo.data.forEach(listItem => {
      if (listItem.id === ingredient.id) {
        listedIngredients.push(listItem.name)
      }
    })
  })
  return listedIngredients;
}

function findInstructions(recipe) {
  return recipe.retrieveInstructions();
}

function exitRecipe() {
  const fullRecipeInfo = document.querySelector(".recipe-instructions")
  while (fullRecipeInfo.firstChild &&
    fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
  fullRecipeInfo.style.display = "none";
  document.getElementById("overlay").remove();
}

function showMyRecipesBanner() {
  document.querySelector(".welcome-msg").style.display = "none";
  document.querySelector(".my-recipes-banner").style.display = "block";
}

function showWelcomeBanner() {
  document.querySelector(".welcome-msg").style.display = "flex";
  document.querySelector(".my-recipes-banner").style.display = "none";
}

function displayPantryMenu() {
  var menuDropdown = document.querySelector(".drop-menu");
  menuOpen = !menuOpen;
  if (menuOpen) {
    menuDropdown.style.display = "block";
  } else {
    menuDropdown.style.display = "none";
  }
}

function displayAllRecipes() {
  domUpdates.renderAllRecipes(recipes);
  showWelcomeBanner();
}

function findPantryInfo(ingredientData) {
  let pantry = new Pantry(user.pantry);
  let pantryInfo = pantry.returnCurrentPantry(ingredientData)
  domUpdates.renderPantryInfo(pantryInfo.sort((a, b) => a.name > b.name ? 1 : -1));
}

function findCheckedPantryBoxes() {
  let pantryCheckboxes = document.querySelectorAll(".pantry-checkbox");
  let pantryCheckboxInfo = Array.from(pantryCheckboxes)
  let selectedIngredients = pantryCheckboxInfo.filter(box => {
    return box.checked;
  })
  domUpdates.renderAllRecipes(recipes);
  if (selectedIngredients.length > 0) {
    findRecipesWithCheckedIngredients(selectedIngredients);
  }
}

function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientIDs = selected.map(item => {
    return parseInt(item.id);
  })
  recipeRepo.recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    recipe.ingredients.forEach(ingredient => {    
      allRecipeIngredients.push(ingredient.id);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientIDs)) {
      domUpdates.hideUnchecked(recipe);
    }
  })
}
















































//