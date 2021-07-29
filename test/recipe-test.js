const chai = require('chai');
const expect = chai.expect;

import Recipe from '../src/recipe';
import recipeData from '../src/data/recipe-data';

describe.only('Recipe', () => {
  let recipe, recipeInfo;

  beforeEach(() => {
    recipeInfo = recipeData[0];
    recipe = new Recipe(recipeInfo);
  });

  it('is a function', () => {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', () => {
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should initialize with an id', () => {
    expect(recipe.id).to.eq(595736);
  });

  it('should initialize with an name', () => {
    expect(recipe.name).to.eq('Loaded Chocolate Chip Pudding Cookie Cups');
  });

  it('should initialize with an image', () => {
    expect(recipe.image).to.eq(
      'https://spoonacular.com/recipeImages/595736-556x370.jpg'
    );
  });

  it('should initialize with an array of ingredients', () => {
    const ingredient = {
      id: 20081,
      name: 'all purpose flour',
      quantity: {
        amount: 1.5,
        unit: 'c',
      },
    };
    expect(recipe.ingredients[0]).to.deep.eq(ingredient);
  });

  it('should determine names of ingredients', () => {
    let ingredientList = [
      'all purpose flour',
      'baking soda',
      'egg',
      'granulated sugar',
      'instant vanilla pudding mix',
      'light brown sugar',
      'salt',
      'sea salt',
      'semisweet chocolate chips',
      'unsalted butter',
      'vanilla extract',
    ];
    expect(recipe.getIngredientNameList()).to.deep.equal(ingredientList);
  });

  it('should retrieve the instructions for the recipe', () => {
    let recipeInstructions =
      'Step 1: In a large mixing bowl, whisk together the dry ingredients (flour, pudding mix, soda and salt). Set aside.In a large mixing bowl of a stand mixer, cream butter for 30 seconds. Gradually add granulated sugar and brown sugar and cream until light and fluffy. Step 2: Add egg and vanilla and mix until combined. Step 3: Add dry ingredients and mix on low just until incorporated. Stir in chocolate chips.Scoop the dough into 1,5 tablespoon size balls and place on a plate or sheet. Cover with saran wrap and chill at least 2 hours or overnight.When ready to bake, preheat oven to 350 degrees. Step 4: Place the cookie dough balls into ungreased muffin pan. Sprinkle with sea salt. Step 5: Bake for 9 to 10 minutes, or until you see the edges start to brown. Step 6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce. ';
    expect(recipe.retrieveInstructions()).to.equal(recipeInstructions);
  });

  // it('should calculate the total cost of all of the ingredients', () => {
  //   expect(recipe.calculateIngredientsCost()).to.eq();
  // });
});
