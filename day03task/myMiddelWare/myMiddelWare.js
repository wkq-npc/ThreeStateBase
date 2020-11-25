const querystring = require("querystring");
const { json } = require("express");
const fs=require('fs');

// 定义中间件（本质就是一个函数）
const csBodyParse = (req, res, next) => {
    let arr = [];
    // 分批次接收buffer
      req.on("data", (buffer) => {
        arr.push(buffer);
    });
    //记录
    let log=[]
    const info={
        ip:req.headers.host,
        user_agent:req.headers['user-agent'],
        method:req.method,
        url:req.headers.host+req.url,
        reqtime:new Date()
    }
     log.push(info)
     //设置文件名，一当天的日期 . log为文件名
    let date=new Date();
    let newarr=[];
    let arrStr=date.toLocaleString().split('');
    arrStr.forEach((v)=>{
        if(!isNaN(v)){
            newarr.push(v)
        }
    })
    var dstr=newarr.join('')
    dstr=dstr.split(" ")[0]
    fs.appendFile(`${dstr}.log.json` ,JSON.stringify(log) ,function(){});
    fs.readFile(`${dstr}.log.json` , 'utf-8' ,function(err,data){
        // 报错优先,如果err中存储的不是null,就是有报错信息
        if(err !== null) throw(`我是抛出的报错信息,报错状态码是:${err.errno}`);
        // 如果没有报错,执行正常的操作
        console.log(data);
    });
    // 合并
    req.on("end", () => {
        let buffer = Buffer.concat(arr);
        let post = querystring.parse(buffer.toString());
        // 将数据挂载到req.body上
        req.body = post;
        // 继续
        next();
    }); 
};

// 导出
module.exports = csBodyParse;
