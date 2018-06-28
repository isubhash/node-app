//db coonection
var db = require('../../../config/database.config');
//schema email
var phoneToBranch=db.connect.define('phone_to_branch', {
	id:{
    field: 'phone_number_id',
       type: db.Seq.INTEGER,
       allowNull: false,
        primaryKey: true
  	},
    branchId:{
       field: 'branch_id',
       type: db.Seq.INTEGER,
       allowNull: false,
        primaryKey: true
    }  
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'phone_to_branch'
});
//Save data
var savePhoneNumbersToBranch = function savePhoneNumbersToBranch (phoneNumberId,branchId, callback)
{
 phoneToBranch.build({
        id:phoneNumberId ,
        branchId: branchId
      }).save().then(function(result) {
          return callback(result);
      });
}


//Export methods
exports.savePhoneNumbersToBranch = savePhoneNumbersToBranch;