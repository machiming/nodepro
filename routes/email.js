var express = require('express');
var router = express.Router();
var nodemailer  = require('nodemailer');
/* GET home page. */
var mailTransport = nodemailer.createTransport({
  host : 'smtp.qq.com',
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth : {
    user : '837944832@qq.com',
    pass : 'machiming123456'
  },
});
router.get('/',function (req,res,next) {
  res.render('email')
})
router.post('/send', function(req, res, next) {
  console.log(req.body);
  var options = {
    from        : '837944832@qq.com',
    to          : req.body.name,
    subject     : req.body.title,
    html        : req.body.content,
  };
   mailTransport.sendMail(options, function(err, msg){
     if(err){
       console.log(err);
       res.json('失败');
     }
     else {
       console.log(msg);
       res.json('成功');
     }
   });
});
module.exports = router;
