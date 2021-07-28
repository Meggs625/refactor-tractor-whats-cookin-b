import { expect } from 'chai';

import User from '../src/user';
import users from '../src/data/users-data.js';

describe('User', () => {
	let user, recipe;

	beforeEach(() => {
		user = new User(users[0]);
		recipe = { name: 'Chicken Parm', type: ['italian', 'dinner'] };
	});

	it('should be a function', () => {
		expect(User).to.be.a('function');
	});

	it('should initialize with an id', () => {
		expect(user.id).to.eq(1);
	});

	it('should initialize with a name', () => {
		expect(user.name).to.eq("Saige O'Kon");
	});

	it('should initialize with a pantry', () => {
		expect(user.pantry[0].ingredient).to.eq(11477);
	});

	it('should initialize with an empty favoriteRecipes array', () => {
		expect(user.favoriteRecipes).to.deep.equal([]);
	});

	it('should initialize with an empty recipesToCook array', () => {
		expect(user.recipesToCook).to.deep.equal([]);
	});

	it('should be able to save a recipe to favoriteRecipes', () => {
		user.favoriteRecipe(recipe);
		expect(user.favoriteRecipes[0].name).to.equal('Chicken Parm');
	});

	it('should be able to decide to cook a recipe', () => {
		user.decideToCook(recipe);
		expect(user.recipesToCook[0].name).to.equal('Chicken Parm');
	});

	it('should be able to filter recipes by type', () => {
		user.favoriteRecipe(recipe);
		expect(user.filterRecipes('italian')).to.deep.equal([recipe]);
	});

	it('should be able to search recipes by name', () => {
		user.favoriteRecipe(recipe);
		expect(user.searchForRecipe('Chicken Parm')).to.deep.equal([recipe]);
	});
});
