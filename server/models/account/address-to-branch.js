//db coonection
var db = require('../../../config/database.config');
//schema email
var AddressToBranch=db.connect.define('address_to_branch', {
	id:{
    field: 'address_id',
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
  tableName: 'address_to_branch'
});
//Save data
var saveAddressToBranch = function saveAddressToBranch (addressId,branchId, callback)
{
  var rowCount=0;
 AddressToBranch.build({
        id:addressId,
        branchId: branchId
      }).save().then(function(result) {
     return callback(null,result);
      });
}


//Export methods
exports.saveAddressToBranch = saveAddressToBranch;

//Export schema
exports.AddressToBranch=AddressToBranch;
