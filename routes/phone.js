let express = require('express');
let request = require('request');
let router = express.Router();
let md5=require('md5');
let date=new Date();
let rp={};


let code=randomcode();

function randomcode() {
  let rd='';
  for(let i=0;i<4;i++){
    let c=Math.floor(Math.random()*10);
    rd+=c;
  }
  return rd
}
let time = date.getFullYear().toString() + (date.getMonth() + 1) +  date.getDate()+  date.getHours()  +  date.getMinutes()  +  date.getSeconds()

function trdata(data) {
    let str = [];
    for (let p in data) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    }
    return str.join("&");
}
/*加载验证页面*/
router.get('/',function (req,res,next) {
  res.render("phone")
});

/*发送验证码*/
router.post('/send',function (req,res,next) {
  let data = {
    accountSid: '2640660739284c109f7581c5f66b1ffb',
    templateid:'116989953',
    param:code,
    to:'15698268081',
    timestamp:time,
    sig:md5('2640660739284c109f7581c5f66b1ffb'+'27c7501c9f2244b7a2169d737f478d28'+time),
    respDataType:'JSON'
  };
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
            req.session.code = code;
            res.send(response);

        }else {
            res.json(error)
        }
    });
});
/*验证比较*/
router.post('/tijiao',function (req,res,next) {
  let accept=parseInt(req.body.code);
  let sessioncode=parseInt(req.session.code);
  if(accept==sessioncode){
    res.send("验证成功")
  }else {
    res.send(accept+";"+sessioncode)
  }
});
module.exports = router;
