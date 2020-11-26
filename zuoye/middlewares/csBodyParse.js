const querystring = require("querystring");
const fs = require("fs");


const csBodyParse = (req, res, next) => {
    // console.log(req);
    let str = {};
    let arr = [];
    let time =new Date();
    req.on("data",(buffer)=>{
    arr.push(buffer);
        //ip地址
       // console.log(req.headers.host);
        
       // console.log(time)
        //url
        //console.log(req.url)
        //
        //console.log(req.headers[0]);
        //console.log(req.method)
        // str = `${req.headers.host}`+'/'+ time+'/' +`${req.url}`+ '/' +`${req.method}`+'/' +`${req.headers[0]}`;
        // console.log(str = `${req.headers.host}`+'/'+ `${time}`+'/' +`${req.url}`+ '/' +`${req.method}`+'/' +`${req.headers[0]}`)
        // console.log(`${req.headers.host}`)
        // str += '/'+ time;
        // str += '/' +`${req.url}`;
        // str += '/' +`${req.method}`;
        // str += '/' +`${req.method}`;
        // str += '/' +`${req.headers[0]}`;
    })
    // console.log(str = `${req.headers.host}`+'/'+ `${time}`+'/' +`${req.url}`+ '/' +`${req.method}`+'/' +`${req.headers[0]}`)
    str.ip = req.headers.host;
    str.time = time;
    str.add = req.headers.host + req.url;
    str.method =req.method;
    str.xinxi = req.headers['user-agent']

    fs.appendFile('./test.txt',JSON.stringify(str),err => {
        console.log(err);
    })
    fs.readFile('./test.txt','utf8',(err,data) => {
        if(err){
            console.log('出错了');
        }else{
            console.log(data);
        }
    })

    req.on("end", () => {
        let buffer = Buffer.concat(arr);
        let post = querystring.parse(buffer.toString());
        // 将数据挂载大req.body上
        req.body = post;
        // 继续
        next();
    });

}
module.exports = csBodyParse;