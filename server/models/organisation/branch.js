//db coonection
var db = require('../../../config/database.config');
//schema branch
var OrganisationBranch=db.connect.define('organisation_branch', {
	branchId:{
       field: 'branch_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    organisationId:{
       field: 'organisation_id',
       type: db.Seq.INTEGER,
       allowNull: false
    },
    branchName:{
       field: 'branch_name',
       type: db.Seq.STRING,
       allowNull: true
    },
    primaryPhoneNumber:{
      field: 'primary_phone_number',
      type: db.Seq.STRING,
      allowNull: false
    },
    primaryEmail:{
      field: 'primary_email',
      type: db.Seq.STRING,
      allowNull: false
    },
    primaryAddressId:{
      field: 'primary_address_id',
      type: db.Seq.INTEGER,
      allowNull: false
    },
    status:{
        field: 'status',
        type: db.Seq.STRING,
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
    },
	  dateAdded:{
        field: 'date_added',
        type: db.Seq.DATE,
        allowNull: true
    },
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
  tableName: 'organisation_branch'
});

//Save
var saveOrganisationBranch = function saveOrganisationBranch (data,organisationId,addressId, callback)
{
 // var rowCount=0;
 console.log("saveOrganisationBranch "+organisationId);
  var _phnNumber=data.phoneNumbers[0].phoneNumber;
  var _email=data.emails[0].email;
  OrganisationBranch.build({
        organisationId:organisationId ,
        branchName: data.branchName,
        primaryPhoneNumber:_phnNumber,
        primaryEmail:_email,
        primaryAddressId:addressId,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
       return callback(null,result.branchId);
      });
}

//update method
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  OrganisationBranch.update({
    addedByUserId:userId,
    dateUpdated:new Date()
  },
  { 
    fields: ['addedByUserId','dateUpdated'],
    where: {branchId: recordID}
  }).then(function(result) {
         return callback(null,result);
  });
}

//Export methods
exports.saveOrganisationBranch = saveOrganisationBranch;
exports.updateRecordStatus = updateRecordStatus;
exports.OrganisationBranch=OrganisationBranch