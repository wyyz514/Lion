var Item = require("./lion");

exports.plus_one = function(req,res){
  var id = req.body.id;
  Item.findOne({_id:id},function(err,item){
    if(item)
    {
      item.likes = item.likes + 1;
      item.save(function(err){
        if(err){
          console.log(err);
          res.end("Error");
        }
        else{
          res.end("Done");
        }
      });
    }
    else {
      res.end("Not found");
    }
  });
};

exports.minus_one = function(req,res){
  var id = req.body.id;
  console.log(id);
  Item.findOne({_id:id},function(err,item){
    if(item)
    {
      item.likes = item.likes - 1;
      item.save(function(err){
        if(err){
          console.log(err);
          res.end("Error");
        }
        else{
          res.end("Done");
        }
      });
    }
    else {
      res.end("Not found");
    }
  });
};
