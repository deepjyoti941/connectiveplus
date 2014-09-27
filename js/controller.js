angular.module('app')
	.controller('AppCtrl',["$scope","$route","$sce",function ($scope, $route,$sce) {
    $scope.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    }
    $(".toggleMenu").click(function(e) {
      e.preventDefault();
      $(this).toggleClass("active");
      $(".nav").toggle();
    });
  adjustMenu();
    $scope.isActive = function(path) {
      if ($route.current && $route.current.regexp) {
        return $route.current && $route.current.regexp.test(path);
      }
      return false;
    };

  // All effects list
    $scope.effects = [
        // {name: 'Slide', className: 'slide'}
        // {name: 'Slidedown', className: 'slidedown'}
        //{name: 'Slideup', className: 'slideup'}
        //{name: 'Pop in/out', className: 'pop'}
        {name: 'Fade in/out', className: 'fade'}
        //{name: 'Flip', className: 'flip'}
        //{name: 'Rotate', className: 'rotate'}
        // {name: 'Slide+popin', className: 'slide-pop'}
    ];

    $scope.effect = $scope.effects[0].className;

    $("#slider4").responsiveSlides({
      auto: true,
      pager: true,
      nav: true,
      speed: 500,
      namespace: "callbacks",
      before: function () {
        $('.events').append("<li>before event fired.</li>");
      },
      after: function () {
        $('.events').append("<li>after event fired.</li>");
      }
    });
  
}]).controller("loginCtrl", ["$scope","loginService", function ($scope,loginService) { 
    $scope.msgtxt='';
    $scope.login=function(data){
      data.method = "login";
    loginService.login(data,$scope); //call login service
  };
}]).controller("dashboardCtrl", ["$scope","$http", function ($scope,$http) { 

      $http.get('admin/getArticleList.php').success(function(data){
        $scope.list = data;
        $scope.currentPage = 1; //current page
        $scope.entryLimit = 20; //max no of items to display in a page
        $scope.filteredItems = $scope.list.length; //Initially for no filter  
        $scope.totalItems = $scope.list.length;
    });
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.filter = function() {
        $timeout(function() { 
            $scope.filteredItems = $scope.filtered.length;
        }, 10);
    };
    $scope.sort_by = function(predicate) {
        $scope.predicate = predicate;
        $scope.reverse = !$scope.reverse;
    };


   $scope.removeItem = function(idx) {
    console.log();
      var txt;
      var r = confirm("Are you sure You want to delete!");
      if (r == true) {
        var post_data = {};
        post_data.method = 'delete_article_by_id';
        post_data.article_id = $scope.list[idx]['id'];
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            if (data.status == true) {
                    $scope.list.splice(idx, 1);
                    toastr.success("Article Deleted successfully");
                    toastr.options = {
                      "closeButton": false,
                      "debug": false,
                      "positionClass": "toast-top-right",
                      "onclick": null,
                      "showDuration": "800",
                      "hideDuration": "1000",
                      "timeOut": "5000",
                      "extendedTimeOut": "1000",
                      "showEasing": "swing",
                      "hideEasing": "linear",
                      "showMethod": "fadeIn",
                      "hideMethod": "fadeOut"
                    }
            };            
        
      }); 

      } else {}

   }


}]).controller("navCtrl", ["$scope","$http","loginService", function ($scope,$http,loginService) { 
    $scope.logout=function(){
      loginService.logout();
    }
}]).controller("newArticleCtrl", ["$scope","$upload","$compile", function ($scope,$upload,$compile) { 
      $scope.model = {};
      $scope.selectedFile = [];
      $scope.uploadProgress = 0;

      $scope.uploadFile = function () {
        $scope.model.method = 'save_data';
          var file = $scope.selectedFile[0];
          $scope.upload = $upload.upload({
              url: 'admin/article_controller.php',
              method: 'POST',
              data: $scope.model,
              file: file
          }).success(function (data) {
                if (data.status == true) {
                  $scope.uploadForm.$setPristine();
                  toastr.success("Article Inserted successfully");
                  toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "positionClass": "toast-top-right",
                    "onclick": null,
                    "showDuration": "800",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                  }

              }else {
                toastr.error("Some Error Occurred");
                toastr.options = {
                  "closeButton": false,
                  "debug": false,
                  "positionClass": "toast-bottom-left",
                  "onclick": null,
                  "showDuration": "800",
                  "hideDuration": "1000",
                  "timeOut": "5000",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                } 
              }
          });
      };

      $scope.onFileSelect = function ($files) {
        $scope.uploadProgress = 0;
        $scope.selectedFile = $files;
      };


}]).controller("editArticleCtrl", ["$scope","$upload","$http","$routeParams", function ($scope,$upload,$http,$routeParams) { 
        
        var post_data = {};
        post_data.method = 'article_by_id';
        post_data.article_id = $routeParams.id;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            console.log(data);
            $scope.model = data; 

      });

      $scope.selectedFile = [];
      $scope.uploadProgress = 0;

      $scope.uploadFile = function () {
        $scope.model.method = 'update_data';
        $scope.model.article_id = $routeParams.id;
          var file = $scope.selectedFile[0];
          $scope.upload = $upload.upload({
              url: 'admin/article_controller.php',
              method: 'POST',
              data: $scope.model,
              file: file
          }).success(function (data) {
                if (data.status == true) {
                  $scope.model.image_link = data.article_image;
                  $scope.uploadForm.$setPristine();
                  toastr.success("Article Updated successfully");
                  toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "positionClass": "toast-top-right",
                    "onclick": null,
                    "showDuration": "800",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                  }

              }else {
                toastr.error("Some Error Occurred");
                toastr.options = {
                  "closeButton": false,
                  "debug": false,
                  "positionClass": "toast-bottom-left",
                  "onclick": null,
                  "showDuration": "800",
                  "hideDuration": "1000",
                  "timeOut": "5000",
                  "extendedTimeOut": "1000",
                  "showEasing": "swing",
                  "hideEasing": "linear",
                  "showMethod": "fadeIn",
                  "hideMethod": "fadeOut"
                } 
              }
          });
      };

      $scope.onFileSelect = function ($files) {
        $scope.uploadProgress = 0;
        $scope.selectedFile = $files;
      };

}]).controller("enggController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 1;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
          //console.log(data);
            $scope.article_list = data;          
        
      });
}]).controller("humanitiesController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 2;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
           $scope.article_list = data;            
        
      });
}]).controller("generalScienceController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 3;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;           
        
      });
}]).controller("commerceController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 4;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;            
        
      });
}]).controller("medicalController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 5;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;           
        
      });
}]).controller("lawController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 6;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;            
        
      });
}]).controller("performingArtsController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 7;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;            
        
      });
}]).controller("fineArtsController", ["$scope","$http", function ($scope,$http) { 
        var post_data = {};
        post_data.method = 'get_article_by_id';
        post_data.article_id = 8;
        $http.post('admin/article_controller.php', post_data)
        .success(function(data) {
            $scope.article_list = data;            
        
      });
}])
