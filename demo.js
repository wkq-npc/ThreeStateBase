const http=require('http')//导入http模块
const path=require('path')//导入path模块
const fs=require('fs')
const serve=http.createServer((req,res)=>{
    let pathname=req.url;
    console.log(pathname)
    //对根目录进行转化，设置默认路径
     pathname= pathname === "/" ? "/index.html": pathname;
    //对图标进行处理
    //if(req.url !=='/favicon.ico'){ }
        let filename=path.join(__dirname,"public",pathname);
  console.log(filename)
        fs.readFile(filename,(err,data)=>{
            if(err){
                res.statusCode=500
                res.end("server error")
            }else{
                res.end(data)
            }
        }) 
})
serve.listen(8080,()=>{
    console.log('正在监听8080端口:http://127.0.0.1:8080')
})