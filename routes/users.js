var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/machiming';
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.body)
    var selectData = function(db, callback) {
        //连接到表
        var collection = db.collection('myali');
        //查询数据
        collection.find().toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
         selectData(db, function(result) {
           res.json(result)
            db.close();
        });
    });
});
router.post('/a', function(req, res, next) {
    var selectData = function(db, callback) {
        //连接到表
         var collection = db.collection('myali');
         var qr={"name":
                      {"$regex":req.body.name},
                  "statu":
                      {"$regex":"交易成功"},
                 }

        console.log(qr);
        //查询数据
        collection.find(qr).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log(result);
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        console.log("连接成功！");
        selectData(db, function(result) {
            res.json(result)
            db.close();
        });
    });
});
module.exports = router;
