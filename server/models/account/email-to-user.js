//db coonection
var db = require('../../../config/database.config');
//schema email
var EmailToUser=db.connect.define('email_to_user', {
	id:{
    field: 'email_address_id',
       type: db.Seq.INTEGER,
       allowNull: false,
       primaryKey: true
  	},
    userId:{
       field: 'user_id',
       type: db.Seq.INTEGER,
       allowNull: false,
       primaryKey: true
    }  
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'email_to_user'
});

//Save data
var saveEmailToUser = function saveEmailToUser (emailId,userId, callback)
{
  var rowCount=0;
  
  EmailToUser.build({
        id:emailId ,
        userId: userId
      }).save().then(function(result) {
        return callback(null,result);  
      });
}

//Export methods
exports.saveEmailToUser = saveEmailToUser;