const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send('hello boy')
})
app.post('/post',(req,res)=>{
    res.send('postman')
})
app.listen(8080,()=>{
    console.log('正在监听：http://127.0.0.1:8080')
})