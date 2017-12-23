var express = require('express');
let request = require('request');
var router = express.Router();
let md5=require('md5');
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
/* GET home page. */
router.get('/',function (req,res,next) {
  res.render('exp')
});
router.post('/send',function (req,res,next) {
   RequestData="{'OrderCode':'','ShipperCode':'"+req.body.exp_code+"','LogisticCode':'"+req.body.No+"'}";
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
      res.json(body)
    }else {
      res.json(error)
    }
  });
});

module.exports = router;
