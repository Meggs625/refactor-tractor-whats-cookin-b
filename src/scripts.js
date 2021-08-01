// import data
// import users from './data/users-data';
// import recipeData from  './data/recipe-data';
import ingredientsData from './data/ingredient-data';
import {getData} from './apiCalls';
import domUpdates from './domUpdates.js';

// import css
import './css/base.scss';
import './css/styles.scss';

// import Class
import User from './user';
import Recipe from './recipe';
import RecipeRepository from './RecipeRepository';

import Pantry from './Pantry';
import Ingredient from './Ingredient';
import IngredientRepository from './IngredientRepository'
// import Pantry from './Pantry';
//import image
import './images/apple-logo-outline.png'
import './images/apple-logo.png'
import './images/search.png'
import './images/cookbook.png'
import './images/seasoning.png'

// query selectors (move to domUpdates)
let allRecipesBtn = document.querySelector(".show-all-btn");
let filterBtn = document.querySelector(".filter-btn");
// let fullRecipeInfo = document.querySelector(".recipe-instructions");
let main = document.querySelector("main");
//can pantryBtn move to the dom file with the toggleMenu method??
let pantryBtn = document.querySelector(".my-pantry-btn");
let savedRecipesBtn = document.querySelector(".saved-recipes-btn");
let searchBtn = document.querySelector(".search-btn");
let searchForm = document.querySelector("#search");
let searchInput = document.querySelector("#search-input");
let showPantryRecipes = document.querySelector(".show-pantry-recipes-btn");
let tagList = document.querySelector(".tag-list");

//global variables (fit in functions?)
// let pantryInfo = [];
let menuOpen = false;
let recipes = [];
// let ingredients = [];
let user, recipeRepo;
//newly added
// let allUsers = [];
// let allIngredients = [];
// let allRecipes = [];

// event listeners 
// 3 event listeners for window load?
// window.addEventListener("load", createCards);
// window.addEventListener("load", findTags);
// window.addEventListener("load", generateUser);
allRecipesBtn.addEventListener("click", displayAllRecipes);

filterBtn.addEventListener("click", findCheckedBoxes);
// filterBtn.addEventListener("click", getUpdatedQuantity);

main.addEventListener("click", function (event) {
  addToMyRecipes(event)
});
pantryBtn.addEventListener("click", displayPantryMenu);
savedRecipesBtn.addEventListener("click", showSavedRecipes);
searchBtn.addEventListener("click", searchRecipes);
showPantryRecipes.addEventListener("click", findCheckedPantryBoxes);
searchForm.addEventListener("submit", pressEnterSearch);

//newly added
window.addEventListener('load', gatherData);


function gatherData() {
  Promise.all([getData('users'), getData('ingredients'),
    getData('recipes')])
    .then(data => {
      generateUserData(data[0]);
      generateIngredientData(data[1]);
      generateRecipeData(data[2]);
      // const allUsers = data[0].usersData;
      // const allIngredients = data[1].ingredientsData;
      // const allRecipes = data[2].recipeData;
      // generateUser(allUsers);
      // createCards(allRecipes);
    })
}



function generateUserData(data) {
  generateUser(data);
}

function generateIngredientData(data) {
  // data.forEach(item => ingredients.push(item))
  findPantryInfo(data);
}

