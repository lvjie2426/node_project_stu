const fs = require ('fs'),
    path = require('path'),
    database = require('./database/students.json'),
dbcontroller = (function(){
    function dbcontroller () {};
    let _prototype = dbcontroller.prototype,
        thos      =  this;
        _prototype.fsdb = function (dbpath,dbName,tbName,callback) {
            fs.readFile(path.join(dbpath),'utf-8',(err,res)=>{
                let data;
                if(res){
                    res = JSON.parse(res);
                    for(var k in res ){
                        if(k === dbName) {
                            data =  res[k][tbName]
                       }
                    }
                }else{
                    data = null
                }
                if (callback && typeof callback === 'function'){
                    callback(null,data)
                }
                return data
            });
        }

        _prototype.savedb = function (dbpath,dbName,tbName,readata,callback) {
            if (!readata){return false};
            fs.readFile(path.join(dbpath),'utf-8',(err,res)=>{
                let data;
                if(res){
                    res = JSON.parse(res);
                    for(var k in res ){
                        if(k === dbName) {
                             res[k][tbName] = readata;
                       }
                    } 
                    fs.writeFile(path.join(dbpath),JSON.stringify(res,null,"\t"),(err)=>{
                        if(!err){
                            if (callback && typeof callback === 'function'){
                                callback(null)
                            }
                        }
                    });
                }else{
                   
                }

               
            });
            
            
        }

        _prototype.addStu = function(dbpath,dbName,tbName,options,callback) {
           this.fsdb(dbpath,dbName,tbName,(err,data)=>{
            let item = {};
            if (!data || err) {return false};
            item.id = data.length+1;
            if (options && JSON.stringify(options) !== '{}') {
                for(var k in options ){
                    if( typeof options[k] === 'object'){
                        item[k] = JSON.parse(JSON.stringify(options[k])) 
                    }else{
                        item[k] = options[k];
                    }
                }
            }
            data.push(item);
            this.savedb(dbpath,dbName,tbName,data,(err,sucess)=>{
                if (callback && typeof callback === 'function'){
                    callback(null,{sucess:true})
                }
            })
            
            });
           
        }

    _prototype.defind = function (o,f) {
        var obj = {};
        o.forEach((item,index)=>{
            if(index === f){
               obj = f;
            }else if ( typeof (index) === 'object' && JSON.stringify(index) !== '{}'  ) {
               return this.defind(index,f);
            }else{

            }
            return obj
        })
    };
    return dbcontroller;
})();




module.exports = dbcontroller;




