var myapp = angular.module('myapp',['ngRoute']);

myapp.component('main', {
	templateUrl: "/static/main/index.html",
});

myapp.component('allbuckets', {
	templateUrl: "/static/main/buckets.html",
});

myapp.component('account', {
	templateUrl: "/static/main/account.html",
});

myapp.component('bucket', {
	templateUrl: "/static/main/bucket.html",
});

myapp.component('link', {
	templateUrl: "/static/main/addlink.html",
});

myapp.config(function($routeProvider) {
	$routeProvider.
		when('/', {
			template: '<main></main>'
		}).
		when('/mybuckets', {
			template: '<all-buckets></all-buckets>'
		}).
		when('/account', {
			template: '<account></account>'
		}).
		when('/bucket', {
			template: '<bucket></bucket>'
		}).
		when('/add', {
			template: '<link></link>'
		}).
		otherwise('/');
});