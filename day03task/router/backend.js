const express=require('express')
const rout=express()
rout.get('/back/login',(req,res)=>{
    res.send('后台登录页面')
})
rout.post('/back/logout',(req,res)=>{
    res.send('后台退出页面')
})
rout.post('/back/register',(req,res)=>{
    res.send('后台注册页面')
})

module.exports=rout