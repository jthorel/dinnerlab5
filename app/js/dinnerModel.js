// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource, $cookieStore) {

  // sets the number of guests
  // pre: int
  // post: none
  this.setNumberOfGuests = function(num) {
    numberOfGuests = num;
    $cookieStore.put('number', num);
  }

  // gets the id's from a saved session and stores them in the fullmenu
  this.getSavedMenu = function(ids) {
    var tempmenu = [];
    for(i in ids) {
      tempmenu.push(this.Dish.get({id: ids[i]}));
    }

    this.fullMenu = tempmenu;

  }



  // returns number of guests
  // pre: none
  // post: int
  this.getNumberOfGuests = function() {
    return numberOfGuests;
  }

  // returns full menu
  // pre: none
  // post: object array
  this.getFullMenu = function() {
    return this.fullMenu;
  }


  // returns all Ingredients in the FULL MENU, to help calculate the full price
  // pre: none
  // post: object array
  this.getAllIngredients = function() {
    var ingredientArray = [];

    for (i in this.fullMenu){
      for(k in this.fullMenu[i].Ingredients){
        ingredientArray.push(this.fullMenu[i].Ingredients[k]);
      }
    }
    return ingredientArray;
  }

  this.getDishIngredients = function(dish) {
    var ingredientArray = [];

    for (i in dish){
      for(k in dish[i].Ingredients){
        ingredientArray.push(dish[i].Ingredients[k]);
      }
    }
    return ingredientArray;
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  // pre: int
  // post: none
  this.addDishToMenu = function(dish) {

    var tempdish = dish;

    for (i in this.fullMenu){
      if (tempdish.Category === this.fullMenu[i].Category){
        this.fullMenu[i] = tempdish;
        return;
      }
    }
    this.fullMenu.push(tempdish);
    this.savedMenuIDs.push(tempdish.RecipeID);
    console.log(this.savedMenuIDs)
    $cookieStore.put('menu', this.savedMenuIDs);  
    
    console.log(this.fullMenu)
  }

  // Removes dish from menu
  // pre: int
  // post: none
  this.removeDishFromMenu = function(id) {
    for (i in this.fullMenu){
      if(this.fullMenu[i].RecipeID == id){
        this.fullMenu.splice(i,1);
      }
    }
  }


  // returns the price of the full menu
  // pre: none
  // post: int
  this.getTotalMenuPrice = function() {
    //TODO Lab 2
    var sum = 0;
    var ingredientArray = this.getAllIngredients();


    for (i in ingredientArray){
      var price = ingredientArray[i].MetricQuantity*numberOfGuests;
      sum = sum + price;
    }

    return sum;
  }

  // returns the 
  this.getDishPrice = function(dish){
    if(dish && dish.Ingredients){
      var _this = this;
      console.log(dish)
      return dish.Ingredients.reduce(function(prev, ingredient){
        return prev + (ingredient.MetricQuantity * _this.getNumberOfGuests());
      }, 0)
    }
  }

  var apikey = '18f3cT02U9f6yRl3OKDpP8NA537kxYKu';
  this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apikey});
  // Dinner.DishSearch.get({title_kw: filter, any_kw: type})

  this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apikey}); 
  // Dinner.Dish.get({id: recipeid})

  this.fullMenu = [];
  var numberOfGuests = 0;
  this.savedMenuIDs = [];
  
  if (!(numberOfGuests = $cookieStore.get('number'))) {
    this.setNumberOfGuests(2);
  }

  if(this.savedMenuIDs = $cookieStore.get('menu')) {
    this.getSavedMenu(this.savedMenuIDs);
  } else {
    this.savedMenuIDs = [];
  }



  




  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});