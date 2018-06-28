//db coonection
var db = require('../../../config/database.config');
//schema email
var PhoneNumber=db.connect.define('phone_number', {
	id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    type:{
       field: 'type',
       type: db.Seq.STRING,
       allowNull: false
    },
    phoneNo:{
       field: 'phone_number',
       type: db.Seq.STRING,
       allowNull: false
    } ,
    status:{
       field: 'status',
       type: db.Seq.BOOLEAN,
       allowNull: false
        },
     addedByUserId:{
          field: 'added_by_user_id',
       type: db.Seq.INTEGER,
       allowNull: true
     },
     updatedByUserId:{
          field: 'updated_by_user_id',
       type: db.Seq.INTEGER,
       allowNull: true
        }
      ,
  dateAdded:{
          field: 'date_added',
       type: db.Seq.DATE,
       allowNull: true
        }
      ,
     dateUpdated:{
          field: 'date_updated',
       type: db.Seq.DATE,
       allowNull: true
        } 
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'phone_number'
});

//save method
var savePhoneNumbers = function savePhoneNumbers (phoneNumberData, callback)
{
   PhoneNumber.build({
    type:phoneNumberData.type,
    phoneNo:phoneNumberData.phoneNumber,
    status:true,
    dateAdded:new Date()
      }).save().then(function(result) {
         return callback(null,result.id);
      });
  }

//update method
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  PhoneNumber.update({
    addedByUserId:userId,
    dateUpdated:new Date()
  },
  { 
    fields: ['addedByUserId','dateUpdated'],
    where: {id: recordID}
  }).then(function(result) {
         return callback(null,result);
  });
}

//update phone number
var updatePhoneNumbers = function updatePhoneNumbers (phoneNumberData,updatedBy, callback)
{
   PhoneNumber.update({
    type:phoneNumberData.type,
    phoneNo:phoneNumberData.phoneNumber,
    updatedByUserId:updatedBy,
    dateUpdated:new Date()
      },
  { 
    fields: ['type','phoneNo','updatedByUserId','dateUpdated'],
    where: {id: phoneNumberData.phoneNumberId}
  }).then(function(result) {
         return callback(null,result);
      });
  }

//Export methods
exports.savePhoneNumbers = savePhoneNumbers;
exports.updateRecordStatus = updateRecordStatus;
exports.updatePhoneNumbers =updatePhoneNumbers;