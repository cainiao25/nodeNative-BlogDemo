 const mysql = require('mysql2')

const { MYSQL_CONF } = require('../conf/db')


// 创建链接对象

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'myblog'
})

// 开始链接
 con.connect()


//统一执行sql的函数
// const exec = (sql) => {
//     console.log(exec,'走到exec节点')
//     const promise = new Promise((resolve, reject) => {
//         con.query(sql, (err, result) => {
//             if(err){
//                 console.log(err, '链接失败')
//                 return
//             }
//             console.log(result, '链接成功')
//         })
//         return promise
//     })
// }

 const exec = (sql) => {
     return new Promise((resolve, reject) => { // 注意这里是 resolve 不是 reuolve
         con.query(sql, (err, result) => {
             if (err) {
                 reject(err); // 在出错时应该调用 reject
                 return;
             }
             resolve(result); // 查询成功时调用 resolve 并传入结果
         });
     });
 };


module.exports = {
    exec
}
