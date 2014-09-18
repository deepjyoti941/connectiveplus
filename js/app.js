angular.module('app', ['ngResource', 'ngRoute',   'ngProgress'])
  .config(function($routeProvider, $locationProvider) {

  	// $locationProvider.html5Mode(true);
	$routeProvider
      .when('/', {
        templateUrl: '/partials/login.html',
        controller: 'AppCtrl'
      }).when('/dashboard', {
        templateUrl: '/partials/dashboard.html',
        controller: 'dashboardCtrl'
      })
  });
