var express = require('express');
let request = require('request');
var router = express.Router();
let md5=require('md5');
var db = require('./db')
let api_key = '235490a3-5767-438f-905d-2f7eb5f69335';
let RequestData='';
let md5_result=''
let sign='';
function trdata(data) {
  let str = [];
  for (let p in data) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
  }
  return str.join("&");
}
function dealwith(deal) {
    db.con(function (connect) {
        console.log(deal)
        connect.query(deal, function (err, row, result) {
            console.log(row)
        })
    })
}
/* GET home page. */
router.get('/',function (req,res,next) {
  res.render('exp')
});
router.post('/send',function (req,res,next) {
   RequestData="{'OrderCode':'','ShipperCode':'"+req.body.exp_code+"','LogisticCode':'"+req.body.No+"'}";
   console.log(RequestData)
   md5_result=md5(RequestData+api_key);
   console.log(md5_result);
   sign=new Buffer(md5_result).toString('base64');
  /*五个必须传的参数*/
  let data = {
    EBusinessID: '1311498',
    DataSign:sign,
    RequestData:RequestData,
    RequestType:1002,
    DataType:2
  };
  /*发送请求*/
  request({
    url: 'http://api.kdniao.cc/Ebusiness/EbusinessOrderHandle.aspx',
    method: "POST",
    json: true,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    body: trdata(data)
  }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var sql="SELECT * FROM info where expCode='"+body.ShipperCode+"'AND NO='"+body.LogisticCode+"'";
        var  flag=false;
        db.con(function (connect) {
            connect.query(sql, function (err,row,result) {
                console.log(row);
                if (err) {
                    console.log(err);
                    return
                }
               if(row.length>0){
                   deal = "UPDATE `kuaidi`.`info` SET `track` = '"+JSON.stringify(body.Traces)+"',`updatetime` = '"+new Date().toLocaleString()+"',`step` = '"+(body.Traces).length+"' WHERE `expCode` = '"+body.ShipperCode+"' AND `No`='"+body.LogisticCode+"'";
                   dealwith(deal)
               }else {
                   deal = "INSERT INTO `kuaidi`.`info`(`expCode`, `No`, `track`,`creattime`,`step`) VALUES ('"+body.ShipperCode+"', "+body.LogisticCode+", '"+JSON.stringify(body.Traces)+"', '"+new Date().toLocaleString()+"','"+(body.Traces).length+"')";
                   dealwith(deal)
               }
            })
        });

        res.json(body)
    }else {
      res.json(error)
    }
  });
});

module.exports = router;
