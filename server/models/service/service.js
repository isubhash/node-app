//db coonection
var db = require('../../../config/database.config');


//schema service master
var Service = db.connect.define('servcie', {
  serviceId: {
    field: 'service_id',
    type: db.Seq.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  serviceName: {
    field: 'service_name',
    type: db.Seq.STRING,
    allowNull: false
  },
  status: {
    field: 'status',
    type: db.Seq.STRING,
    allowNull: false
  },
  addedByUserId: {
    field: 'added_by_user_id',
    type: db.Seq.INTEGER,
    allowNull: true
  },
  updatedByUserId: {
    field: 'updated_by_user_id',
    type: db.Seq.INTEGER,
    allowNull: true
  },
  dateAdded: {
    field: 'date_added',
    type: db.Seq.DATE,
    allowNull: true
  },
  dateUpdated: {
    field: 'date_updated',
    type: db.Seq.DATE,
    allowNull: true
  }
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'service_master'
});

// add service
var add_service = function (data,addedByUserId,callback) {
  Service.build({
    serviceName:data.service.name,
    addedByUserId:addedByUserId,
    status:true,
    dateAdded:new Date()
  }).save().then(function(result) {
        return  callback(null, result.id);
    });
}

//find service
var find_serive_by_name = function (data,callback)
{
 Service.findAll({ where : { serviceName : data.service.name } }).then(function(result) {
 callback(null,result);  
});


}

//Find All services
var find_all_serives = function (data,callback)
{
 Service.findAll().then(function(result) {
 callback(null,result);  
});


}


//find service by name and id
var find_serive_by_name_and_id = function find_serive_by_name_and_id(data,callback)
{
  Service.findAll({ where : { 
    serviceName : data.service.name,
    serviceId:  data.service.serviceId
    
   } }).then(function(result) {
   callback(null,result);
});


}
//Update service
var update_service =function(data,updatedByUserId,callback) {
Service.update({
    serviceName:data.service.name,
    status:data.service.recordStatus.status,
    updatedByUserId:updatedByUserId,
    dateUpdated:new Date()
  },
  { 
    fields: ['serviceName','status','updatedByUserId','dateUpdated'],
    where: {
     serviceId:data.service.serviceId
    }
  }).then(function(result) {
         return callback(null,result);
  });
}
//Export methods
exports.add_service = add_service;
exports.update_service=update_service;
exports.find_serive_by_name=find_serive_by_name;
exports.find_serive_by_name_and_id=find_serive_by_name_and_id;
exports.find_all_serives=find_all_serives;
exports.Service=Service;
