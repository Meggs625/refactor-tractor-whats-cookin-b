class Ingredient {
  constructor(id, name, cost, data) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.ingredientsRepo = data;
  }

  returnIngredientName(id) {
    return this.name;
  }

  updateCostToDollars(id, cost) {
    this.cost = Math.floor(cost) / 100;
    return this.cost;
  }

  calculateTotalIngredientCost(id, quantity) {
    let total = this.cost * quantity;
    return this.updateCostToDollars(id, total);
  }
}


export default Ingredient;