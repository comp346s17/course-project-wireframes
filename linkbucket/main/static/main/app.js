var myapp = angular.module('myapp',['ngRoute','ngResource']);

myapp.config(function($routeProvider,$httpProvider,$resourceProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
  	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
  	$resourceProvider.defaults.stripTrailingSlashes = false;

	$routeProvider.
		when('/', {
			template: '<main></main>'
		}).
		when('/addbucket', {
			template: '<add-bucket></add-bucket>'
		}).
		when('/account', {
			template: '<account></account>'
		}).
		when('/bucket', {
			template: '<bucket></bucket>'
		}).
		when('/add', {
			template: '<add-link></add-link>'
		}).
		otherwise('/');
});

myapp.component('main', {
	templateUrl: "/static/main/index.html",
	controller: function mainController($scope,$rootScope,$routeParams,bucketsAPI){
		$scope.buckets=[];
		var userID = $routeParams.userID;

		$scope.noBuckets = function(){
			return $scope.buckets.length === 0;
		}

		$rootScope.$on('refetch',fetch);

		fetch();

		function fetch(){
			bucketsAPI.get({userID: userID}, function(resp) {
				$scope.buckets = resp;
			});
		}
	},
});


myapp.component('account', {
	templateUrl: "/static/main/account.html",
	controller: function accountController($scope,$rootScope,$routeParams,userAPI) {
		$scope.user;
		var userID = $routeParams.userID;

		function getUser(){
			userAPI.get({userID: userID}, function(resp){
				$scope.user = resp;
			});
		}

		getUser();
	
		$scope.updateUser = function() {
			var updatedUser = {
				username: $scope.username,
				email: $scope.email,
			};

			userAPI.save(updatedUser, function(){
				$rootScope.broadcast('refetch');	
			});
		$scope.username= "";
		$scope.email = "";
		}
	},
});

myapp.component('bucket', {
	templateUrl: "/static/main/bucket.html",
	controller: function bucketController($scope,$rootScope,$routeParams,bucketAPI){
		var bucketID = $routeParams.bucketID;
		$scope.linkslist = [];
		bucketAPI.get({id: bucketID}, function(resp){
			$scope.linkslist = resp;
		});

	},
});

myapp.component('addLink', {
	templateUrl: "/static/main/addlink.html",
	controller: function accountController($scope,$rootScope,$routeParams,userAPI, bucketAPI) {
		$scope.user;
		var userID = $routeParams.userID;
		function getUser(){
			userAPI.get({userID: userID}, function(resp){
				$scope.user = resp;
			});
		}

		getUser();
	
		$scope.addLink = function() {
			var link = {
				user: $scope.user,
				title: $scope.title,
				link: $scope.link,
				bucket: $scope.bucket,
			};

			bucketAPI.save(link, function(){
				$rootScope.broadcast('refetch');	
			});

			$scope.user= "";
			$scope.title= "";
			$scope.link= "";
			$scope.bucket= "";

		}
	},
});

myapp.component('addBucket', {
	templateUrl: "/static/main/addbucket.html",
	controller: function accountController($scope,$rootScope,$routeParams,userAPI, bucketsAPI) {
		$scope.user;
		var userID = $routeParams.userID;
		function getUser(){
			userAPI.get({userID: userID}, function(resp){
				$scope.user = resp;
			});
		}

		getUser();
	
		$scope.addBucket = function() {
			var bucket = {
				creator: $scope.user,
				title: $scope.title,
				description: $scope.description,
			};

			bucketsAPI.save(bucket, function(){
				$rootScope.broadcast('refetch');	
			});

			$scope.user= "";
			$scope.title= "";
			$scope.link= "";
			$scope.bucket= "";

		}
	},
});


myapp.service('userAPI', function($resource) {
  return $resource('/api/user/:id', {});
});

myapp.service('bucketAPI', function($resource) {
  return $resource('/api/bucket/:id', {});
});

myapp.service('bucketsAPI', function($resource) {
  return $resource('/api/buckets/:id', {});
});


