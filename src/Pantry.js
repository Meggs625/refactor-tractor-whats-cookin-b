class Pantry {
  constructor(userPantry) {
    this.pantry = userPantry;
    this.shoppingList = [];
  }

  
  returnCurrentPantry() {
    let currentFoodItems = [];
    this.pantry.forEach(item => {
      currentFoodItems.push(
        {name: futureIngredientMethod(item.ingredient), 
          amount: item.amount})
    });  
    return currentFoodItems;
    // need to build test for this when able to call the ingredient's method
  }

  assessIngredients(recipeData) {
    const missingIngredients = [];
    const pantryIngredients = [];
    recipeData.forEach(ingredient => {
      let itemInStock = 
        this.pantry.find(item => ingredient.id === item.ingredient)
      if (itemInStock) {
        pantryIngredients.push(itemInStock)
      } else {
        missingIngredients.push(ingredient)
      }
    })
    this.createShoppingList(missingIngredients)
    const pantryItems = this.assessAmountForRecipe(pantryIngredients, recipeData);
    if (pantryItems && missingIngredients.length === 0) {
      return true;
    } else {
      return false
    }
  }

  createShoppingList(neededIngredients) {
    neededIngredients.forEach(ingredient => {
      this.shoppingList.push(
        {name: ingredient.name,
          id: ingredient.id,
          amount: ingredient.quantity.amount})
    })
  }

  assessAmountForRecipe(pantryItems, recipeIngredients) {
    let itemCount = 0;
    recipeIngredients.forEach(ingredient => {
      let currentItem = 
      pantryItems.find(item => item.ingredient === ingredient.id)
      if (currentItem) {
        if (currentItem.amount >= ingredient.quantity.amount) {
          itemCount ++;
        } else if (currentItem.amount < ingredient.quantity.amount) {
          this.shoppingList.push(
            {name: ingredient.name,
              id: ingredient.id,
              amount: ingredient.quantity.amount - currentItem.amount})
        }
      }
    })
    if (itemCount === pantryItems.length) {
      return true;
    } else {
      return false
    }
  }
}
// CODE FROM THE SCRIPTS FILE THAT LOOKS TO BE PANTRY ORIENTED

// findPantryInfo(ingredients) {
//   this.pantry.forEach(item => 
//     let itemInfo = ingredients.find(ingredient => {
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


export default Pantry;

