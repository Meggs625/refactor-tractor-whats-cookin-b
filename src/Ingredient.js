class Ingredient {
  constructor(id, itemName, cost) {
    this.id = id;
    this.name = itemName;
    this.estimatedCostInCents = cost;
  }

  returnIngredientName() {
    return this.name;
  }

  updateCostToDollars(id, cost) {
    this.estimatedCostInCents = Math.floor(cost) / 100;
    return this.estimatedCostInCents;
  }

  calculateTotalIngredientCost(id, quantity) {
    let total = this.estimatedCostInCents * quantity;
    return this.updateCostToDollars(id, total)
  }
}


export default Ingredient;