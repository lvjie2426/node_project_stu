const fs = require('fs'),
    path = require('path'),
    database = require('./database/students.json'),
    dbcontroller = (function () {
        function dbcontroller() { };
        let _prototype = dbcontroller.prototype,
            thos = this;
        _prototype.fsdb = function (dbpath, dbName, tbName, callback) {
            fs.readFile(path.join(dbpath), 'utf-8', (err, res) => {
                let data;
                if (res) {
                    res = JSON.parse(res);
                    for (var k in res) {
                        if (k === dbName) {
                            data = res[k][tbName]
                        }
                    }
                } else {
                    data = null
                }
                if (callback && typeof callback === 'function') {
                    callback(null, data)
                }
                return data
            });
        }

        /* 保存数据 */
        _prototype.savedb = function (dbpath, dbName, tbName, readata, callback) {
            if (!readata) { return false };
            fs.readFile(path.join(dbpath), 'utf-8', (err, res) => {
                let data;
                if (res) {
                    res = JSON.parse(res);
                    for (var k in res) {
                        if (k === dbName) {
                            res[k][tbName] = readata;
                        }
                    }
                    fs.writeFile(path.join(dbpath), JSON.stringify(res, null, "\t"), (err) => {
                        if (!err) {
                            if (callback && typeof callback === 'function') {
                                callback(null)
                            }
                        }
                    });
                } else {
                }
            });

        }
        /* 增加 */
        _prototype.addStu = function (dbpath, dbName, tbName, options, callback) {
            this.fsdb(dbpath, dbName, tbName, (err, data) => {
                let item = {};
                if (!data || err) { return false };
                item.id = data.length + 1;
                if (options && JSON.stringify(options) !== '{}') {
                    for (var k in options) {
                        if (typeof options[k] === 'object') {
                            item[k] = JSON.parse(JSON.stringify(options[k]))
                        } else {
                            item[k] = options[k];
                        }
                    }
                }
                data.push(item);
                this.savedb(dbpath, dbName, tbName, data, (err, sucess) => {
                    if (callback && typeof callback === 'function') {
                        callback(null, { sucess: true })
                    }
                })

            });

        }
        /* 删除 */
        _prototype.delstu = function (dbpath, dbName, tbName, options, callback) {
            this.fsdb(dbpath, dbName, tbName, (err, data) => {
                if (!data || err || !options.id) { return false };
                console.log(options.id)
                console.log(data)
                console.log(data.findIndex(item => item.id === options.id))
                if ((data.findIndex(item => item.id === options.id))>=0){
                    data.splice(data.findIndex(item => item.id === options.id), 1);
                }
                this.savedb(dbpath, dbName, tbName, data, (err, sucess) => {
                    if (callback && typeof callback === 'function') {
                        callback(null, { sucess: true })
                    }
                })
            });
        }


        /* 修改 */
        _prototype.updatestu = function (dbpath, dbName, tbName, options, callback) {
            this.fsdb(dbpath, dbName, tbName, (err, data) => {
                if (!data || err || !options.id) { return false };
                data.forEach((item,index) => {
                    if (item.id === options.id) {
                        data[index] = options
                    }
                });
                this.savedb(dbpath, dbName, tbName, data, (err, sucess) => {
                    if (callback && typeof callback === 'function') {
                        callback(null, { sucess: true })
                    }
                })
            });
        }

        /* 查 */
        _prototype.findstu = function (dbpath, dbName, tbName, options, callback) {
            this.fsdb(dbpath, dbName, tbName, (err, data) => {
                if (!data || err || !options.id) { return false };
                    if (callback && typeof callback === 'function') {
                        callback(null,data.find((item,index) => {
                            return (item.id === options.id) 
                        }))
                    }
            });
        }

        /* 深拷贝对象 */
        _prototype.declone = function (o, f) {
            if (!(o instanceof Object)) { return {} };
            var obj = {};
            for (var k in o) {
                if (o[k] instanceof Object) {
                    obj[k] = this.declone(o[k])
                } else {
                    obj[k] = o[k]
                }
            }
            return obj;
        };
        return dbcontroller;
    })();




module.exports = dbcontroller;



















