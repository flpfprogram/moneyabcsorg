/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var app = angular.module('moneyabcs1', []);

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


app.controller("abcctrl",function($scope,$http,$sce){
	$scope.searchArticle = function() {
		console.log("in search data");
		$http.post("/searchSample", {name: document.getElementById('search-key').value }).success(function(res) {
            //$scope.hello = data;
			console.log(res);
			$(".searchHide").hide();
			$("#articleLoadMore").hide();
			if(res.data.length > 0){
				$scope.totalRes = res.data;
				//$scope.articleFeatured = $scope.totalRes.splice(0,2);
				$scope.article = $scope.totalRes.splice(0,res.data.length);
				console.log($scope.article);
				for(var i=0;i<res.data.length;i++){
					url = $scope.article[i].iframeLink;
					$scope.article[i].iframeLink = $sce.trustAsResourceUrl(url);
				}
			} else {
				//print error message that data is not found
				$scope.err = res.errMsg;
			}
        });
	}
	var setData = function(res){
		var url = "";
		$scope.backUp1 = res;
		$scope.totalRes1 = res;
		$scope.articleFeaturedList = $scope.totalRes1.splice(0,2);
		$scope.articleList = $scope.totalRes1.splice(0,8);
		for(var i=0;i<8;i++){
			url = $scope.articleList[i].iframeLink;
			$scope.articleList[i].iframeLink = $sce.trustAsResourceUrl(url);
		}
				$(".sidebar_icons").show();
	}
	
	var getFeaturedArticles1 = function($scope){
		//localStorage.setItem("articleTopics", "Finance%20Planning,Career%20Planning,Financial%20Planners");
		//console.log(localStorage.getItem("articleTopics"));
		$scope.func = function(){
			var articleTopics = localStorage.getItem("articleTopics");
			console.log(articleTopics);
			if(articleTopics){
				$http.post("/article/chosenTopics", {articleTopics : localStorage.getItem("articleTopics") }).success(function(res) {
					console.log(res);
					setData(res);
				});
			} else {
				$http.get("/article/featured").success(function(res){
					console.log("inside featured");
					console.log($scope.func);
					setData(res);
				});
			}
		}
		$scope.func();
	}
	getFeaturedArticles1($scope);
	$scope.loadMore = function(){
		//var arr = $scope.totalRes.splice(0,9);
		var arr = ($scope.totalRes.length >= 8 ? $scope.totalRes.splice(0,8) : $scope.totalRes.splice(0,$scope.totalRes.length));
		console.log($scope.totalRes.length);
		for(var i=0;i < arr.length;i++){
			$scope.article.push(arr[i]);
		}
		($scope.totalRes.length == 0 ? $scope.hideShowMore = !$scope.hideShowMore : "");
	}
	$scope.formData = {};
	
    // when landing on the page, get all todos and show them
    $http.get("/api/todos")
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post("/api/todos", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
	$scope.createFinance = function() {
        $http.post("/api/finance", $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
});


app.controller("MoneyController",function($http,$scope){
	$http.get('/api/username')
        .success(function(data) {
            $scope.user = data;
            console.log(data);
        });
        
});

	


