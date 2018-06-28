//db coonection
var db = require('../../../config/database.config');
//schema email
var EmailToBranch=db.connect.define('email_to_branch', {
	id:{
    field: 'email_id',
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
  tableName: 'email_to_branch'
});

//Save data
var saveEmailToBranch = function saveEmailToBranch (emailId,branchId, callback)
{
  var rowCount=0;
 
  EmailToBranch.build({
        id:emailId,
        branchId: branchId
      }).save().then(function(result) {
          return callback(null,result);
      });


}

//Export methods
exports.saveEmailToBranch = saveEmailToBranch;