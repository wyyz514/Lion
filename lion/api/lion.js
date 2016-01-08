var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var item_schema =
new Schema({
  link:String,
  owner:String,
  source:String,
  likes:{type:Number,min:0}
});

//3rd parameter is the name of the collection.#blessup
var Item = mongoose.model("Item",item_schema,"lion");
module.exports = Item;
