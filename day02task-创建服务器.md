# 使用http创建服务器

## 1.导入http模块

const http = require('http')

## 2。创建服务器

const server=http.createServer()

## 3.设置请求的内容

***回调函数的    req , res顺序不可颠倒

server . on('request',(res,req)=>{

//对请求的地址 req.url 进行处理

//响应结果返回   res.end(  '响应的内容' )

})

## 4.监听端口

server.listen(监听端口号 , 回调函数)

回调函数：对监听成功后做的处理，可不写

# 创建静态资源服务器

与常规创建服务器流程相似，只是对请求的req.url处理不同，看如下代码

```
const http=require('http')
const path=require('path')
const fs=require('fs')
const serve=http.createServer((req,res)=>{
    let pathname=req.url;
    console.log(pathname)
    //对根目录进行转化，设置默认路径
     pathname= pathname === "/" ? "/index.html": pathname
    /*
     对图标进行处理 此处的图标就是title前的图标 
    若找不到，就  throw error
     */
    //if(req.url !=='/favicon.ico'){ }
    //设置向服务器请求文件的文件名
        let filename=path.join(__dirname,"public",pathname);
  		//console.log(filename)
        fs.readFile(filename,(err,data)=>{
            //读取失败
            if(err){
                res.statusCode=500
                res.end("server error")
            }else{
            //读取成功，将读到的数据响应发送给浏览器客户端
                res.end(data)
            }
        }) 
})
//端口监听
serve.listen(8080,()=>{
    console.log('正在监听8080端口:http://127.0.0.1:8080')
})
```

静态资源服务器实质就是当客户端打开网页时的默认首页请求资源

## http模块的get数据请求

实质就是获取地址栏中的window.location.search

代码：

```
const http=require('http')
const url=require('url')
serve=http.createServer((req,res)=>{
	//解构获取query
    let {query} = url.parse(req.url,true)
    //输出查看结果
    console.log(query)
}).listen(8080,()=>{
    console.log('正在监听 : http://127.0.0.1:8080')
})
```

## http模块post数据请求

post数据请求实现原理-----》 表单 ，**需要监听req对象的data事件来获取客户端发送到服务器的数据。如果数据量比较大，无法一次性发送完毕，则客户端会把数据切割后分批次发送给服务器。所以data事件可能会被触发多次，每次触发data事件时，收到的数据只是全部数据的一部分，因此需要做数据的拼接才能得到完整的数据**此处借助第三方工具postman查看结果

代码：

```
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
```

# npm包管理工具

介绍：npm是node.js的项目模块管理工具，集成在node.js当中，需要安装项目依赖包比如gulp,express等等的第三方模块都需要通过npm安装，但由于nodejs非国产软件,所以直接通过npm下载项目所需的依赖包会很慢，推荐使用淘宝镜像，当然除了npm以外还有Facebook贡献的Yarn，功能和npm一样，也可以作为包管理工具。

nrm管理不同版本的npm镜像         命令：   nrm   use  npm版本名称

nrm ls  查看已安装的npm

nrm  test  查看已安装的npm版本速度

## nvm   管理不同版本的node.js

## 语义化版本

> 版本格式：**主版本号.次版本号.修订号.先行版本号**，版本号递增规则如下： 
>
> - 主版本号：对你做了不兼容的 API 修改 
>
> - 次版本号：对你做了向下兼容的功能性新增（功能做了升级） 
>
> - 修订号：对你做了向下兼容的问题修正（日常bug修改）
>
> - 先行版本号及版本编译元数据可以加到`主版本号.次版本号.修订号`的后面，作为延伸。
>
>   ![](C:\Users\kq\AppData\Roaming\Typora\typora-user-images\1606208536231.png)

> `~`表示版本号只能改变最末尾那段
>
> `^`表示除了大版本号以外，小版本号和补丁版本号都可以变
>
> **特殊情况`0`开头的版本号：**
>
> 危险写法：~0.1，等于 0.1.0 <= 版本号 <1.0.0
>
> 保险写法：^0.1，等于 0.1.0 <= 版本号 <0.2.0

> 关于软件版本发行的四个阶段：
>
> - alpha：内测版本
>
> - beta：公测版本
>
> - release candidate：RC，候选版本，功能已经确定，主要是排bug
>
> - release：正式发行版本
>
>   ## 自定义npm命令
>
>   目的：npm允许我们执行npm以调用三方的模块，但是由于通过npm调用三方模块的指令写起来比较长，而且可能频繁被使用，这样用起来非常麻烦，因此可以通过自定义命令对原先非常长的命令做一个简化（别名）。
>
>   通过package.json文件中的scripts自定义脚本命令：
>
>   ```javascript
>   {
>     "scripts": {
>       "test": "echo hello"
>     }
>   }
>   ```
>
>   随后就可以在命令行中运行（npm run `自定义指令名称`）：
>
>   npm run test
>
>   

自动重启应用    安装nodemon包

全局安装   npm   i  nodemon -g

在编写调试Node.js项目，修改代码后 需要频繁的手动重启应用，非常繁琐。nodemon这个工具，它的作用是监听代码文件的变动，**当代码改变之后，自动重启**。

# express模块

Express 是基于 Node.js 平台，`快速、开放、极简`的 Web 开发框架。**搭建web服务器**Express 的本质：就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。使用Express开发框架可以非常方便、快速的创建Web网站的服务器或API接口的服务器，express的出现代替了http模块，由于如果请求的页面过多使用http模块就需要写很多请求判断地址代码，造成运行的文件庸肿（太大，麻烦），所以express模块的出现改变了这个局面

基本使用：

在项目文件夹下cmd安装：     npm init  -y     npm  -S  i express    

## express创建web服务器

```
const express = require('express')
// 创建web服务
const app = express()
// 监听 get请求
// req 请求对象
// res 响应对象
app.get('请求URI',(req,res)=>{
	// 向客户端响应数据
res.send('响应类内容')
	})
// 监听POST请求
app.post('请求URI',(req,res)=>{
res.send('响应类内容')
})
// 其他app.形式的api方法，put/delete/use 等
// 启动服务
app.listen(8080,()=>{})
```

###          调试：

get请求直接在地址栏输入请求的  url  

post请求借助第三方工具postman，apipost,apizza