(function(angular) {
	'use strict';
angular.module('myApp', ['myService'])
.controller('mainController', ['$scope', '$http', 'mainService', function($scope, $http, mainService) {
	$scope.name='bethu';
	$scope.loc='hyd';
	$scope.otherLoc=mainService.locations;
	$scope.num='123';
	$scope.temp='';
	$scope.done=false;
	$scope.getDatetime = function() {
  	return (new Date).toLocaleFormat("%A, %B %e, %Y");
	};
	/*
	$scope.addList = function(){
		$scope.temp=$scope.loc + '' + $scope.num;
		mainService.addToList($scope.name, $scope.loc, $scope.num, $scope.done.value1, $scope.getDatetime);
	};
	*/
	$scope.fetchTodos = function() {
        return $http.get('/api/reqs').then(
            function(response) {
          $scope.viewList = response.data;
        }, function(errResponse) {
          console.error('Error while fetching notes');
        });
      };
	
	$scope.addList = function(){
		  $http.post('/api/reqs', $scope.newTodo)
            .then($scope.fetchTodos)
            .then(function(response) {
              $scope.newTodo = {};
            });
		
	}
	
//	$scope.viewList = mainService.list;
	$http.get('/api/reqs/').then(function(response) {
        $scope.viewList = response.data;
      }, function(errResponse) {
        console.error('Error while fetching notes');
      });
}]);
})(window.angular);