module.exports = function(server){
  var plug = require("socket.io")(server);
  plug.on("connection",function(socket){
    socket.on("like",function(data){
      socket.broadcast.emit("like",data);
    });

    socket.on("unlike",function(data){
      socket.broadcast.emit("unlike",data);
    });
  });
}
