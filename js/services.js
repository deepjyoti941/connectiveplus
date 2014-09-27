angular.module('app')
	.factory("loginService", ["$http", "$location", "sessionService",function ($http, $location, sessionService) {
	  return{
	    login:function(data,scope){
	      var $promise=$http.post('admin/user.php',data); //send data to user.php
	      $promise.then(function(msg){
	        var uid=msg.data;
	        if(uid){
	          //scope.msgtxt='Correct information';
	          sessionService.set('uid',uid);
	          $location.path('/dashboard');
	        }        
	        
	        else  {
	          scope.msgtxt='incorrect information';
	          //$location.path('/');
	        }          
	      });
	    },
	    logout:function(){
	      sessionService.destroy('uid');
	      $location.path('/');
	    },
	    islogged:function(){
	      var $checkSessionServer=$http.post('admin/check_session.php');
	      return $checkSessionServer;
	      /*
	      if(sessionService.get('user')) return true;
	      else return false;
	      */
	    }
	  }
	}]).factory("sessionService", ["$http",function ($http) {
	  return{
	    set:function(key,value){
	      return sessionStorage.setItem(key,value);
	    },
	    get:function(key){
	      return sessionStorage.getItem(key);
	    },
	    destroy:function(key){
	      $http.post('admin/destroy_session.php');
	      return sessionStorage.removeItem(key);
	    }
	  };
	}]).factory("articleService", ["$http",function ($http) {
	  return{
	    submitArticle:function(data,scope){
	      var $promise=$http.post('admin/article_controller.php',data); //send data to user.php
	      $promise.then(function(msg){
	        var message = msg.data;
	        if(message){

	        }        
	        
	        else  {

	        }          
	      });
	    },
	  };
	}])