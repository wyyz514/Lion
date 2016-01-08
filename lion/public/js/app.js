var lion = angular.module("Lion",["ngRoute","Lion.controllers","Lion.services","Lion.directives"]);
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
});
