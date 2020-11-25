const express=require('express')
const app=express()
const front=require('./frontend')
const back=require('./backend')
app.use(front)
app.use(back)
app.listen(8080,()=>{
    console.log('正在监听：http://127.0.0.1:8080')
})
