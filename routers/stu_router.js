/* 路由提取出来 students 模块 */
const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    router = express.Router(),
    dbController = require('../dbController.js'),
    dbapi = new dbController();
dbapi.fsdb(path.join(__dirname, '../database/students.json'), 'database', 'students')

var stuData = {
    msg: {
        title: '学生信息管理'
    },
    stu:[],
}

// CRUD:路由设计 

router.get('/', (req, res) => {
    // 查
    dbapi.findstu(path.join(__dirname,'../database/students.json'),'database','students',{
        id:2
    },(err,data)=>{
        console.log(data)
        if (data){
            let arr = [];
            arr.push(data);
             stuData['stu'] = arr
             res.render('index.html',stuData);
        }
       
    })


    // 增
    // dbapi.addStu(path.join(__dirname,'../database/students.json'),'database','students',{
    //     "name":"周黑鸭","age":"20","favorite":"baskertball","job":"player","ctime":4
    // },(err,res1)=>{
    //     if (res1){
    //         dbapi.fsdb(path.join(__dirname,'../database/students.json'),'database','students',(err,data)=>{
    //             stuData['stu'] = data
    //             res.render('index.html',stuData);
    //         })
    //     }
    // })

    // 删
    // dbapi.delstu(path.join(__dirname,'../database/students.json'),'database','students',{
    //     id:5
    // },(err,res1)=>{
    //     if (res1){
    //         dbapi.fsdb(path.join(__dirname,'../database/students.json'),'database','students',(err,data)=>{
    //             stuData['stu'] = data
    //             res.render('index.html',stuData);
    //         })
    //     }
    // })

    // 改
    // dbapi.updatestu(path.join(__dirname, '../database/students.json'), 'database', 'students', {
    //     id: 3,
    //     "name": "赵六",
    //     "age": "20",
    //     "favorite": "baskertball",
    //     "job": "player",
    //     "ctime": 3
    // }, (err, res1) => {
    //     if (res1) {
    //         dbapi.fsdb(path.join(__dirname, '../database/students.json'), 'database', 'students', (err, data) => {
    //             stuData['stu'] = data
    //             res.render('index.html', stuData);
    //         })
    //     }
    // })



});


























// 导出路由对象
module.exports = router;


