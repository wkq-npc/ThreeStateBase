# REATful规范

**what:**  一种软件架构风格、设计风格，而不是标准，只是提供了一组设计原则和约束条件。它主要用于客户端和服务器交互类的软件。基于这个风格设计的软件可以更简洁，更有层次，更易于实现缓存等机制。

一。URL（同一资源定位符）规范

1.不用大写；

2.用中杠 - 不用下杠 _ ；

3.参数列表要encode；

4.URI中的名词表示资源集合，使用复数形式。

5.在RESTful[架构](http://lib.csdn.net/base/architecture)中，每个网址代表一种资源（resource），所以网址中不能有动词，只能有名词（特殊情况可以使用动词），而且所用的名词往往与[数据库](http://lib.csdn.net/base/mysql)的表格名对应。

**URI表示资源的两种方式***：资源集合、单个资源。

资源集合：

​       /zoos           //所有动物园

​       /zoos/1/animals         //id为1的动物园中的所有动物

单个资源：

​       /zoos/1          //id为1的动物园

​       /zoos/1;2;3        	//id为1，2，3的动物园

# 版本要求

应该将API的版本号放入到URI (统一资源标识符)  中

 例如：    https://api.example.com/v1/zoos

# Request

### 常见状态码

§200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。

§201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。

§202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）

§204 NO CONTENT - [DELETE]：用户删除数据成功。

§400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。

§401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。

§403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。

§404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。

§406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。

§410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。

§422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。

§500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

### URI失效

随着系统发展，总有一些API失效或者迁移，对失效的API，返回404 not found 或 410 gone；对迁移的API，返回 301重定向。

# Response

各HTTP方法成功处理后的数据格式：

![](C:\Users\kq\AppData\Roaming\Typora\typora-user-images\1606276562246.png)

# 错误处理

  1.不要发生了错误  就  给2xx响应，客户端可能会缓存成功的http请求；

2.  正确设置http状态码，不要自定义；

3. Response body提供

即:返回的信息中将error作为键名，出错信息作为键值即可

1)错误的代码（日志/问题追查）；

2)错误的描述文本（展示给用户）

