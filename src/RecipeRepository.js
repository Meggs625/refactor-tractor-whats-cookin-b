class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData
  }

  findTags () {
    let tags = [];
    this.recipes.forEach(recipe => {
      recipe.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
    tags.sort();
    return tags;
  }

  filterTaggedRecipes (tags) {
    return this.recipes.filter(recipe => )
  }

  filterSearchRecipes () {

  }
}

export default RecipeRepository;