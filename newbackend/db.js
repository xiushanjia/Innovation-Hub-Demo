var express = require("express");
    //expressjs 引入 mongodb
    var MongoClient = require("mongodb").MongoClient;
 
    var app = express();
 
    app.get("/",function(req,res) {
        //连接数据库,假如数据库不存在，会自动创建一个数据库
    var url = "mongodb://localhost:27017/mongoTest";
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log("数据库连接失败");
            return;
        }
        console.log("数据库连接成功");
        var db = client.db("mongoTest");
        //插入数据，如果没有指定collection，会新建
        db.collection("user").insertOne({
            "username": "T0529dsid001",
            "age": 23,
            "sex": "男"
        }, function (err, result) {
            if (err) {
                res.send("插入数据失败");
                return;
            }
            console.log(result);
            client.close();
            res.end();
        })
 
    });
 
});
app.listen(8081);
