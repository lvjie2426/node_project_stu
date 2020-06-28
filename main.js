const express = require('express'),
    path = require('path'), // path 路径模块
    app = express(); // 一 返回http对象
// 二.1.开放静态资源 2配置开发依赖。 3.设置响应头参数 文件类型  4.解决跨越问题
app.use(express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname, 'node_modules')));
// 配置模板引擎 1.导入引擎 art-template  express-art-template(依赖前者)。 2.设置引擎文件配置 默认view 文件夹 .art文件名结尾
app.engine('html', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'));


// 三.路由模块设计
app.get('/', (req, res) => {
  res.render('index.html',{

  });
});




// 四.绑定并侦听指定主机和端口上的连接
app.listen(80, function (err, res) {// 开放http服务端口
    console.log('启动成功');
});
