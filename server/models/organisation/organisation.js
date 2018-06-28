//db coonection
var db = require('../../../config/database.config');
//schema organisation
var Organisation=db.connect.define('organisation',
    {
	organisationId:{
       field: 'organisation_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
  registrationId:{
       field: 'registration_id',
       type: db.Seq.INTEGER,
       allowNull: false
    } ,
  organisationName:{
       field: 'organisation_name',
       type: db.Seq.STRING,
       allowNull: false
    },
  defaultCurrencyId:{
       field: 'default_currency_id',
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
  tableName: 'organisation'
});

// To fetch all organisation 
var getOrganisation = function getOrganisation(callback)
{
  Organisation.findAndCountAll({ attributes: ['organisationId', 'organisationName'] }).then(function(result) {
    //console.log(JSON.stringify(result.rows));
    return callback(null, result);
});
}

// To check the existance of registratioinId
var isRegistratioinIdAvailable = function isRegistratioinIdAvailable(registrationId, callback)
{
  Organisation.findAndCountAll({ where : { registrationId : registrationId } }).then(function(result) {
    if(result.count == 0){
      return callback(null, true);
    }else{
      return callback(null, false);
    }
  });
}

//Save
var saveOrganisation = function saveOrganisation (data, callback)
{
  //var rowCount=0;
  Organisation.build({
        registrationId:data.registrationId ,
        organisationName: data.organisationName,
        defaultCurrencyId:data.currencyId,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
        return callback(null,result.organisationId);
      });
}

//update organisation
var updateOrganisation = function updateOrganisation (data, userId, callback)
{
  Organisation.update({
    organisationId:data.orgniasastionId,
    organisationName:data.organisationName,
    registrationId:data.registrationId,
    defaultCurrencyId:data.defaultCurrencyId,
    updatedByUserId:userId,
    dateUpdated:new Date()
  },
  { 
    fields: ['organisationName','registrationId','defaultCurrencyId','updatedByUserId','dateUpdated'],
    where: {organisationId: data.organisationId}
  }).then(function(result) {
         return callback(null,result);
  });
}

//update method
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  Organisation.update({

    dateUpdated:new Date()
  },
  { 
    fields: ['addedByUserId','dateUpdated'],
    where: {organisationId: recordID}
  }).then(function(result) {
         return callback(null,result);
  });
}


//Export methods
exports.getOrganisation = getOrganisation;
exports.updateOrganisation = updateOrganisation;
exports.isRegistratioinIdAvailable = isRegistratioinIdAvailable;
exports.saveOrganisation = saveOrganisation;
exports.updateRecordStatus = updateRecordStatus;
//Export schema
exports.Organisation= Organisation;