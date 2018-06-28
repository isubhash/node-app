//db coonection
var db = require('../../../config/database.config');
//schema email
var PhoneNumberToUser=db.connect.define('phone_number_to_user', {
	id:{
    field: 'phone_number_id',
       type: db.Seq.INTEGER,
       allowNull: false,
        primaryKey: true
  	},
    userId:{
       field: 'users_user_id',
       type: db.Seq.INTEGER,
       allowNull: false,
        primaryKey: true
    }  
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'phone_number_to_user'
});

//Save data
var savePhoneNumbersToUser = function savePhoneNumbersToUser (phoneNumberId,userId, callback)
{
  //var rowCount=0;
  
  PhoneNumberToUser.build({
        id:phoneNumberId,
        userId: userId
      }).save().then(function(result) {
          return callback(null,result);
      });


}

//Export methods
exports.savePhoneNumbersToUser = savePhoneNumbersToUser;