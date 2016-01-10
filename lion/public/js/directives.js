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
    controller:function($scope,socket,NotifService,$localStorage){
      $scope.store = $localStorage;
      $scope.store.likes = $localStorage.likes || [];

      var notif_cb = function(err,resp){
        err?console.log(err):console.log(resp);
      }

      $scope.is_liked = function(id)
      {
          $scope.liked = $scope.store.likes.indexOf(id) > -1 ? true:false;
          return $scope.liked;
      }

      $scope.save_like = function(id){
        console.log(id);
        $scope.store.likes.push(id);
      }

      $scope.remove_like = function(id){
          var idx = $scope.store.likes.indexOf(id);
          $scope.store.likes.splice(idx,1);
      }

      $scope.like_toggle = function(pic,index){
        //TODO: should not increment or decrement like until response is received from NotifService
        if(!$scope.liked)
        {
          if(NotifService.like(pic._id,notif_cb)){
            $scope.liked = true;
            pic.likes = pic.likes + 1;
            socket.emit("like",{"pic":pic});
            $scope.save_like(pic._id);
          }
        }
        else {
          if(NotifService.unlike(pic._id,notif_cb))
          {
            $scope.liked = false;
            pic.likes = pic.likes - 1;
            socket.emit("unlike",{"pic":pic});
            $scope.remove_like(pic._id);
          }
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