function generateRecipeData(data) {
  recipeRepo = new RecipeRepository(data);
  createCards(recipeRepo.recipes);
  listTags(recipeRepo.findRecipeTags())

  // console.log(recipeRepo.findRecipeTags());
  // console.log('recipe func: ', recipeRepo);
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


// GENERATE A USER ON LOAD
// generates random user, gets name and renders first name to dom
// 2 functions, 51-52 stay, rest move to dom, 59 move to general window load function
function generateUser(userInfo) {
  user = new User(userInfo[Math.floor(Math.random() * userInfo.length)]);
  let firstName = user.name.split(" ")[0];
  let welcomeMsg = `
    <div class="welcome-msg">
      <h1>Welcome ${firstName}!</h1>
    </div>`;
  document.querySelector(".banner-image").insertAdjacentHTML("afterbegin",
    welcomeMsg);
  // findPantryInfo();
  //moved to generateIngredientData
}

// CREATE RECIPE CARDS
// refactor shortrecipe name to a wrap to show full name
// potentially broken down to 2 functions
// stays here, but move to helper function area
function createCards(recipeData) {
  recipeData.forEach(recipe => {
    let recipeInfo = new Recipe(recipe);
    let shortRecipeName = recipeInfo.name;
    recipes.push(recipeInfo);
    if (recipeInfo.name.length > 40) {
      shortRecipeName = recipeInfo.name.substring(0, 40) + "...";
    }
    addToDom(recipeInfo, shortRecipeName)
  });
}

// Move to dom file
function addToDom(recipeInfo, shortRecipeName) {
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
}

// FILTER BY RECIPE TAGS - MOVE TO RecipeRepository.js
// *** This was moved to RecipeRepo as method .findTags() that returns the sorted list of tags

// function findTags() {
//   let tags = [];
//   recipeData.forEach(recipe => {
//     recipe.tags.forEach(tag => {
//       if (!tags.includes(tag)) {
//         tags.push(tag);
//       }
//     });
//   });
//   tags.sort();
//   listTags(tags);
// }

// move to domUpdate
function listTags(allTags) {
  allTags.forEach(tag => {
    let tagHtml = `<li><input type="checkbox" class="checked-tag" id="${tag}">${tag}</li>`;
    tagList.insertAdjacentHTML("beforeend", tagHtml);
  });
}

// Just for ingredients? need to be own seperate function?
function capitalize(words) {
  return words.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}


// FILTER TAGGED RECIPES
// this works.. 
function findCheckedBoxes() {
  let tagCheckboxes = document.querySelectorAll(".checked-tag");
  let checkboxInfo = Array.from(tagCheckboxes)
  let selectedTags = checkboxInfo.filter(box => {
    return box.checked;
  })
  findTaggedRecipes(selectedTags);
}
// Moved to RecipeRepo as method .filterTaggedRecipes
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
// This filters the recipes that are not selected
function filterRecipes(filtered) {
  let foundRecipes = recipes.filter(recipe => {
    return !filtered.includes(recipe);
  });
  hideUnselectedRecipes(foundRecipes)
}


// move to domUpdates, should be in css
function hideUnselectedRecipes(foundRecipes) {
  foundRecipes.forEach(recipe => {
    let domRecipe = document.getElementById(`${recipe.id}`);
    domRecipe.style.display = "none";
  });
}

























// FAVORITE RECIPE FUNCTIONALITY
// pass event into this function
// serperate into different functions
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
    // serperate function
    exitRecipe();
  } else if (isDescendant(event.target.closest(".recipe-card"), event.target)) {
    openRecipeInfo(event);
  }
}
// is this needed? better way to target openRecipeInfo()?
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

// maybe 2 functions - showSaved hideSaved etc
// def refactor
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


// SEARCH RECIPES
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
















































// CREATE RECIPE INSTRUCTIONS 
function displayRecipeInfo(recipeID) {
  const currentRecipe = findRecipe(recipeID);
  const ingredients = findIngredients(recipeID);
  const instructions = findInstructions(recipeID)

  domUpdates.renderRecipeTitle(currentRecipe, ingredients);
  domUpdates.renderRecipeIngredients(ingredients);
  domUpdates.renderRecipeInstructions(instructions);
}

function findRecipeInfo(id) {
  // if event.target === id
  // ?????
}

function findRecipe(id) {
  const recipe = recipeData.find(recipe => recipe.id === id)
  const currentRecipe = new Recipe(recipe);
  return currentRecipe;
}

function findIngredients(id) {
  const listedIngredients = [];
  const getListedIngredients = recipe.ingredients.map(ingredient => {
    ingredients.forEach(listItem => {
      if (listItem.id === ingredient.id) {
        listedIngredients.push(listItem.name)
      }
    })
  })
  return listedIngredients;
}


function findInstructions(id) {
  return recipe.retrieveInstructions();
}



// -move to domUpdates
function openRecipeInfo(event) {
  // fullRecipeInfo.style.display = "inline";
  // let recipeId = event.path.find(e => e.id).id;
  // let recipe = recipeData.find(recipe => recipe.id === Number(recipeId));
  // generateRecipeTitle(recipe, generateIngredients(recipe));
  addRecipeImage(recipe);
  // generateInstructions(recipe);
  // fullRecipeInfo.insertAdjacentHTML("beforebegin", "<section id='overlay'></div>");
}

// move to domUpdates
// function generateRecipeTitle(recipe, ingredients) {
//   let recipeTitle = `
//     <button id="exit-recipe-btn">X</button>
//     <h4 id="recipe-title">${recipe.name}</h4>
//     <h3>Ingredients</h3>
//     <p>${ingredients}</p>`
//   fullRecipeInfo.insertAdjacentHTML("beforeend", recipeTitle);
// }


// recipe-title ID does NOT exist
function addRecipeImage(recipe) {
  document.getElementById("recipe-title").style.backgroundImage = `url(${recipe.image})`;
}

// function generateIngredients(recipe) {
//   return recipe && recipe.ingredients.map(i => {
//     return `${capitalize(i.name)} (${i.quantity.amount} ${i.quantity.unit})`
//   }).join(", ");
// }


// move to domUpdates
// function generateInstructions(recipe) {
//   let instructionsList = "";
//   let instructions = recipe.instructions.map(i => {
//     return i.instruction
//   });
//   instructions.forEach(i => {
//     instructionsList += `<li>${i}</li>`
//   });
//   fullRecipeInfo.insertAdjacentHTML("beforeend", "<h4>Instructions</h4>");
//   fullRecipeInfo.insertAdjacentHTML("beforeend", `<ol>${instructionsList}</ol>`);
// }

function exitRecipe() {
  while (fullRecipeInfo.firstChild &&
    fullRecipeInfo.removeChild(fullRecipeInfo.firstChild));
  fullRecipeInfo.style.display = "none";
  document.getElementById("overlay").remove();
}

