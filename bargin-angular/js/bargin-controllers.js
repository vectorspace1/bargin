/**
* 	
* The controllers provide the necessary linkage between the barginService and the front end views.
*/	
	
	/* The login controller retrieves a token via the token function.  The token function calls the login function which then
	   broadcasts a message as to whether or not a user was successful in logging in or not.  
	*/													
	bargin.controller('LoginController', function ($scope, $location, barginService, $rootScope) {
  
		$scope.signInShow = true;
		$scope.failedLoginShow = false;
		
		$scope.loginUser = function () {
			barginService.userLoginToken($scope.userName, $scope.password);
			/*$rootScope.$watch(barginService.isUserLoggedIn(), function(newValue, oldValue) {
				console.log("watch was triggered...");
				if(newValue === true){
					$location.path('/main');
					console.log($location.path);
				}	
				//$window.location('#/views/main.html');
				//$window.location.href("/views/main.html");
			});*/
			
		};
		$scope.$on('Successful', function() {
			$scope.userName = "";
			$scope.password = "";
			$scope.signInShow = false;
		});
		$scope.$on('Successful logout', function() {
			$scope.signInShow = true;
			$scope.failedLoginShow = false;
		});
		$scope.$on('Failed login', function() {
			$scope.failedLoginShow = true;
		});
	});

	bargin.controller('MainController', function ($scope, barginService) {
  
		$scope.signInShow = true;
		$scope.failedLoginShow = false;
		
		$scope.loginUser = function () {
			barginService.userLoginToken($scope.userName, $scope.password);
		};
		$scope.$on('Successful', function() {
			$scope.userName = "";
			$scope.password = "";
			$scope.signInShow = false;
		});
		$scope.$on('Successful logout', function() {
			$scope.signInShow = true;
			$scope.failedLoginShow = false;
		});
		$scope.$on('Failed login', function() {
			$scope.failedLoginShow = true;
		});
	});

	/* The ProfileController retrieves a token via the token function.  The token function calls the login function which then
	   broadcasts a message as to whether or not a user was successful in logging in or not.  
	*/													
	bargin.controller('ProfileController', function ($scope, $location, barginService, $rootScope) {
  		$scope.profileUpdatedSuccessfully = false;
  		$scope.profileUpdateFailed = false;

		barginService.getUserProfile();		
		console.log("In Profile Controller");

		$scope.saveUserProfile = function() {	
			if(validateProfile()) {
				barginService.saveUserProfile($scope.fullName, $scope.email, $scope.cellPhone);
			}
		};

		function validateProfile () {
			return true;
		}

		$scope.$on('Got Users Profile', function() {
			userObject = barginService.getUserInfo();
			console.log('Got user profile');
			$scope.userProfileImage = userObject.picture;
			$scope.username = userObject.username;
			$scope.fullName = userObject.name;
			$scope.email = userObject.email;
			$scope.cellPhone = userObject.cellphone;
			console.log(userObject.picture);

		});
		$scope.$on('Profile Updated Successfully', function() {
			$scope.profileUpdatedSuccessfully = true;
		
		});
		$scope.$on('Profile Update Failed', function() {
			$scope.profileUpdateFailed = true;
		});


	});


	/* The ItemController handles request from the Items pages.  
	*/													
	bargin.controller('ItemController', function ($scope, $location, barginService, $rootScope) {
  
		$scope.signInShow = true;
		$scope.failedLoginShow = false;
		
		barginService.getUserProfile();		
		$scope.$on('Got Users Profile', function() {
			userObject = barginService.getUserInfo();
			console.log('Got user profile');
			$scope.userProfileImage = userObject.picture;
			console.log(userObject.picture);
			$scope.username = userObject.username;
			$scope.fullName = userObject.name;
			$scope.email = userObject.email;
		});
		$scope.$on('Successful logout', function() {
			$scope.signInShow = true;
			$scope.failedLoginShow = false;
		});
		$scope.$on('Failed login', function() {
			$scope.failedLoginShow = true;
		});
	});


	/* 
		The PasswordController updates the password. 
	*/													
	bargin.controller('PasswordController', function ($scope, $location, barginService, $rootScope) {
		$scope.changePasswordFailed = false;
		$scope.sessionTimeout = false;
		$scope.changePasswordSuccessful = false;

		 $scope.changePassword = function() {

    		if(checkPasswords($scope.password1, $scope.password2)){
    			barginService.changePassword($scope.oldPassword, $scope.password1);
    			console.log("changePassword() was called!");
    		} else {
    			$scope.passwordsDoNotMatch = true;
    		}    		
 		 };

 		 function checkPasswords(pw1, pw2){
 		 	if(pw1 !== pw2){
 		 		return false;
 		 	} else {
 		 		return true;
 		 	}
 		 }

		$scope.$on('Change Password Successful', function() {
			userObject = barginService.getUserInfo();
			console.log('Change Password Successful');
			$scope.changePasswordSuccessful = true;			
		});
		$scope.$on('Change Password Failed', function() {
			$scope.changePasswordFailed = true;			
		});
		$scope.$on('Session Timeout', function() {
			$scope.sessionTimeout = true;
		});		
	});