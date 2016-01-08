var mongoose = require("mongoose");
module.exports = function(){
    mongoose.connect("mongodb://wasp:sting@ds037205.mongolab.com:37205/rando/");
    var db = mongoose.connection;
    db.on("error",function(err){
      console.log(err);
    });
    db.once("open",function(){
      console.log("Connected successfully");
    })
};
