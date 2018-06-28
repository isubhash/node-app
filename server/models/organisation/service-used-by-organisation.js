//db coonection
var db = require('../../../config/database.config');

//Get service schema
var ServiceModel= require('../service/service');
//schema email

var serviceUsedByOrganisation=db.connect.define('service_used_by_organization', {
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
tableName: 'service_used_by_organisation'
});

serviceUsedByOrganisation.hasMany(ServiceModel.Service,{foreignKey:'service_id'});
ServiceModel.Service.belongsTo(serviceUsedByOrganisation,{foreignKey:'service_id'});

var get_services_used_by_org= function (orgId,callback){

  serviceUsedByOrganisation.find({where : { organisationId : orgId },
      include: [
      
      ServiceModel.Service
        ]
      
    }).then(function (result){
      callback(null,result);
    });
}

// add service used by organisation
var add_service_used_by_org = function (data,addedByUserId,callback) {
  serviceUsedByOrganisation.build({
    organisationId:data.organisation.organisationId,
    serviceId:data.service.serviceId,
    addedByUserId:addedByUserId,
    status:true,
    dateAdded:new Date()
  }).save().then(function(result) {
        return  callback(null, result.id);
    });
}

//find service used by organisation
var find_serive__used_by_org = function (data,callback)
{
 serviceUsedByOrganisation.findAll({
  where : {
  organisationId : data.organisation.organisationId,
  serviceId:data.service.serviceId
   } 
 }).then(function(result) {
 callback(null,result);  
});


}
//Update service used by organisation
var update_service_used_by_org =function(data,updatedByUserId,callback) {
serviceUsedByOrganisation.update({
    status:data.recordStatus.status,
    updatedByUserId:updatedByUserId,
    dateUpdated:new Date()
  },
  { 
    fields: ['status','updatedByUserId','dateUpdated'],
    where: {
     organisationId : data.organisation.organisationId,
     serviceId:data.service.serviceId
   }
  }).then(function(result) {
         return callback(null,result);
  });
}

exports.add_service_used_by_org=add_service_used_by_org;
exports.find_serive__used_by_org=find_serive__used_by_org;
exports.update_service_used_by_org=update_service_used_by_org;
exports.get_services_used_by_org = get_services_used_by_org;
