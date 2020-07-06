/* 路由提取出来 students 模块 */
const express = require('express'),
    fs = require('fs'),
    path = require('path'),
    querystring = require('querystring'),
    router = express.Router(),
    dbController = require('../dbController.js'),
    dbapi = new dbController();
dbapi.fsdb(path.join(__dirname, '../database/students.json'), 'database', 'students')

var stuData = {
    msg: {
        title: '学生信息管理'
    },
    stu: [],
}

// CRUD:路由设计 

router.get('/', (req, res) => {

    dbapi.fsdb(path.join(__dirname, '../database/students.json'), 'database', 'students', (err, data) => {
        // console.log(data)
        if (data) {

            stuData['stu'] = data
            res.render('index.html', stuData);
        }

    })

    // 查
    // dbapi.findstu(path.join(__dirname, '../database/students.json'), 'database', 'students', {
    //     id: 2
    // }, (err, data) => {
    //     // console.log(data)
    //     if (data) {
    //         let arr = [];
    //         arr.push(data);
    //         stuData['stu'] = arr
    //         res.render('index.html', stuData);
    //     }
    //
    // })


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

router.get('/student', (req, res) => {
    if (req.query.id) {
        dbapi.findstu(path.join(__dirname, '../database/students.json'), 'database', 'students', {
            id: parseInt(req.query.id)
        }, (err, data) => {
            console.log(data)
            if (data) {
                res.render('studentDetails.html', data);
            }

        })
    } else {
        res.render('studentDetails.html')
    }
});

router.post('/student/add', (req, res) => {
    let param = {};
    param.ctime = getFormTime(new Date().getTime());
    if (req.body && JSON.stringify(req.body) != '{}') {
        req.body.sex = +req.body.sex;
        req.body.age = +req.body.age;
        for (var k in req.body) {
            param[k] = req.body[k];
        }
    }
    dbapi.fsdb(path.join(__dirname, '../database/students.json'), 'database', 'students', (err, data) => {
        if (data) {
            param.id = data.length+1;
            data.push(param)
            dbapi.savedb(path.join(__dirname, '../database/students.json'), 'database', 'students', data, (err) => {
                if (err) {
                    console.log('写入失败');
                } else {
                    res.writeHead(301, {'Location': '/'});
                    res.end();
                }
            })
        } else if (err) {
            res.render('404notFind.html')
        }
    })

});

router.post('/student/updata', (req, res) => {
    let param = {};
    if (req.body && JSON.stringify(req.body) != '{}') {
        req.body.id = +req.body.id;
        req.body.sex = +req.body.sex;
        req.body.age = +req.body.age;
        for (var k in req.body) {
            param[k] = req.body[k];
        }
        param.ctime = getFormTime(new Date().getTime());
    }
    dbapi.updatestu(path.join(__dirname, '../database/students.json'), 'database', 'students', param, (err, suc) => {
        if (suc.sucess) {
            console.log(param)
            res.writeHead(301, {'Location': '/'});
            res.end();
        } else if (err) {
            console.log('写入失败');
            res.render('404notFind.html')
        }
    })

});


router.get('/student/del', (req, res) => {
    let id = parseInt(req.query.id);
    dbapi.delstu(path.join(__dirname, '../database/students.json'), 'database', 'students', {
        id
    }, (err, suc) => {
        if (suc.sucess) {
            res.redirect('/');
        }
    });

});


function getFormTime (time){
    if (!time) {return 0;}
    var t = new Date(time),
        y = t.getFullYear(),
        m = t.getMonth()+1,
        d = t.getDay()<10?'0'+t.getDay():t.getDay(),
        h = t.getHours(),
        min = t.getMinutes()<10?'0'+t.getMinutes():t.getMinutes(),
        s = t.getSeconds()<10?'0'+t.getSeconds():t.getSeconds();
    return `${y}年${m}月${d}日 ${h}:${min}:${s}`
}

// 导出路由对象
module.exports = router;


