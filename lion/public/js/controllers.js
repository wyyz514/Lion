angular.module("Lion.controllers",[])
.controller("AppCtrl",function($scope,pix,socket,NotifService){
  $scope.pix = pix.data;
});
