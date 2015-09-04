/**
* 	
* This is the main angular application and the dependency on chart.js is declared.
*/	
	var bargin = angular.module('bargin', ['chart.js', 'ngRoute']);

	 // configure our routes
    bargin.config(function($routeProvider, $locationProvider)  {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/partials/signin.html',
                controller  : 'LoginController'
            })

            // route for the about page
            .when('/main', {
                templateUrl : 'views/partials/main.html',
                controller  : 'MainController'
            })
            // route for the about page
            .when('/signin', {
                templateUrl : 'views/partials/signin.html',
                controller  : 'LoginController'
            })
            .when('/profile', {
                templateUrl : 'views/partials/userprofile.html',
                controller  : 'ProfileController'
            })
            .when('/additem', {
                templateUrl : 'views/partials/additem.html',
                controller  : 'ItemController'  
            })
            /*
            // route for the about page
            .when('/main', {
                templateUrl : 'views/partials/signin.html',
                controller  : 'LoginControl'
            })
    		*/
            .otherwise({
        		redirectTo: '/signin'
      		});
    		

            /*
            // route for the contact page
            .when('/contact', {
                templateUrl : 'views/contact.html'
                //controller  : 'contactController'
            });
			*/

		// use the HTML5 History API
        //$locationProvider.html5Mode(true);    
    });
