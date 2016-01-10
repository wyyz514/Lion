angular.module("Lion.controllers",[])
.controller("AppCtrl",function($scope,pix){
  $scope.loaded = false;
  $scope.pix = pix.data;
  $scope.$watch("pix",function(){
    $scope.loaded = true;
  });
});
