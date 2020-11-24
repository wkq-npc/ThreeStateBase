const http=require('http')
const querystring=require('querystring')
http.createServer((req,res)=>{
    //存储读到的数据
    let arr=[];
    //获取到数据并存入arr
    req.on('data',(buffer)=>{
        arr.push(buffer)
    })
    //接收完毕
    /*
    将得到的数据写入Buffer中
    */
    req.on('end',()=>{
        //将原始Buffer与写入的数据数组arr合并
        let buffer=Buffer.concat(arr)
        //强制数据类型转换
        let str =buffer.toString()
        //输出看看
        console.log(querystring.parse(str))
        // console.log(querystring.parse(Buffer.concat(arr).toString()))
    })
}).listen(8080,()=>{
    console.log('正在监听 http://127.0.0.1:8080')
})