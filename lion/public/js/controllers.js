angular.module("Lion.controllers",[])
.controller("AppCtrl",function($scope,pix){
  $scope.pix = pix.data;
});
