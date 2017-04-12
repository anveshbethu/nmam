(function(angular) {
	'use strict';
angular.module('myService', [])
.factory('mainService', function() {
	var locations=['hyd', 'wrg', 'kmm', 'sec'];
	var list = [];
	var addToList = function(n, l, nu, d){
		list.push({name: n, location: l, number:nu, done:d});
	};
	return {
		locations: locations,
		addToList: addToList,
		list: list
	};
	
});
})(window.angular);