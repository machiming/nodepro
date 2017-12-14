var express = require('express');
var router = express.Router();
var mysql  = require('mysql');
var cheerio = require('cheerio');
var superagent = require('superagent');
/* GET home page. */
router.get('/bug', function(req, res, next) {
    var connection = mysql.createConnection({
        host     : '113.209.78.135',
        user     : 'root',
        password : 'root',
        database : 'alipay'
    });
    connection.connect();
    connection.query("select  creat_time,money from myali  WHERE trade_where LIKE '%天弘%' AND `name` LIKE '%发放%'", function(err, rows, result) {
        res.json(rows)
    });
    connection.end();

});
router.get('/a', function(req, res, next) {
    res.render('layout')
})
router.get('/b', function(req, res, next) {
    res.render('layout')
})
router.get('/c',function (req,res,next) {
    superagent.get('https://cnodejs.org/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                  
                });
            });

            res.send(items);
        });
})
module.exports = router;
