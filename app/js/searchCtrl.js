// Search controller that we use whenever we have a search inputs
// and search results
dinnerPlannerApp.controller('SearchCtrl', function ($scope,Dinner) {


	// a method in the scope to get the dishes with the query that is grabbed from the input text (ng-model)
	$scope.search = function(query) {
		$scope.status = "Searching...";
		Dinner.DishSearch.get({title_kw:query},function(data){
			$scope.dishes=data.Results;
			console.log(data);
			$scope.status = "Showing " + data.Results.length + " results";
		},function(data){
			$scope.status = "There was an error";
		});
 	}

  // TODO in Lab 5: you will need to implement a method that searchers for dishes
  // including the case while the search is still running.

});