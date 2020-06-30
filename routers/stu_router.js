/* 路由提取出来 students 模块 */
const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    dbController = require('../dbController.js'),
    dbapi = new dbController();
    dbapi.fsdb(path.join(__dirname,'../database/students.json'),'database','students')

var stuData = {
    msg:{
        title:'学生信息管理'
    },
    stu:{},
}

// CRUD:路由设计 

router.get('/',(req,res)=>{
    dbapi.addStu(path.join(__dirname,'../database/students.json'),'database','students',{
        "name":"周黑鸭","age":"20","favorite":"baskertball","job":"player","ctime":4
    },(err,res1)=>{
        if (res1){
            dbapi.fsdb(path.join(__dirname,'../database/students.json'),'database','students',(err,data)=>{
                stuData['stu'] = data
                res.render('index.html',stuData);
            })
        }
    })
    
 }); 


























// 导出路由对象
 module.exports = router;


