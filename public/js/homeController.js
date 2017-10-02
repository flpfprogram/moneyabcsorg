/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var home = {
    
};

app.controller('carousel', ['$scope', '$interval',function($scope,$interval) {
	var images = ['http://www.moneyabcs.org/images/finance1.jpg',
		'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
		 'http://www.moneyabcs.org/images/finance1.jpg',
		 'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
	];
    try{
		i=0;
		$interval(function() {
			if(i==3){i=0;}
			$scope.carouselImage = {
				'background-image': 'url('+ images[i] +')'
			};
			i++;
		},3000);
		
	}catch(e){console.log(e)}
}]);

app.controller('gallery', function($scope) {
	var images = {
		grid1 : {
			a : 'http://www.moneyabcs.org/images/finance1.jpg',
			b: 'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
			c : 'http://www.moneyabcs.org/images/finance1.jpg'
		},
		grid2 : {
			a : 'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
			b: 'http://www.moneyabcs.org/images/finance1.jpg',
			c : 'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
		},
		grid3 : {
			a : 'http://www.moneyabcs.org/images/finance1.jpg',
			b: 'http://www.moneyabcs.org/images/rflexion%20finance.jpg',
			c : 'http://www.moneyabcs.org/images/finance1.jpg'
		}		
	};
	try{
		$scope.items = images;
		var count = 0,
		left = 0;
		
		$scope.leftShow = false;
		$scope.rightShow = true;
		$scope.slideLeft = function(){
			count--;
			if(count == 0){
				$scope.leftShow = false;
				left -= 100;
				$scope.slider = {
					"margin-left" : left+"%"
				};
			} else {
				$scope.leftShow = true;
				$scope.rightShow = true;
				left -= 100;
				$scope.slider = {
					"margin-left" : "-"+left+"%"
				};
			}
		}
		$scope.slideRight = function(){
			count++;
			if(count == 2){
				$scope.rightShow = false;
				left = left + 100;
				$scope.slider = {
					"margin-left" : "-"+left+"%"
				};
			} else {
				$scope.leftShow = true;
				$scope.rightShow = true;
				left = left + 100;
				$scope.slider = {
					"margin-left" : "-"+left+"%"
				};
			}
		}
		
	} catch(e){console.log(e)}
});