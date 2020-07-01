const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    fs = require('fs'),
    app = express(),
    stu_router = require('./routers/stu_router');

    // 开放静态资源 配置中间件，模板引擎，body-parser
    app.use(express.static('static'));
    app.use(express.static('node_modules'));
    app.use(bodyParser.json());


    app.engine('html',require('express-art-template'));

    app.set('views', path.join(__dirname, './views'));



    // 挂载路由
    app.use(stu_router);







    app.listen('80',function(){
        console.log('success:http server up!')
    })