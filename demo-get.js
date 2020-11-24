const http=require('http')
const url=require('url')
serve=http.createServer((req,res)=>{
    let {query} = url.parse(req.url,true)
    console.log(query)
}).listen(8080,()=>{
    console.log('正在监听 : http://127.0.0.1:8080')
})
/*
总结：
    get方式就是通过nodejs的方式获取到search
*/