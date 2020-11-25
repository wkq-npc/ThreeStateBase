const express=require('express')
const rout=express()
rout.get('/front/login',(req,res)=>{
    res.send('前台登录页面')
})
rout.post('/front/logout',(req,res)=>{
    res.send('前台退出页面')
})
rout.post('/front/register',(req,res)=>{
    res.send('前台注册页面')
})
module.exports=rout