class Recipe {
  constructor(recipe) {
    this.id = recipe.id;
    this.name = recipe.name;
    this.image = recipe.image;
    this.tags = recipe.tags;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
  }

  getIngredientNameList() {
    return this.ingredients.map(ingredient => ingredient.name)
  }

  calculateIngredientsCost() {
    return this.ingredients.reduce((acc, ingredient) => {
      acc += ingredientData.costMethod(ingredient.id);
      return acc;
    }, 0)
  }

  retrieveInstructions() {
    return this.instructions.reduce((string, instruc) => {
      string += `Step ${instruc.number}: ${instruc.instruction} `
      return string;
    }, '')
  }

}

export default Recipe;
