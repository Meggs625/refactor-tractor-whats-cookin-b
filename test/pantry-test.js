import {expect} from 'chai';
import Pantry from '../src/Pantry';
import samplePantryData from '../src/data/pantry-test-data';
import sampleRecipeData from '../src/data/recipe-test-data';

describe('Pantry', () => {
  let userPantry;

  beforeEach(() => {
    userPantry = new Pantry(samplePantryData);
  })

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  })

  it('should be an instance of the Pantry class', () => {
    expect(userPantry).to.be.an.instanceOf(Pantry);
  })

  it('should hold a user\'s pantry data', () => {
    expect(userPantry.pantry).to.deep.equal(samplePantryData)
  })

  // it('should return the name of the ingredients currently in the pantry', () => {
  //   const currentPantry = userPantry.returnCurrentPantry();
  //   expect(currentPantry).to.deep.equal()
  // })

  it('should determine if it holds all necessary ingredients for a recipe', () => {
    let canCook = userPantry.assessIfCanCookRecipe(sampleRecipeData) 
    expect(canCook).to.equal(false);
  })

})