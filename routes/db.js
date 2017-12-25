/**
 * Created by Administrator on 2017/12/25.
 */
var mysql = require("mysql");
var pool = mysql.createPool({
    host: '113.209.78.135',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'kuaidi'
})

var db = {};
db.con = function (callback) {   //callback是回调函数，连接建立后的connection作为其参数
    pool.getConnection(function (err, connection) {
        console.log("connect start...")
        if (err) {      //对异常进行处理
            console.log(err)
            throw err;  //抛出异常
        } else {
            callback(connection);   //如果正常的话，执行回调函数（即请求）
        }
        connection.release();   //释放连接
        console.log("connect end...")
    })
}
module.exports = db;