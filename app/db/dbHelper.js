var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    models = require('./models');


for (var m in models) {
    mongoose.model(m, new Schema(models[m]));
}


// var schema = new mongoose.Schema({username: 'string', userpassword: 'string', age: 'number', sex: 'string'});
//
// var Users = mongoose.model('users', schema);
//
// var userQuery = Users.find({username: "张明远"}, function (err, docs) {
//     var docsItem = docs[0];
//     console.log("user name: " + docsItem.username);
//     console.log("user age: " + docsItem.age);
//     console.log("user sex: " + docsItem.sex);
//     console.log("user id: " + docsItem.id);
// });

// Users.create({
//     username: "杨海灵",
//     userpassword: "12345",
//     age: 27,
//     sex: "w"
// }, function (err, user) {
//     if (err) return handleError(err);
//     else console.log('save user success...');
// });

// var classSchema = new mongoose.Schema({classnum: Number, gradenum: Number});
// var ClassModel = mongoose.model("class", classSchema);
// var ClassEntity = new ClassModel({
//     classnum: 1,
//     gradenum: 2
// });
// ClassEntity.save(function (err, docs) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(docs);
//     }
// });

var _getModel = function (type) {
    return mongoose.model(type);
};

module.exports = {
    getModel: function (type) {
        return _getModel(type);
    }
};