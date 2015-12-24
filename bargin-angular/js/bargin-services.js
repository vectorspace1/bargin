/**
* 	
* contains the requisite functions for retrieving data from the server. 
*/	
	
	bargin.service('barginService', function($http, $rootScope, $location, $window) {
		
		var accessToken;
		var isUserLoggedIn = false;
		var expiresIn;		
		var userObject;
		
		/* The login function authenticates a user given a username and password and after a token has been retrieved. */
		var login = function(userName,password,accessToken) { 
			$http({
				url: BASE_URL_LOGIN,
				method: "POST",
				data: JSON.stringify({ username:userName, password:password }),
				headers: {'Authorization':'Bearer ' + accessToken}
				}).success(function (data, status, headers, config) {
					patient_id = data.user.id;
					organization_id = data.user.org;
					$rootScope.$broadcast("Successful login");
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Failed login");
				});
			};
		
		/* The logout function logs a user out. */		
		this.logout = function() { 
			$http({
				url: BASE_URL_LOGOUT,
				method: "DELETE",
				headers: {'Authorization':'Bearer ' + accessToken}
				}).success(function (data, status, headers, config) {
					$rootScope.$broadcast("Successful logout");
				}).error(function (data, status, headers, config) {
					console.log(data);
				});
			};
			
		
		/* 
		This is the first function called to retrieve an application token.  Once a token is retrieved then it
		   makes a call to authenticate the user via the login function.										
		   */			
		this.token = function(username, password) { 
			var authenticateString = 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
			$http({
				url: BASE_URL_GET_TOKEN,
				method: "POST",
				headers: {'Authorization':authenticateString }
			}).success(function (data, status, headers, config) {
					accessToken = data.access_token;
					login(username,password,accessToken);
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Failed login");
				});			
			};

		/* 
		BARGIN
		This is the first function called to retrieve an application token and login user.										
		*/			
		this.userLoginToken = function(userName, password) { 
			//var authenticateString = 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);
			$http({
				url: BASE_URL + BASE_URL_LOGIN,
				method: "POST",
				headers: {'content-type':'application/json' },
				data: JSON.stringify({"grant_type":"password", "username":userName, "password":password }),

			}).success(function (data, status, headers, config) {
					$window.sessionStorage.token = data.access_token;					
					$window.sessionStorage.uuid = data.user.uuid;	
					$location.path('/main');
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Failed login");
				});			
			};

			/*
				get user profile information
			*/
			this.getUserProfile = function() { 
			//var authenticateString = 'Basic ' + Base64.encode(CLIENT_ID + ':' + CLIENT_SECRET);

			$http({
				url: BASE_URL + '/users/' + $window.sessionStorage.uuid,
				params:{'access_token': $window.sessionStorage.token},
				method: "GET"				
			}).success(function (data, status, headers, config) {
					userObject = data.entities[0];	
					console.log(userObject);
					$rootScope.$broadcast("Got Users Profile");							
					//$location.path('/main');
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Get Users Profile Failed");
				});			
			};

			/*
				save user profile information
			*/
			this.saveUserProfile = function(fullname, email, cellphone) { 
				payload = '{"fullname": "' + fullname + '", "email":"' + email + '", "cellphone": "' + cellphone + '"}';

				$http({
					url: BASE_URL + '/users/' + $window.sessionStorage.uuid,
					params:{'access_token': $window.sessionStorage.token},
					method: "PUT",
					headers: {'content-type':'application/json' },
					data: payload		

				}).success(function (data, status, headers, config) {
						console.log(data);
						$rootScope.$broadcast("Profile Updated Successfully");							
						//$location.path('/main');
					}).error(function (data, status, headers, config) {
						console.log(data);
						$rootScope.$broadcast("Profile Update Failed");
					});			
			};

			/*
				change users password
			*/
			this.changePassword = function(oldPassword, newPassword) { 
				payload = '{"oldpassword":"' + oldPassword + '", "newpassword":"' + newPassword + '"}';

				//reset the users password
				$http({
					url: BASE_URL + '/users/' + $window.sessionStorage.uuid + '/password',
					params:{'access_token': $window.sessionStorage.token},
					method: "PUT",
					headers: {'content-type':'application/json' },
					data: payload

				}).success(function (data, status, headers, config) {
						console.log(data);						
						console.log(userObject);
						$rootScope.$broadcast("Change Password Successful");
						payload = null;					
					}).error(function (data, status, headers, config) {
						paylod = null;
						console.log(data);
						if(data.error === "expired_token") {
							$rootScope.$broadcast("Session Timeout");	
						} else {
							$rootScope.$broadcast("Change Password Failed");
						}
					});			
			};


			/* 
			Add item makes two http requests: 
			1) add the item to the item collection
			1b) associate the item to the user
			2) creates the activity in the bargin group
			*/
			this.addItem = function(name, price, descr){
				itemUuid = this.addItemToCollection(name, price, descr);
				this.createRelationBetweenUserAndItem(itemUuid);
				this.createRelationBetweenItemAndUser(itemUuid);
				console.log("item uuid is " + itemUuid);
				this.createRelationBetweenUserAndItem(itemUuid);	
			}


			/*
				Add the item.
			*/
			this.addItemToCollection = function(name, price, descr) { 
				payload = '{"name2":"' + name + '", "price":' + price + ', "descr":"' + descr + '"}';
				//add the item to the item collection
				var itemUuid;

				$http({
					url: BASE_URL + '/items',
					params:{'access_token': $window.sessionStorage.token},
					method: "POST",
					headers: {'content-type':'application/json'},
					data: payload				
				}).success(function (data, status, headers, config) {
						itemObject = data.entities[0];	
						itemUuid = itemObject.uuid;
						console.log(itemObject.uuid);
						console.log(itemObject);
						$rootScope.$broadcast("Add Item Successful");							
						//$location.path('/main');
					}).error(function (data, status, headers, config) {
						console.log(data);
						$rootScope.$broadcast("Add Item Failed");
					});	

				return itemUuid;
			};

			/*
			${user}
			curl -X POST https://api.usergrid.com/<org>/<app>/<connecting_collection>/<connecting_entity>/<relationship>/<connected_entity>
			*/
			/*
				Create the relationship between the user and items.
			*/
			this.createRelationBetweenUserAndItem = function(itemUuid) { 
				payload = '';			
				$http({
					url: BASE_URL + '/users/${user}/lists/items/' + itemUuid,
					params:{'access_token': $window.sessionStorage.token},
					method: "POST",
					headers: {'content-type':'application/json'},
					data: payload				
				}).success(function (data, status, headers, config) {
						resultObject = data.entities[0];	
						console.log(resultObject);
						$rootScope.$broadcast("user lists item");							
						//$location.path('/main');
					}).error(function (data, status, headers, config) {
						console.log(data);
						$rootScope.$broadcast("user list item failed");
					});	
			};


			/*
				Create the relationship between the item and user.
			*/
			this.createRelationBetweenItemAndUser = function(itemUuid) { 
				payload = '';				
				$http({
					url: BASE_URL + '/items/' + itemUuid + 'listedby/users/${user}' ,
					params:{'access_token': $window.sessionStorage.token},
					method: "POST",
					headers: {'content-type':'application/json'},
					data: payload				
				}).success(function (data, status, headers, config) {
						resultObject = data.entities[0];	
						console.log(resultObject);
						$rootScope.$broadcast("item listed by user.");							
						//$location.path('/main');
					}).error(function (data, status, headers, config) {
						console.log(data);
						$rootScope.$broadcast("item listed by user failed.");
					});	
			};


			/*
				Publish the activity to the main activity stream
			*/
			this.publishActivity = function() { 
			//add the item to the item collection
			$http({
				url: BASE_URL + '/users/' + $window.sessionStorage.uuid,
				params:{'access_token': $window.sessionStorage.token},
				method: "GET"				
			}).success(function (data, status, headers, config) {
					userObject = data.entities[0];	
					console.log(userObject);
					$rootScope.$broadcast("Got Users Profile");							
					//$location.path('/main');
				}).error(function (data, status, headers, config) {
					console.log(data);
					$rootScope.$broadcast("Get Users Profile Failed");
				});				

			};



		/* Below are helper functions for the controllers to retrieve necessary data. */
		
		this.getAccessToken = function () {
			return accessToken; 
		};
		this.getExpiresIn = function () {
			return expiresIn;
		}
		this.isUserLoggedIn = function () {
			return isUserLoggedIn;
		}
		this.getUserInfo = function () {
			return userObject;
		}				
	});