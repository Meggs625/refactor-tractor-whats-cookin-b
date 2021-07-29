import { expect } from 'chai';

import Ingredient from '../src/Ingredient.js';
import ingredientsData from '../src/data/ingredient-data.js';

describe.only ('Ingredient', () => {
  let ingredient;
  
  beforeEach(() => {
    ingredient = new Ingredient(20081, 'wheat flour', 142);
  })
  
  it('should be a function', () => {
    expect(Ingredient).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredient).to.be.an.instanceOf(Ingredient);
  });

  it('should store an ingredient id', () => {
    console.log(ingredient)
    expect(ingredient.id).to.equal(20081);
  });
  
  it('should store an ingredient name', () => {
    expect(ingredient.name).to.equal('wheat flour');
  });

  it('should store an ingredient cost', () => {
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });
  
  it('should have a way to return the ingredient name', () => {
    expect(ingredient.returnIngredientName(20081)).to.equal('wheat flour');
  });

  it('should have a way to return the cost in dollars', () => {
    expect(ingredient.updateCostToDollars(20081)).to.equal(1.42);
  });

  it('should have a way to calculate the cost of an ingredient', () => {
    expect(ingredient.calculateTotalIngredientCost(20081, 5)).to.equal(56);
  });
});