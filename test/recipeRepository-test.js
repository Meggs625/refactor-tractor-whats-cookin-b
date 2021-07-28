const chai = require('chai');
const expect = chai.expect;

import RecipeRepository from '../src/RecipeRepository';
import recipeData from '../src/data/recipe-data';

describe.only('RecipeRepository' , () => {
  let recipeRepository;

  beforeEach(() => {
    recipeRepository = new RecipeRepository(recipeData);
  })

  it('should be a function', () => {
    expect(RecipeRepository).to.be.a.a('function');
  })

  it('should return recipe tags', () => {
    expect(recipeRepository.findRecipeTags()).to.deep.equal(
      ['antipasti',    'antipasto',
      'appetizer',    'breakfast',
      'brunch',       'condiment',
      'dinner',       'dip',
      "hor d'oeuvre", 'lunch',
      'main course',  'main dish',
      'morning meal', 'salad',
      'sauce',        'side dish',
      'snack',        'spread',
      'starter']);
  })

  it('should return recipes that include selected tags', () => {
    expect(recipeRepository.findTaggedRecipes(['brunch']).length).to.equal(1)
  })

  it('should be able to search by name or ingredient', () => {
    expect(recipeRepository.filterSearchRecipes(['Apple', 'Chip', 'Cookie', 'Dog']).length).to.equal(8);
  })


})