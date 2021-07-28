import { expect } from 'chai';

import Ingredient from '../src/Ingredient.js';
import ingredientsData from '../src/data/ingredient-data.js';

describe ('Ingredient', () => {
  let ingredient;
  
  beforeEach(() => {
    ingredient = new Ingredient(ingredientsData[0]);
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
    expect(ingredient.estimatedCostInCents).to.equal(142);
  })
  

});