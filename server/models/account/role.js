//db coonection
var db = require('../../../config/database.config');
//schema for role 
var Role=db.connect.define('role', {
	id:{
    field: 'role_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    roleName:{
       field: 'role_name',
       type: db.Seq.STRING,
       allowNull: false,
       primaryKey: false
    }
    ,
    organisationId:{
       field: 'organisation_id',
       type: db.Seq.INTEGER,
       allowNull: false,
       primaryKey: false
    }
    ,
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
},{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'role'
});

//Get role list by organisationId
var get_roles = function (orgId,callback){

Role.findAll({ where : { organisationId : orgId } }).then(function(result) {
    return callback(null, result);
});
}

var addRole = function addRole(roleName, organisationId, status, userId, callback){
  console.log('roleName:'+roleName);
  console.log('organisationId:'+organisationId);
  console.log('status:'+status);
  console.log('userId:'+userId);
  Role.build({
    roleName:roleName,
    organisationId:organisationId,
    status:status,
    addedByUserId:userId,
    dateUpdated:new Date()
      }).save().then(function(result) {
        console.log(result);
         return callback(null, result);
       });
}

var updateRole = function updateRole(roleId, roleName, organisationId, status, userId, callback){
  Role.update({
    roleId:roleId,
    roleName:roleName,
    organisationId:organisationId,
    status:status,
    updatedByUserId:userId,
    dateUpdated:new Date()
  },
  {
    fields: ['roleName','organisationId','status','updatedByUserId','dateUpdated'],
    where: {id: roleId}
  }).then(function(result) {
         return callback(null,result);
  });
}

//Export methods
exports.get_roles = get_roles;
exports.addRole = addRole;
exports.updateRole = updateRole;
exports.Role = Role;