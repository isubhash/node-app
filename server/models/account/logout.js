'use strict';

var db = require('../../../config/database.config');

// Schemas of invalid_token table
const InvalidToken = db.connect.define('invalid_token', {
    id: 
    {
       field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
    accessToken:
    {
      field: 'access_token',
       type: db.Seq.STRING,
       allowNull: false
    },
    dateAdded:
    {
      field: 'date_added',
       type: db.Seq.DATE,
       allowNull: false
    }
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'invalid_token'
});

// To logout
var logout = function logout(accessToken, callback)
{
  InvalidToken.build({ accessToken: accessToken, dateAdded: Date.now() })
  .save()
  .then(function(result) {
    return callback(null, 1);
  }).catch(function(error) {
    return callback(null, 0);
  })
  
}

var is_logged_out = function is_logged_out(accessToken, callback)
{
  InvalidToken.findAndCountAll({ where : { accessToken : accessToken } }).then(function(result) {
      return callback(null, result.count);
});
}

exports.logout = logout;
exports.isLoggedOut = is_logged_out;