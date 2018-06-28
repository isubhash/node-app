//db coonection
var db = require('../../../config/database.config');
//schema email
var AddressToUser=db.connect.define('address_to_user', {
	id:{
    field: 'address_id',
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
  tableName: 'address_to_user'
});
//Save data
//Save data
var saveAddressToUser = function saveAddressToUser (addressId,userId, callback)
{
    AddressToUser.build({
        id:addressId ,
        userId: userId
      }).save().then(function(result) {
        return callback(null,result);
      });
}

//Export methods
exports.saveAddressToUser = saveAddressToUser;