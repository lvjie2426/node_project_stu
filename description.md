### 文件结构
- database 数据库文件
- router  路由模块  mvc [c- controller]
- schemas 数据库 发布模式 mvc  [m]
- static  静态资源路径 开放以/static 或者 自动加上 static 开头 app.use('/static', express.static('static')); app.use( express.static('static'));
- views   exprss 默认模板路径存放地址 渲染数据 mvc [v] 配置模板引擎 art-template  set
- main.js 整个项目的入口文件，
- dbController 自己封装的 node.js 库文件 