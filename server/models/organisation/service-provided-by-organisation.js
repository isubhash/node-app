//db coonection
var db = require('../../../config/database.config');
//schema service Provided By Organisation
var serviceProvidedByOrganisation=db.connect.define('service_provided_by_organisation', {
	id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	}
    ,
     organisationId:{
          field: 'organisation_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
     serviceId:{
          field: 'service_id',
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
  tableName: 'service_provided_by_organisation'
});

//Get service schema
var ServiceModel= require('../service/service');
//Save data
var saveOrganisationService = function saveOrganisationService (organisationId,serviceId, callback)
{
  serviceProvidedByOrganisation.build({
        organisationId:organisationId ,
        serviceId: serviceId,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
      return callback(null,result.id);
      });
}

//update method
var updateRecordStatus = function updateRecordStatus(recordID,userId,callback)
{
  serviceProvidedByOrganisation.update({
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

serviceProvidedByOrganisation.hasMany(ServiceModel.Service,{foreignKey:'service_id'});
ServiceModel.Service.belongsTo(serviceProvidedByOrganisation,{foreignKey:'service_id'});

var get_services_provided_by_org= function (orgId,callback){

  serviceProvidedByOrganisation.find({where : { organisationId : orgId },
      include: [
      
      ServiceModel.Service
        ]
      
    }).then(function (result){
      callback(null,result);
    });
}

//Export methods
exports.saveOrganisationService = saveOrganisationService;
exports.updateRecordStatus = updateRecordStatus;
exports.get_services_provided_by_org = get_services_provided_by_org;