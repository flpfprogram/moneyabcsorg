/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var app = angular.module('moneyabcsProfile', []);

app.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('error', function(){
            angular.element(this).attr("src", "./images/defaultImg/search_" + Math.ceil(Math.random()*140) + "/" + Math.ceil(Math.random()*5) + ".png");
        });
    }
  };
});


app.controller("moneyProfileAbcs",function($scope,$http,$window){
	$scope.getUserProfile = function(){
		$http.post('/api/getProfile',{emailId : $window.localStorage.getItem("uName")}).success(function(res){
        	$scope.profile = res;
			console.log($scope.profile);
    	});
	}
	$scope.getUserProfile();
});