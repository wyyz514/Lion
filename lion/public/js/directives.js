angular.module("Lion.directives",[])
.directive("lionPic",function(){
  return {
    restrict:"E",
    scope:{
      pic:"="
    },
    templateUrl:"../partials/lion-pic.html",
    link:function(scope,el,attrs){

    },
    controller:function($scope,socket,NotifService){
      $scope.liked = false;
      var notif_cb = function(err,resp){
        err?console.log(err):console.log(resp);
      }

      $scope.like_toggle = function(pic){
        if(!$scope.liked)
        {
          $scope.liked = true;
          pic.likes = pic.likes + 1;
          socket.emit("like",{"pic":pic});
          NotifService.like(pic._id,notif_cb);
        }
        else {
          $scope.liked = false;
          pic.likes = pic.likes - 1;
          socket.emit("unlike",{"pic":pic});
          NotifService.unlike(pic._id,notif_cb);
        }
      }

      socket.on("like",function(data){
        if($scope.pic._id == data.pic._id)
          $scope.pic.likes = $scope.pic.likes + 1;
      });

      socket.on("unlike",function(data){
        if($scope.pic._id == data.pic._id)
          $scope.pic.likes = $scope.pic.likes - 1;
      });
    }
  };
});
