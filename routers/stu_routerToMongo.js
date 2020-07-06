const express = require('express'),
    router = express.Router(),
    path = require('path'),
    mongoose = require('mongoose'),
    // stuSchemas = require('../schemas/contorllerdb');
    schemas = require('../schemas/contorllerdb'),
    // return console.log(stuSchemas)
    Sca = mongoose.model('student', schemas);


var stuData = {
    msg: {
        title: '学生信息管理'
    },
    stu: [],
}

router.get('/', (req, res) => {
    if (res) {
        Sca.find((err, data) => {
            if (data) {
                stuData.stu = data;
                stuData['stu'] = data;
                res.render('index.html', stuData);
            }
        })

    }
});




// for (var i = 0; i < 10; i++) {
//     sc = new Sca({
//         id: i,
//         name: "张"+i,
//         age: i,
//         sex: i%2===0 ?1:0,
//         favorite: "football11",
//         job: "writer",
//         ctime:0
//     });
//     sc.save((err, res) => {
//         if (res) {
//             console.log(JSON.stringify(res))
//         }
//     });
// }


// Sca.find((err,res)=>{
//     console.log(res)
//     console.log(1)
// });
// Sca.remove((err,res)=>{
//     console.log(res.length)
//     console.log(2)
// });

module.exports = router;


