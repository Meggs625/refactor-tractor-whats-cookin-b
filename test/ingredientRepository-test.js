import { expect } from 'chai';
import IngredientRepository from '../src/IngredientRepository.js';
import ingredientsData from '../src/data/ingredient-data.js';

describe.only('IngredientRepository', () => {
  let ingredientRepo, ingredient;
  
  beforeEach(() => {
    ingredientRepo = new IngredientRepository(ingredientsData);
    ingredient = new IngredientRepository(ingredientsData[0])
  });
  
  it('should be a function', () => {
    expect(IngredientRepository).to.be.a('function');
  });

  it('should be an instance of Ingredient', () => {
    expect(ingredientRepo).to.be.an.instanceOf(IngredientRepository);
  });

  it('should store the entire ingredient dataset', () => {
    expect(ingredientRepo.data).to.deep.equal(ingredientsData);
  });

  it('should have a way to return the ingredient name', () => {
    expect(ingredientRepo.returnIngredientName(20081)).to.deep.equal('wheat flour');
  });
});  

