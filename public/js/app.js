/*jslint browser:true, plusplus: true */
/*global $, jQuery, main, console*/
//namespace for home screen
var app = angular.module('moneyabcs', ["ngRoute"]);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl : '../index.html',
            controller  : 'moneycontroller'
        })

        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : '../contactus.html',
            controller  : 'contactController'
        })

    	.when('/dashboard', {
        	templateUrl : '../dashboard.html',
        	controller  : 'dashboardController'
    });
});

// create the controller and inject Angular's $scope
app.controller('mainController', function($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

app.controller('aboutController', function($scope) {
    $scope.message = 'Look! I am an about page.';
});

app.controller('contactController', function($scope) {
	alert("M contact");
    //$scope.message = 'Contact us! JK. This is just a demo.';
});





var searchTopics = [ {"search_topics_1":"Finance%20Planning"}, {"search_topics_2":"Career%20Planning"}, {"search_topics_3":"Financial%20Planners"}, {"search_topics_4":"Financial%20Goals"}, {"search_topics_5":"Time%20Value%20of%20Money"}, {"search_topics_6":"Money%20Management"}, {"search_topics_7":"Financial%20Record%20System"}, {"search_topics_8":"Personal%20Financial%20Statements"}, {"search_topics_9":"Budgeting"}, {"search_topics_10":"Savings"}, {"search_topics_11":"Payment%20Methods"}, {"search_topics_12":"Bank%20Currency"}, {"search_topics_13":"Insurance%20Companies"}, {"search_topics_14":"Private%20Insurance%20Companies"}, {"search_topics_15":"Financial%20Advisors"},{"search_topics_16":"Career%20Choice"}, {"search_topics_17":"Employment%20Search"}, {"search_topics_18":"Employee%20Benefits"}, {"search_topics_19":"Career%20Development"}, {"search_topics_20":"Taxes"}, {"search_topics_21":"Tax%20Refunds"}, {"search_topics_22":"Tax%20Advance%20Loans"}, {"search_topics_23":"Federal%20Income%20Taxes"}, {"search_topics_24":"Tax%20Deductions"}, {"search_topics_25":"Tax%20Credits"}, {"search_topics_26":"Tax%20Planning"}, {"search_topics_27":"Tax%20Preparers"}, {"search_topics_28":"Tax%20Advisors"}, {"search_topics_29":"Major%20Purchases"}, {"search_topics_30":"Bankers"}, {"search_topics_31":"Consumer%20Credit"}, {"search_topics_32":"Types%20of%20Credit"}, {"search_topics_33":"Revolving%20Loans"}, {"search_topics_34":"Open%20Ended%20Loans"}, {"search_topics_35":"Close%20Ended%20Loans"}, {"search_topics_36":"Revolving%20Loans"}, {"search_topics_37":"Credit%20Capacity"}, {"search_topics_38":"Debt%20History"}, {"search_topics_39":"Applying%20for%20Credit"}, {"search_topics_40":"Interest%20Rates"}, {"search_topics_41":"Credit%20History"}, {"search_topics_42":"Credit%20Scores"}, {"search_topics_43":"Credit%20Counseling"}, {"search_topics_44":"Consumer%20Rights"}, {"search_topics_45":"Predatory%20Lending%20Practices%20"}, {"search_topics_46":"Bank%20Corruption"}, {"search_topics_47":"Title%20Loans"}, {"search_topics_48":"Debt%20Collection"}, {"search_topics_49":"Bankruptcy"}, {"search_topics_50":"Chapter%2011%20Bankruptcy"}, {"search_topics_51":"Pawn%20Shops"}, {"search_topics_52":"Tax%20Advance%20Loans"}, {"search_topics_53":"Payday%20Loans"}, {"search_topics_54":"Rent%20to%20Own"}, {"search_topics_55":"Tax%20Refund%20Anticipation%20Loans"}, {"search_topics_56":"Real%20Estate%20Brokers"}, {"search_topics_57":"Housing"}, {"search_topics_58":"Home%20Buying"}, {"search_topics_59":"Property%20Providers"}, {"search_topics_60":"Brokers%20Price%20Opinio%20BPO"}, {"search_topics_61":"Mortgages"}, {"search_topics_62":"Renting"}, {"search_topics_63":"Homeowners%20Insurance"}, {"search_topics_64":"Property%20Insurance"}, {"search_topics_65":"Mortgage%20Insurance"}, {"search_topics_66":"Renters%20Insurance"}, {"search_topics_67":"Car%20Shopping"}, {"search_topics_68":"Auto%20Loans"}, {"search_topics_69":"Home%20Selling"}, {"search_topics_70":"Liability%20Insurance"}, {"search_topics_71":"Auto%20Insurance"}, {"search_topics_72":"Health%20Plans"}, {"search_topics_73":"Home%20Health%20Care"}, {"search_topics_74":"Health%20Maintenance%20Organizations%20HMOs"}, {"search_topics_75":"Preferred%20Provider%20Organization%20PPOs"}, {"search_topics_76":"Medical%20Service%20Plans"}, {"search_topics_77":"Health%20Insurance"}, {"search_topics_78":"Medical%20Insurance"}, {"search_topics_79":"Medicare"}, {"search_topics_80":"Medicaid"}, {"search_topics_81":"Bodily%20Injury%20Insurance"}, {"search_topics_82":"Short%20Term%20Disability%20Insurance%20"}, {"search_topics_83":"Long%20Term%20Disability%20Insurance%20"}, {"search_topics_84":"Whole%20Life%20Insurance"}, {"search_topics_85":"Turned%20Life%20Insurance"}, {"search_topics_86":"Short%20Term%20Insurance"}, {"search_topics_87":"Term%20Life%20Insurance"}, {"search_topics_88":"Annuities"}, {"search_topics_89":"Insurance%20Beneficiaries%20"}, {"search_topics_90":"Child%20Custody"}, {"search_topics_91":"Custody"}, {"search_topics_92":"Investments"}, {"search_topics_93":"Investment%20Goals"}, {"search_topics_94":"Investment%20Strategies"}, {"search_topics_95":"Investment%20Income"}, {"search_topics_96":"Investment%20Growth"}, {"search_topics_97":"Investment%20Equity"}, {"search_topics_98":"Investment%20Risks"}, {"search_topics_99":"Investment%20Alternatives"}, {"search_topics_100":"Asset%20Allocation"}, {"search_topics_101":"Diversification"}, {"search_topics_102":"Modern%20Markets"}, {"search_topics_103":"Capital%20Markets"}, {"search_topics_104":"Stocks"}, {"search_topics_105":"Mutual%20Funds"}, {"search_topics_106":"Real%20Estate"}, {"search_topics_107":"Real%20Estate%20Investment%20Trusts%20REITs"}, {"search_topics_108":"Common%20Stock"}, {"search_topics_109":"Preferred%20Stock"}, {"search_topics_110":"Corporate%20Bonds"}, {"search_topics_111":"Government%20Bonds"}, {"search_topics_112":"Municipal%20Bonds"}, {"search_topics_113":"Convertible%20Bonds"}, {"search_topics_114":"Exchange%20Traded%20Funds"}, {"search_topics_115":"Index%20Funds"}, {"search_topics_116":"Precious%20Metals"}, {"search_topics_117":"Collectibles"}, {"search_topics_118":"Gold"}, {"search_topics_119":"Stock%20Brokers"}, {"search_topics_120":"Investment%20Bankers"}, {"search_topics_121":"Financial%20Analysts"}, {"search_topics_122":"Retirement"}, {"search_topics_123":"Retirement%20Planning"}, {"search_topics_124":"Retirement%20Housing"}, {"search_topics_125":"Retirement%20Income"}, {"search_topics_126":"Retirement%20Living%20Expenses"}, {"search_topics_127":"Social%20Security"}, {"search_topics_128":"Pensions"}, {"search_topics_129":"Public%20Pensions"}, {"search_topics_130":"Employer%20Pensions"}, {"search_topics_131":"Personal%20Retirement%20Plans"}, {"search_topics_132":"Individual%20Retirement%20Accounts"}, {"search_topics_133":"Roth%20Individual%20Retirement%20Accounts"}, {"search_topics_134":"401%20A"}, {"search_topics_135":"401%20B"}, {"search_topics_136":"401%20K"}, {"search_topics_137":"403%20B"}, {"search_topics_138":"457"}, {"search_topics_139":"Thrift%20Savings%20Plan%20TSP"}, {"search_topics_140":"Retirement%20Employment"}, {"search_topics_141":"Wills"}, {"search_topics_142":"Power%20of%20Attorney"}, {"search_topics_143":"Letter%20of%20Lest%20Instruction"}, {"search_topics_144":"Trusts"}, {"search_topics_145":"Trustees"}, {"search_topics_146":"Estate"}, {"search_topics_147":"Probate"}, {"search_topics_148":"Lawyers"},{"search_topics_149":"debit%20collection"},{"search_topics_150" : "home%20owners%20insurance"},{"search_topics_151" : "estate%20planning"},{"search_topics_152" : "credit%20card"},{"search_topics_153" : "Personal%20Financial%20Planning"},{"search_topics_154" : "Credit%20and%20Loans"},{"search_topics_155" : "Your%20Health%20and%20Life"},{"search_topics_156" : "Investing"},{"search_topics_157" : "Planning%20for%20Retirement%20"},{"search_topics_158":"Wills"}, {"search_topics_159":"Power%20of%20Attorney"}, {"search_topics_160":"Letter%20of%20Lest%20Instruction"}];
app.directive('imageonload', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        element.bind('error', function(){
			var index;
			for(var loopVar = 0;loopVar < 160;loopVar++){
				index = loopVar + 1;
				if(angular.element(this) && (searchTopics[loopVar]["search_topics_" + index] == angular.element(this).attr("topic").replace(/ /g,"%20"))){
					angular.element(this).attr("src", "./images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*3) + ".png");
				}
			}
			angular.element(this).attr("set","yes");
		});
		element.on('load', function (event) {
			var index;
			if(angular.element(this)[0].width <= 80 && angular.element(this).attr("set") == "no"){
				for(var loopVar = 0;loopVar < 160;loopVar++){
					index = loopVar + 1;
					if(searchTopics[loopVar]["search_topics_" + index] == angular.element(this).attr("topic").replace(/ /g,"%20")){
						angular.element(this).attr("src", "./images/defaultImg/search_" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					}
				}
				angular.element(this).attr("set","yes");
			} else if(angular.element(this).attr("set") == "no"){
				exp = angular.element(this).attr("src");
				switch(exp){
					case "http://assets.nerdwallet.com/img/nw-logos/NW-default_og-image.jpg" :
					angular.element(this).attr("src", "./images/defaultImg/search_152/" + Math.ceil(Math.random()*5) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "//g.foolcdn.com/assets/images/fool/tmf-logo.png" :
					angular.element(this).attr("src", "./images/defaultImg/search_134" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://assets.bwbx.io/markets/public/images/marketdata-quoteshare-image-31c2f97627.png" :
					angular.element(this).attr("src", "./images/defaultImg/search_118" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://www.consumer.ftc.gov/sites/default/files/styles/related_multimedia_thumbs/public/videos/thumbnails/video-0078_payday-lending_thumb.png?itok=aMwUgBl3" :
					angular.element(this).attr("src", "./images/defaultImg/search_53" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break
					case "http://i.cdn.turner.com/money/.element/img/1.0/misc/1.gif" :
					angular.element(this).attr("src", "./images/defaultImg/search_134" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
					case "https://static01.nyt.com/images/icons/t_logo_291_black.png":
					angular.element(this).attr("src", "./images/defaultImg/search_84" + index + "/" + Math.ceil(Math.random()*3) + ".png");
					angular.element(this).attr("set","yes");
					break;
				}
			}
        });
    }
  };
});


app.controller("moneycontroller",function($scope,$http,$sce,$window){
	//alert("Inside Controller");
	moneyController($scope,$http,$sce,$window);
});


app.controller("MoneyController",function($http,$scope){
	$http.get('/api/username')
        .success(function(data) {
            $scope.user = data;
            console.log(data);
        });
        
});

app.controller('dashboardController', function($scope,$compile) {
    dashboardController($scope,$compile);
    //$scope.message = 'Contact us! JK. This is just a demo.';
});

	


