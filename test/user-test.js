import { expect } from 'chai';

import User from '../src/user';
import users from '../src/data/users-data.js';

describe('User', () => {
	let user, userInfo, recipe;

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

	it.skip('should initialize with an empty recipesToCook array', function () {
		expect(user.recipesToCook).to.deep.equal([]);
	});

	it.skip('should be able to save a recipe to favoriteRecipes', function () {
		user.saveRecipe(recipe);
		expect(user.favoriteRecipes[0].name).to.equal('Chicken Parm');
	});

	it.skip('should be able to decide to cook a recipe', function () {
		user.decideToCook(recipe);
		expect(user.recipesToCook[0].name).to.equal('Chicken Parm');
	});

	it.skip('should be able to filter recipes by type', function () {
		user.saveRecipe(recipe);
		expect(user.filterRecipes('italian')).to.deep.equal([recipe]);
	});

	it.skip('should be able to search recipes by name', function () {
		user.saveRecipe(recipe);
		expect(user.searchForRecipe('Chicken Parm')).to.deep.equal([recipe]);
	});
});
