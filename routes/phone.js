var express = require('express');
var request = require('request');
var router = express.Router();
var crypto=require('crypto');
var md5=crypto.createHash("md5");
var date=new Date();
var rp={}
var time = date.getFullYear().toString() + (date.getMonth() + 1) +  date.getDate()+  date.getHours()  +  date.getMinutes()  +  date.getSeconds()
var data = {
    accountSid: '2640660739284c109f7581c5f66b1ffb',
    /*smsContent:'【落雪科技】您的验证码是345678，30分钟输入有效。',*/
    templateid:'116989953',
    param:'1234',
    to:'15698268081',
    timestamp:time,
    sig:md5.update('2640660739284c109f7581c5f66b1ffb'+'27c7501c9f2244b7a2169d737f478d28'+time).digest('hex'),
    respDataType:'JSON'
};
function trdata(data) {
    var str = [];
    for (var p in data) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
    return str.join("&");
}
router.get('/',function (req,res,next) {
    request({
        url: 'https://api.miaodiyun.com/20150822/industrySMS/sendSMS',
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: trdata(data)
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.json(response)
        }else {
            res.json(error)
        }
    });
})
module.exports = router;