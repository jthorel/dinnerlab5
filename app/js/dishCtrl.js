// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {
  
  
  
  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  $scope.getDishPrice = function (dish) {
    return Dinner.getDishPrice(dish);
  }

  $scope.addDishToMenu = function(dish) {
  	Dinner.addDishToMenu(dish);
  }


  var dishid = $routeParams.dishId;
  Dinner.Dish.get({id: dishid}, function(data) {
    $scope.dish = data;
  });

  // TODO in Lab 5: you need to get the dish according to the routing parameter
  // $routingParams.paramName
  // Check the app.js to figure out what is the paramName in this case
  
});