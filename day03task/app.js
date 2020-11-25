const express=require('express')
const app=express()
/* 
//根据设定的 ? 对输入的参数是否必填 
//必填参数 
app.get('/user/:id/:name',(req,res)=>{
    res.send(req.params)
      res.send('hello boy')
})
//可选参数  ?  
app.get('/user/:id?/:name',(req,res)=>{
    res.send(req.params)
      res.send('hello boy')
}) */
/*
//
app.all('/',(req,res)=>{
    res.send('postman')
}) */
//访问该网站时默认页面   静态web资源服务器
 app.use(express.static('public'))

app.listen(8080,()=>{
    console.log('正在监听：http://127.0.0.1:8080')
})
