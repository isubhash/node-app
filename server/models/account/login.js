'use strict';

var db = require('../../../config/database.config');

// Schemas of user table
const User = db.connect.define('user', {
    userId: 
    {
       field: 'user_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
    employeeId:
    {
       field: 'employee_id',
       type: db.Seq.INTEGER,
       allowNull: false
    },
    username:
    {
      field: 'user_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    password:
    {
      field: 'user_password',
       type: db.Seq.STRING,
       allowNull: false
    },
    firstName:
    {
      field: 'first_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    middleName:
    {
      field: 'middle_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    lastName:
    {
      field: 'last_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    email:
    {
      field: 'primary_email',
       type: db.Seq.STRING,
       allowNull: false
    },
    roleId:
    {
      field: 'role_id',
       type: db.Seq.STRING,
       allowNull: false
    },
    status:
    {
       type: db.Seq.BOOLEAN,
       allowNull: false
    }
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'user'
});

// To login
var login = function login(username, password, callback)
{
  User.findAndCountAll({ where : { user_name : username, user_password: password } }).then(function(result) {
    return callback(null, result);
    // if(result.count>0){
    //   return callback(null, result.rows);
    // }else{
    //   return callback(null, result.count);
    // }
});
}

exports.login = login;