// TOGGLE DISPLAYS - show/hide (show/hide hidden class)
function showMyRecipesBanner() {
  document.querySelector(".welcome-msg").style.display = "none";
  document.querySelector(".my-recipes-banner").style.display = "block";
}

function showWelcomeBanner() {
  document.querySelector(".welcome-msg").style.display = "flex";
  document.querySelector(".my-recipes-banner").style.display = "none";
}




















































// THis function replaces the toggleMenu below --- which was moved to the DOM file
function displayPantryMenu() {
  domUpdates.renderToggleMenu(menuOpen);
}

//**Moved to domUpdates
// function toggleMenu() {
//   var menuDropdown = document.querySelector(".drop-menu");
//   menuOpen = !menuOpen;
//   if (menuOpen) {
//     menuDropdown.style.display = "block";
//   } else {
//     menuDropdown.style.display = "none";
//   }
// }
//made to call the moved function below

function displayAllRecipes() {
  domUpdates.renderAllRecipes(recipes);
  showWelcomeBanner();
}
// **Moved to domUpdates --- now requires recipes to be passed as argument
// function showAllRecipes() {
//   recipes.forEach(recipe => {
//     let domRecipe = document.getElementById(`${recipe.id}`);
//     domRecipe.style.display = "block";
//   });
//   showWelcomeBanner();
// }


// CREATE AND USE PANTRY
// Split into seperate functions? 
// Goes inside Pantry Class?

//** Moved within the Pantry class - still need to build test to ensure functionality */
// function findPantryInfo() {
//   user.pantry.forEach(item => {
//     let itemInfo = ingredientsData.find(ingredient => {
//       return ingredient.id === item.ingredient;
//     });
//     let originalIngredient = pantryInfo.find(ingredient => {
//       if (itemInfo) {
//         return ingredient.name === itemInfo.name;
//       }
//     });
//     if (itemInfo && originalIngredient) {
//       originalIngredient.count += item.amount;
//     } else if (itemInfo) {
//       pantryInfo.push({name: itemInfo.name, count: item.amount});
//     }
//   });
//   displayPantryInfo(pantryInfo.sort((a, b) => a.name.localeCompare(b.name)));
// }


//****This replaces the function above to display the user Pantry info */
function findPantryInfo(ingredientData) {
  let pantry = new Pantry(user.pantry);
  let pantryInfo = pantry.returnCurrentPantry(ingredientData)
  domUpdates.renderPantryInfo(pantryInfo.sort((a, b) => a.name > b.name ? 1 : -1));
}

//add ingredient.name inside <li> when you're ready and add to domUpdates
// ** Moved to domUpdates file 
// function displayPantryInfo(pantry) {
//   pantry.forEach(ingredient => {
//     let ingredientHtml = `<li><input type="checkbox" class="pantry-checkbox" id="${ingredient.name}">${ingredient.name}</li>`;
//     document.querySelector(".pantry-list").insertAdjacentHTML("beforeend",
//       ingredientHtml);
//   });
// }
// does this belong in a Class?
// if this is data manipulation, does it belong in a Class with a method that filters/etc?
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
// this should maybe be in the RecipeRepository Class, but already there with filter by tag/recipe/name?
function findRecipesWithCheckedIngredients(selected) {
  let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
  let ingredientIDs = selected.map(item => {
    return parseInt(item.id);
  })
  //ingredientNames are just the names of those items selected ex: 'apple'
  // If this function is going to work, we either change what is being added as the ,<li> to include the ID, or we use the ingredients class?
  recipeRepo.recipes.forEach(recipe => {
    let allRecipeIngredients = [];
    // console.log(allRecipeIngredients)
    //the names of the ingredients in the recipe
    recipe.ingredients.forEach(ingredient => {    
      allRecipeIngredients.push(ingredient.id);
    });
    if (!recipeChecker(allRecipeIngredients, ingredientIDs)) {
      domUpdates.hideUnchecked(recipe);
      // ** The below was added to domUpdates
      // let domRecipe = document.getElementById(`${recipe.id}`);
      // domRecipe.style.display = "none";
    }
  })
}

// function findRecipesWithCheckedIngredients(selected) {
//   let recipeChecker = (arr, target) => target.every(v => arr.includes(v));
//   let ingredientNames = selected.map(item => {
//     return item.id;
//   })
//   //ingredientNames are just the names of those items selected ex: 'apple'
//   recipes.forEach(recipe => {
//     let allRecipeIngredients = [];
//     //the names of the ingredients in the recipe
//     recipe.ingredients.forEach(ingredient => {
//       allRecipeIngredients.push(ingredient.name);
//     });
//     if (!recipeChecker(allRecipeIngredients, ingredientNames)) {
//       domUpdates.hideUnchecked(recipe);
//       // ** The below was added to domUpdates
//       // let domRecipe = document.getElementById(`${recipe.id}`);
//       // domRecipe.style.display = "none";
//     }
//   })
// }















































//