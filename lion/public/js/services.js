angular.module("Lion.services",[])
.service("DBService",function($http){
  var url = "http://rando-00.herokuapp.com/api";
  return {
    all:function(cb){
      return $http({
        url: url,
        method: "GET",
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .success(function(data){
        return cb(null,data);
      })
      .error(function(err){
        return cb(err);
      });
    }
  }
})
//based off of Brian Ford's AngularJS/SocketIO tutorial
.service("socket",function($rootScope){
  var socket = io.connect();
  return {
    on:function(event,callback){
      socket.on(event,function(data){
        $rootScope.$apply(function(){
          callback(data);
        });
      });
    },
    emit:function(event,data){
      socket.emit(event,data);
    }
  };
})
.service("NotifService",function($http){
  var url = "http://rando-00.herokuapp.com/";
  return {
      like:function(id,cb){
        return $http({
          method:"POST",
          data:{"id":id},
          url:url+"/like"
        })
        .success(function(resp){
          return cb(null,resp);
        })
        .error(function(err){
          return cb(err);
        });
      },
    unlike:function(id,cb){
      return $http({
        method:"POST",
        data:{"id":id},
        url:url+"/unlike"
      })
      .success(function(resp){
        return cb(null,resp);
      })
      .error(function(err){
        return cb(err);
      });
    }
  }
});
