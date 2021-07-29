class Ingredient {
  constructor(id, itemName, cost) {
    this.id = id;
    this.name = itemName;
    this.estimatedCostInCents = cost;
  }

  returnIngredientName(id) {
    return this.name;
  }

  updateCostToDollars(id) {
    let dollarValue = Math.floor(this.estimatedCostInCents) / 100;
    return dollarValue;
  }

  calculateTotalIngredientCost(id, quantity) {

  }
  // create method to return cost in dollars?
  // create method to return ingredient name
  // create method calculate total ingredient cost
    //[pass in an id and quantity]
}

export default Ingredient;