const mongoose = require('mongoose'),
    Schema = mongoose.Schema;// 编码对象
// 链接数据库
mongoose.connect('mongodb://localhost/test');

// 约定规范 即插入集合的每个对象 数据结构
// const studentSchema = new Schema({
//     id: Number,// 
//     name: String,
//     age: Number,
//     sex: Number,
//     favorite: String,
//     job: String,
//     ctime: Date
// });
// var students = mongoose.model('students', studentSchema);

const schemas = new mongoose.Schema({ id: 'Number', name: 'string',age:'Number',sex:'Number',favorite:'string',job:'string',ctime:'Date'});

// 数据库       相当db
// 集合         相当 students [] 数组
// 一条数据     相当 students 里的一个对象 {}
// 数据库 相当db
// var db = {
//     "students": [
//         {
//             "id": 1,
//             "name": "张三",
//             "age": 25,
//             "sex": 1,
//             "favorite": "football11",
//             "job": "writer",
//             "ctime": "2020年7月05日 1:54:52"
//         }],
//     "fruits": [
//         {
//             "name": "苹果",
//             "price": 500,
//             "color": "yellow"
//         }
//     ]
// }




module.exports = schemas;