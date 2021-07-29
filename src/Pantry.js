class Pantry {
  constructor(userPantry) {
    this.pantry = userPantry;
    this.shoppingList = [];
  }

  
  returnCurrentPantry() {
    let currentFoodItems = [];

    this.pantry.forEach(item => {
      currentFoodItems.push(futureIngredientmethod(item.ingredient))
    });  
    return currentFoodItems;
    // need to build test for this when able to call the ingredient's method
  }

  assessAvailableIngredients(recipeData) {


  }
  //Need to have the recipe ingredients array passed through as an argument? From the recipe class? 
  //Method will compare the pantry.ingredient to the recipe.id and the pantry.amount to the recipe.quantity.amount

  //could push quanity and ingredient into an array property of groceryList

  //ingredients method to return name based on ID - could be used if passed id from groceryList array

  //


}

export default Pantry;