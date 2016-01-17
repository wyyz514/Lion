var lion = angular.module("Lion",["ngRoute","ngStorage","Lion.controllers","Lion.services","Lion.directives"]);
//route configuration
lion.config(function($routeProvider){
  $routeProvider.when("/app",{
    templateUrl:"../partials/lion.html",
    controller:"AppCtrl",
    resolve:{
      pix:function(DBService){
        return DBService.all(function(err,data){
          if(err) {
            throw new Error(err);
          }
          else {
              return data;
          }
        });
      }
    }
  });
  $routeProvider.otherwise({redirectTo:"/app"});
})
.run(function($rootScope,$timeout){
  $rootScope.notification = "";
  $rootScope.updateNotification = function(notification){
    $rootScope.notification = notification;
    $rootScope.displayNotification();
  }

  $rootScope.displayNotification = function(){
    var notifBar = document.querySelector(".lion-notif");
    notifBar.innerText = $rootScope.notification;
    notifBar.classList.add("bar-active");
    $timeout(function(){
        notifBar.classList.remove("bar-active");
    },2000);
  }
})
