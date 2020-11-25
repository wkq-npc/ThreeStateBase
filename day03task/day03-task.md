# Day03

## express创建服务器

1.get请求

2.post请求

3.put请求

4.delet请求

```
const express=require('express')
const app=express()
 app.get('/',(req,res) => {
	res.send('get请求')
})

app.post('/',(req,res) => {
	res.send('post请求')
})

app.put('/',(req,res) => {
	res.send('put请求')
})

app.delete('/',(req,res) => {
	res.send('delete请求')
})
app.listen(8080,()=>{
    console.log('正在监听：http://127.0.0.1:8080')
})
/*
若**所有请求地址**都一样，可采用以下响应请求方式
app.all('/',(req,res) => {
	res.send('delete请求')
})
*/
```

## 获取query字符串

在express模块中获取query模块可以通过如下方式获取

```
app.get('/',(req,res)=>{
	console.log(req.query)	// 获取到的直接就是个对象
})
```

## 动态参数传递

```
const express=require('express')
const app=express()
//根据设定的 ? 浏览器对输入的参数是否必填 
//必填参数 
app.get('/user/:id/:name',(req,res)=>{
    res.send(req.params)
      res.send('hello boy')
})
//可选参数  ?  
app.get('/user/:id?/:name',(req,res)=>{
    res.send(req.params)
      res.send('hello boy')
}) 
app.listen(8080,()=>{
    console.log('正在监听：http://127.0.0.1:8080')
})
```

## 静态资源托管

实际就是当用户访问该页面的时候，默认显示的页面资源，如  各大网站的首页

```
app.use(express.static('public'))
// app.use()表示使用（中间件）
// 现在可以访问public目录下所有的文件 
// 如public/aa.jpg文件，则可以通过 : http://xxxx/images/aa.jpg
```

express支持给访问的页面创建前缀，示例：

```
app.use('/myprefix', express.static('public'))
```

前缀前面的“/”必须要加，否则报错，因为地址解析时   / 为间隔符号

## 路由  

路由即地址

### 定义路由

express中的路由分3部份组成，分别是请求**类型（get  ， post    ,   put  ,  delet。。。。。）、请求uri和对应的处理函数**。

## 中间件

中间件实际就是请求数据需要用到的封装好的js程序模块

分类：

### 一：内置中间件

express的内置中间件：

1.app.use('前缀',express.static('托管目录地址'))

express.json

使用格式 ：  app.use(express.json())`

作用：接收json格式提交的数据

兼容性问题：express >= 4.16.0

其在接收完数据后，会将数据的对象形式挂载到`req`请求对象的`body`属性上

3.express.urlencoded

作用：处理post表单数据

兼容性问题：express >= 4.16.0

使用格式 ：app.use(express.urlencoded({extended: false}))

其在接收完数据后，会将数据的对象形式挂载到`req`请求对象的`body`属性上

**注意**：关于urlencoded中间件中的配置项`extended`值的说明

- 值默认为true，但是不建议使用默认的true
- 值true与false的区别
  - false：使用querystring库去解析post数据
    - 去除获取到的数据对象的内置方法
    - 接收到的数据只有字符串与数组的形式
  - true：使用qs库去解析post数据
    - 使得获取到的数据对象更加面向对象化

### 二。第三方中间件

非 Express 官方内置的，而是由第三方开发出来的中间件，叫做第三方中间件。在项目中可以通过npm进行安装第三方中间件并配置，从而提高项目的开发效率。例如body-parser 此中间件可以很方便帮助我们获取到post提交过来的数据。

三。自定义中间件    

例如：

1.自定义中间件实现   express.json，express.urlencoded

```
// 导入
const querystring = require("querystring");

// 定义中间件（本质就是一个函数）
const csBodyParse = (req, res, next) => {
    let arr = [];
    // 分批次接收buffer
    req.on("data", (buffer) => {
        arr.push(buffer);
    });
    // 合并
    req.on("end", () => {
        let buffer = Buffer.concat(arr);
        let post = querystring.parse(buffer.toString());
        // 将数据挂载大req.body上
        req.body = post;
        // 继续
        next();
    });
};
// 导出
module.exports = csBodyParse;
```

使用json、urlencoded中间件来接收json数据与表单post数据，发送可以通过postman来进行

**步骤**：

- 定义中间件
- 监听req的data事件
  - 在中间件中，需要监听req对象的data事件来获取客户端发送到服务器的数据。如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后分批次发送给服务器。所以data事件可能会被触发多次，每次触发data事件时，收到的数据只是全部数据的一部分，因此需要做数据的拼接才能得到完整的数据。
- 监听req的end事件
  - 当请求体数据传输完毕后会触发end事件，拿到全部数据后可以继续处理post数据
- 使用querystring模块来解析请求体数据
- 将解析出来的请求体对象挂载到req.body上
- 将自定义中间件封装为模块（可选，建议做）
  - 为了优化代码的结构，我们可以把自定义的中间件函数封装成独立的模块

### 三，第三方中间件

安装与使用：

npm i -S body-parser