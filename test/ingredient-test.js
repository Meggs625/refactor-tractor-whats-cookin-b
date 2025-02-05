import { expect } from 'chai';
import Ingredient from '../src/Ingredient.js';
import IngredientRepository from '../src/IngredientRepository.js';
import ingredientsData from '../src/data/ingredient-data.js';

describe('Ingredient', () => {
  let ingredientRepo, ingredient, ingredient2;
  
  beforeEach(() => {
    ingredientRepo = new IngredientRepository(ingredientsData);
    ingredient = new Ingredient(20081, 'wheat flour', 142, ingredientRepo);
    ingredient2 = new Ingredient(12061, 'whole almonds', 1029, ingredientRepo)
  });
  
  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('should store an ingredient id', () => {
    expect(ingredient.id).to.equal(20081);
  });
  
  it('should store an ingredient name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('should store an ingredient cost', () => {
    expect(ingredient.cost).to.equal(142);
  });

  it('should have a way to return the cost in dollars', () => {
    expect(ingredient.updateCostToDollars(20081, 142)).to.equal(1.42);
    expect(ingredient2.updateCostToDollars(12061, 1029)).to.equal(10.29);
  });

  it('should have a way to calculate the cost of an ingredient', () => {
    expect(ingredient.calculateTotalIngredientCost(20081, 5)).to.equal(7.10);
    expect(ingredient2.calculateTotalIngredientCost(12061, 5)).to.equal(51.45);
  });
});
