//db coonection
var db = require('../../../config/database.config');

//schema email
var Email=db.connect.define('email', {
	id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    email:{
       field: 'email',
       type: db.Seq.STRING,
       allowNull: false
    } ,
    type:{
       field: 'type',
       type: db.Seq.STRING,
       allowNull: false
    },
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
  tableName: 'email'
});
//var emailIds=[];
//save method
var saveEmails = function saveEmails (emailData, callback)
{
  
  Email.build({
    email:emailData.email,
    type:emailData.type,
    status:true,
    dateAdded:new Date()
      }).save().then(function(result) {
        console.log(result.id);
        // emailIds.push(result.id);
        return  callback(null, result.id);

       });
     
//return callback(null,emailIds);
}

//update status
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  Email.update({
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

//update email
var updateEmail = function updateEmail(data,updatedBy,callback)
{
  Email.update({
    email:data.email,
    type:data.type,
    updatedByUserId:updatedBy,
    dateUpdated:new Date()
  },
  { 
    fields: ['email','type','updatedByUserId','dateUpdated'],
    where: {id: data.emailId}
  }).then(function(result) {
         return callback(null,result);
  });
}
//Export methods
exports.updateRecordStatus=updateRecordStatus;
exports.saveEmails = saveEmails;
exports.updateEmail = updateEmail;