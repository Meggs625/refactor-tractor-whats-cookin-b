class RecipeRepository {
  constructor(recipeData) {
    this.recipes = recipeData
  }

  findRecipeTags () {
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

  findTaggedRecipes (selectedTags) {
    let filteredTagResults = [];
    selectedTags.forEach(tag => {
      let allRecipes = this.recipes.filter(recipe => {
        return recipe.tags.includes(tag);
      });

      allRecipes.forEach(recipe => {
        if (!filteredTagResults.includes(recipe)) {
          filteredTagResults.push(recipe);
        }
      })
    });
   return filteredTagResults;
  }

  //might need to add functionality to lowercase all names/search material
  filterSearchRecipes (searchWords) {
    let filteredSearchResults = [];
    searchWords.forEach(word => {
      this.recipes.forEach(recipe => {
        if (filteredSearchResults.includes(recipe)) {
          return
        }
        if (recipe.name.includes(word)) {
          return filteredSearchResults.push(recipe)
        } 
        recipe.ingredients.forEach(ingredient => {
          if (ingredient.name.includes(word)) {
            return filteredSearchResults.push(recipe);
          }
        })
      })      
    })
    return filteredSearchResults;
  }
}

export default RecipeRepository;