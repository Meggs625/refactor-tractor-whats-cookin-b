class User {
	constructor(user) {
		this.id = user.id;
		this.name = user.name;
		this.pantry = user.pantry;
		this.favoriteRecipes = [];
		this.recipesToCook = [];
	}

	favoriteRecipe(recipe) {
		this.favoriteRecipes.push(recipe);
		// return this.favoriteRecipes
	}

	removeFavoriteRecipe(recipe) {
		let i = this.favoriteRecipes.indexOf(recipe);
		this.favoriteRecipes.splice(i, 1);
		// return this.favoriteRecipes
	}

	decideToCook(recipe) {
		this.recipesToCook.push(recipe);
		// return this.recipesToCook
	}

	filterRecipes(type) {
		return this.favoriteRecipes.filter(recipe => recipe.type.includes(type));
	}

	searchForRecipe(keyword) {
		return this.favoriteRecipes.filter(recipe => recipe.name.includes(keyword) || recipe.ingredients.includes(keyword));
	}
}

export default User;
