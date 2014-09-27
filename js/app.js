angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate','angularFileUpload','ngSanitize'])
  .config(function($routeProvider, $locationProvider) {

  //$locationProvider.html5Mode(true);
	$routeProvider
      .when('/', {
        templateUrl: '/partials/frontend/home.html',
        controller: 'AppCtrl'
      }).when('/about', {
        templateUrl: '/partials/frontend/about.html'
      }).when('/team', {
        templateUrl: '/partials/frontend/team.html'
      }).when('/work', {
        templateUrl: '/partials/frontend/work.html'
      }).when('/services', {
        templateUrl: '/partials/frontend/services.html'
      }).when('/features', {
        templateUrl: '/partials/frontend/features.html'
      }).when('/contact', {
        templateUrl: '/partials/frontend/contact.html'
      }).when('/admin', {
        templateUrl: '/partials/login.html'
      }).when('/dashboard', {
        templateUrl: '/partials/dashboard.html'
      }).when('/new-article', {
        templateUrl: '/partials/new-article.html'
      }).when('/new-article/:id', {
        templateUrl: '/partials/edit-article.html'
      })


      .when('/engineering', {
        templateUrl: '/partials/frontend/services/engineering.html'
      }).when('/humanities', {
        templateUrl: '/partials/frontend/services/humanities.html'
      }).when('/general-science', {
        templateUrl: '/partials/frontend/services/general-science.html'
      }).when('/commerce', {
        templateUrl: '/partials/frontend/services/commerce.html'
      }).when('/medical', {
        templateUrl: '/partials/frontend/services/medical.html'
      }).when('/law', {
        templateUrl: '/partials/frontend/services/law.html'
      }).when('/performing-arts', {
        templateUrl: '/partials/frontend/services/performing-arts.html'
      }).when('/fine-arts', {
        templateUrl: '/partials/frontend/services/fine-arts.html'
      })
  }).run(function($rootScope, $location, loginService){
  var routespermission=['/dashboard', '/new-article'];  //route that require login
  $rootScope.$on('$routeChangeStart', function(){
    if( routespermission.indexOf($location.path()) !=-1)
    {
      var connected=loginService.islogged();
      connected.then(function(msg){
        if(!msg.data) $location.path('/');
      });
    }
  });
});

  angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/404_error');
      }
    });
  });