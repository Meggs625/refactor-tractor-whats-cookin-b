import { expect } from 'chai';

import Ingredient from '../src/Ingredient.js';
import ingredientsData from '../src/data/ingredient-data.js';

describe.only ('Ingredient', () => {
  let ingredient, ingredient2;
  
  beforeEach(() => {
    ingredient = new Ingredient(20081, 'wheat flour', 142);
    ingredient2 = new Ingredient(12061, 'whole almonds', 1029)

  })
  
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
    expect(ingredient.estimatedCostInCents).to.equal(142);
  });
  
  it('should have a way to return the ingredient name', () => {
    expect(ingredient.returnIngredientName()).to.equal('wheat flour');
    expect(ingredient2.returnIngredientName()).to.equal('whole almonds');
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
