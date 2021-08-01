import {expect} from 'chai';
import Pantry from '../src/Pantry';
import samplePantryData from '../src/data/pantry-test-data';
import sampleRecipeData from '../src/data/recipe-test-data';
import sampleIngredientData from '../src/data/ingredient-test-data'


describe.only('Pantry', () => {
  let userPantry;

  beforeEach(() => {
    userPantry = new Pantry(samplePantryData);
  });

  it('should be a function', () => {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of the Pantry class', () => {
    expect(userPantry).to.be.an.instanceOf(Pantry);
  });

  it('should hold a user\'s pantry data', () => {
    expect(userPantry.pantry).to.deep.equal(samplePantryData)
  });

  it('should return the name of the ingredients currently in the pantry', () => {
    const currentPantry = userPantry.returnCurrentPantry(sampleIngredientData);
    expect(currentPantry[0].name).to.equal('zucchini squash')
  });

  it('should determine if it holds all necessary ingredients for a recipe', () => {
    let cannotCook = userPantry.assessIngredients(sampleRecipeData) 
    expect(cannotCook).to.equal(false);
  });

  it('should determine if a different recipe can be cooked', () => {
    let recipe1 =  [{
      "name": "fresh parsley",
      "id": 11297,
      "quantity": {
        "amount": 0.25,
        "unit": "cup"
      }
    },
    {
      "name": "kosher salt",
      "id": 1082047,
      "quantity": {
        "amount": 0.25,
        "unit": "teaspoon"
      }
    },
    {
      "name": "garlic",
      "id": 11215,
      "quantity": {
        "amount": 1,
        "unit": "clove"
      }
    }]
    let canCook = userPantry.assessIngredients(recipe1);
    expect(canCook).to.equal(true);
  });

  it('should not add anything to the shopping list if the recipe can be cooked', () => {
    let recipe2 =  [{
      "name": "fresh parsley",
      "id": 11297,
      "quantity": {
        "amount": 0.25,
        "unit": "cup"
      }
    },
    {
      "name": "kosher salt",
      "id": 1082047,
      "quantity": {
        "amount": 0.25,
        "unit": "teaspoon"
      }
    },
    {
      "name": "garlic",
      "id": 11215,
      "quantity": {
        "amount": 1,
        "unit": "clove"
      }
    }]
    userPantry.assessIngredients(recipe2);
    expect(userPantry.shoppingList).to.deep.equal([])
  });

  it('should add all missing ingredients to the shopping list', () => {
    userPantry.assessIngredients(sampleRecipeData)
    expect(userPantry.shoppingList.length).to.equal(8)
  });

  it('should store the ingredient name, id, and needed amount in the shopping list', () => {
    userPantry.assessIngredients(sampleRecipeData)
    expect(userPantry.shoppingList[0]).to.deep.equal(
      { name: 'baking powder', id: 18371, amount: 2 })
  });

  it('should calculate exactly how much of an ingredient is missing and add that to the shopping list', () => {
    userPantry.assessIngredients(sampleRecipeData);
    expect(userPantry.shoppingList[7].amount).to.deep.equal(9)
  });

})