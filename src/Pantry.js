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

  assessIfCanCookRecipe(recipeData) {
    const missingIngredients = [];
    const haveIngredients = 
      this.pantry.reduce((arr, item) => {
        recipeData.forEach(ingredient => {
          if (ingredient.id === item.ingredient && 
          item.amount >= ingredient.quantity.amount) {
            arr.push(item)
          } else {
            if (!missingIngredients.includes(ingredient.id)) {
              const amountMissing = (ingredient.quantity.amount - item.amount);
              this.shoppingList.push({
                name: ingredient.name, 
                id: ingredient.id, 
                amount: amountMissing})
              missingIngredients.push(ingredient.id)
            }
          }
        })
        return arr;
      }, []);
    return haveIngredients;      
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

}

export default Pantry;