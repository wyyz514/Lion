var db_init = require("./api/db_setup");
var express = require("express");
var body_parser = require("body-parser");
var Item = require("./api/lion");
var likes = require("./api/likes");
var app = express();
var server = require("http").Server(app);
var sock_init = require("./api/plug");
var port = process.env.PORT||3000;

app.set("views","./views");
app.set("view engine","jade");

app.use(express.static("./public"));
app.use(body_parser.urlencoded());
app.use(body_parser.json());

//CORS configuration from igorzg
/**
 * On all requests add headers
 */
app.all('*', function(req, res,next) {
    /**
     * Response settings
     * @type {Object}
     */
    var responseSettings = {
        "AccessControlAllowOrigin": req.headers.origin,
        "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
        "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
        "AccessControlAllowCredentials": true
    };
    /**
     * Headers
     */
    res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
    res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
    res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
    res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);

    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.get("/",function(req,res){
  res.render("index");
});
app.get("/api",function(req,res){
  Item.find({},function(err,item){
    res.send(JSON.stringify(item));
    res.end();
  })
});
app.post("/like",likes.plus_one);
app.post("/unlike",likes.minus_one);

server.listen(port,function(){
  console.log("Listening on port",port);
  db_init();
  sock_init(server);
});
