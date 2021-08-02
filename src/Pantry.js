import IngredientRepository from './IngredientRepository';


class Pantry {
  constructor(userPantry) {
    this.pantry = userPantry;
    this.shoppingList = [];
  }

  
  returnCurrentPantry(ingredientData) {
    const ingredientRepo = new IngredientRepository(ingredientData)
    let currentFoodItems = [];
    this.pantry.forEach(item => {
      currentFoodItems.push(
        {name: ingredientRepo.returnIngredientName(item.ingredient), 
          id: item.ingredient,
          amount: item.amount})
    });
    return currentFoodItems;
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


export default Pantry;

