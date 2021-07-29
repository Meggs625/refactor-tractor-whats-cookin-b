class Pantry {
  constructor(userPantry) {
    this.pantry = userPantry;
    this.shoppingList = [];
  }

  
  returnCurrentPantry() {
    let currentFoodItems = [];
    this.pantry.forEach(item => {
      currentFoodItems.push(futureIngredientMethod(item.ingredient))
    });  
    return currentFoodItems;
    // need to build test for this when able to call the ingredient's method
  }

  assessIfCanCookRecipe(recipeData) {
    this.pantry.filter(item => {
      return recipeData.find(ingredient => {
        ingredient.id === item.ingredient;
      })
    })
    
  }

  createShoppingList(recipeData) {
    recipeData.forEach(item => {
      if (!this.pantry.includes(ingredient.id)) {
        this.shoppingList.push(
          {name: ingredient.name, 
            id: ingredient.id,
            amount: ingredient.amount})
      }
    })
  }

  // findPantryInfo(ingredients) {
  //   this.pantry.forEach(item => 
  //     let itemInfo = ingredients.find(ingredient => {
  //       return ingredient.id === item.ingredient;
  //     });
  //     //itemInfo = the matching ingredient object{id, name, estimcost}
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

}

export default Pantry;