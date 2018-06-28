'use strict';

var db = require('../../../config/database.config');
var OrganisationModel = require('../organisation/organisation');
var BranchModel = require('../organisation/branch');
var RoleModel = require('../account/role');
var ServiceModel = require('../service/service');

var Address = require('./address');
var Email = require('./email');
var PhoneNumber = require('./phone-number');
var EmailToUser = require('./email-to-user');
var EmailToBranch = require('./email-to-branch');
var PhnNumToUser = require('./phone-number-to-user');
var PhnNumToBranch = require('../organisation/phone-to-branch');
var AddressToUser = require('./address-to-user');

var Sequelize = require('../../../node_modules/sequelize');
var async = require('async');
var Boom=require('boom');

function sendResponse(msg, code, request, reply, result) {
  return reply({
    "status": {
      "statusCode": code,
      "message": msg
    },
    "data": result
  });
}

// Schemas of user table
const User = db.connect.define('user', {
  userId: {
    field: 'user_id',
    type: db.Seq.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  employeeId: {
    field: 'employee_id',
    type: db.Seq.INTEGER,
    allowNull: false
  },
  username: {
    field: 'user_name',
    type: db.Seq.STRING,
    allowNull: false
  },
  roleId: {
    field: 'role_id',
    type: db.Seq.STRING,
    allowNull: false
  },
  userPassword: {
    field: 'user_password',
    type: db.Seq.STRING,
    allowNull: false
  },
 salutation:{
      field: 'salutation',
      type: db.Seq.STRING,
      allowNull: false
    },
    firstName:{
      field: 'first_name',
      type: db.Seq.STRING,
      allowNull: false
    },
    middleName:{
      field: 'middle_name',
      type: db.Seq.STRING,
      allowNull: false
    },
    lastName:{
      field: 'last_name',
      type: db.Seq.STRING,
      allowNull: false
    },
    organisationId:{
      field: 'organisation_id',
      type: db.Seq.INTEGER,
      allowNull: false
    },
    branchId:{
      field: 'branch_id',
      type: db.Seq.INTEGER,
      allowNull: false
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
      type: db.Seq.STRING,
      allowNull: false
    },
    status:{
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
  tableName: 'user'
});

var _org = OrganisationModel.Organisation;
//Relations
OrganisationModel.Organisation.hasMany(User, {
  foreignKey: 'organisation_id'
});
User.belongsTo(OrganisationModel.Organisation, {
  foreignKey: 'organisation_id'
});

RoleModel.Role.belongsTo(User, {
  foreignKey: 'role_id'
});
User.hasMany(RoleModel.Role, {
  foreignKey: 'role_id'
});


OrganisationModel.Organisation.hasMany(BranchModel.OrganisationBranch, {
  foreignKey: 'organisation_id'
});
BranchModel.OrganisationBranch.belongsTo(OrganisationModel.Organisation, {
  foreignKey: 'organisation_id'
});

//Save
var saveUser = function saveUser(data, organisationId, branchId, addressId, callback) {
  //var rowCount=0;
  var _phnNumber = data.phoneNumbers[0].phoneNumber;
  var _email = data.emails[0].email;
  User.build({
        employeeId:data.employeeId,
        username:data.username,
        roleId:data.roleId,
        userPassword:data.password,
        salutation:data.salutation,
        firstName:data.firstName,
        middleName:data.middleName,
        lastName:data.lastName,
        organisationId:organisationId ,
        branchId: branchId,
        primaryPhoneNumber:_phnNumber,
        primaryEmail:_email,
        primaryAddressId:addressId,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
        return callback(null,result.userId);
      });
}

//update method
var updateRecordStatus = function updateRecordStatus(recordId, userId, callback) {
  User.update({
    addedByUserId: userId,
    dateUpdated: new Date()
  }, {
    fields: ['addedByUserId', 'dateUpdated'],
    where: {
      userId: recordId
    }
  }).then(function(result) {
    return callback(null, result);
  });
}

//Get users
var getUsers = function getUsers(data, callback) {

  var _searchedKey = '%' + data.searchKeyword + '%';
  //console.log(typeof(data.searchKeyword));
  User.findAll({
    where: {
      $or: [

        {
          username: {
            $like: _searchedKey
          }
        }, {
          firstName: {
            $like: _searchedKey
          }
        }, {
          lastName: {
            $like: _searchedKey
          }
        }
      ]
    },
    include: [{
      // model: BranchModel.OrganisationBranch,
      model: OrganisationModel.Organisation,
      include: [{
        //model: OrganisationModel.Organisation
        model: BranchModel.OrganisationBranch
      }]
    }, {
      model: RoleModel.Role
    }],
    limit: data.limit,
    offset: data.offset
  }).then(function(result) {
    callback(null, result);
  });
}

//Get profile
var getProfile = function getProfile(data, callback) {

  //var _searchedKey = '%' + data.searchKeyword + '%';
  //console.log(typeof(data.searchKeyword));
  User.findAll({
    where: {
      userId: data.userInfo.userId
    },
    include: [{
      // model: BranchModel.OrganisationBranch,
      model: OrganisationModel.Organisation,
      include: [{
        //model: OrganisationModel.Organisation
        model: BranchModel.OrganisationBranch
      }]
    }, {
      model: RoleModel.Role
    }]
  }).then(function(result) {
    callback(null, result);
  });
}

//Update user
var updateUserInternal = function(data, organisationId, branchId, updatedBy, callback) {
  var _phnNumber = data.phoneNumbers[0].phoneNumber;
  var _email = data.emails[0].email;
  User.update({
    employeeId: data.employeeId,
    username: data.username,
    roleId: data.roleId,
    userPassword: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    organisationId: organisationId,
    branchId: branchId,
    primaryPhoneNumber: _phnNumber,
    primaryEmail: _email,
    primaryAddressId: data.address[0].addressId,
    updatedByUserId: updatedBy,
    status:data.recordStatus.status,
    dateUpdated: new Date()
  }, {
    fields: ['employeeId', 'username', 'roleId', 'userPassword', 'firstName', 'lastName', 'organisationId', 'branchId', 'primaryPhoneNumber', 'primaryEmail', 'primaryAddressId', 'updatedByUserId','status', 'dateUpdated'],
    where: {
      userId: data.userId
    }
  }).then(function(result) {
    return callback(null, result);
  });
}

//Update profile
var updateProfile = function(data,_updatedby, reply) {
  // return Sequelize.prototype.transaction({type: 'EXCLUSIVE'}, function(t) {
  //var _updatedby = 1; //userId to be changed
  //transactions
  // metadatafile.saveMetadata(data.metadata); //saving meta data
   async.series([
    function updateUserAddress(callback) {
      for (var index = 0; index < data.userInfo.address.length; index++) {
        var newAddressId;
        if (data.userInfo.address[index].addressId > 0) {
          Address.updateAddress(data.userInfo.address[index], _updatedby, function(err, result) {
            console.log("_addressIdUser " + result);
          });
        } else {
          Address.saveAddress(data.userInfo.address[index], function(err, result) {
            AddressToUser.saveAddressToUser(result, data.userInfo.userId, function(err, result) {
              console.log("saveAddressToUser");
             });
          });
        }
      }
      callback(null, null);
    },
    function updateUserEmail(callback) {
      for (var index = 0; index < data.userInfo.emails.length; index++) {
        if (data.userInfo.emails[index].emailId > 0) {
          Email.updateEmail(data.userInfo.emails[index], _updatedby, function(err, result) {
           console.log("_userEmailId " + result);
          });
        } else {
          Email.saveEmails(data.userInfo.emails[index], function(err, result) {
            EmailToUser.saveEmailToUser(result, data.userInfo.userId, function(err, result) {
              console.log("saveEmailToUser");
            });
          });
        }
      }
      callback(null, null);
    },
    function updateUserPhone(callback) {
      for (var index = 0; index < data.userInfo.phoneNumbers.length; index++) {
        if (data.userInfo.phoneNumbers[index].phoneNumberId > 0) {
          PhoneNumber.updatePhoneNumbers(data.userInfo.phoneNumbers[index], _updatedby, function(err, result) {
            console.log("_phnToUser" + result);
            // callback(null, result);
          });
        } else {
          PhoneNumber.savePhoneNumbers(data.userInfo.phoneNumbers[index], function(err, result) {
            PhnNumToUser.savePhoneNumbersToUser(result, data.userInfo.userId, function(err, result) {
              console.log("savePhoneToUser");
            });
          });
        }
      }
      callback(null, null);
    },
    function updateUserInfo(callback) {
      updateUserInternal(data.userInfo, data.organisation.organisationId, data.organisationBranches[0].branchId, _updatedby, function(err, result) {
        console.log("_updateUser" + result)
        callback(null, result);
      });
    }
  ], function(err, result) {
    if (err) {
      console.log(err);
    sendResponse("data did't update.", 0, data, reply, err);
    }
    sendResponse("data has been updated.", 200, data, reply, result[0]);
  });

  // }).then(function(result) {
  //   // transaction has been committed.
  //   sendResponse("data has been updated.", 200, request, reply, result[0]);

  // }).catch(function(err) {
  //   Boom.expectationFailed('expected this to work');
  // });

}
var getUserIdByEmail = function getUserIdByEmail(email,callback){
  User.findOne({ where : { primaryEmail : email } }).then(function(result) {
    return callback(null, result.userId);
  });
}

//Export methods
exports.saveUser = saveUser;
exports.updateRecordStatus = updateRecordStatus;
exports.getUsers = getUsers;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.getUserIdByEmail = getUserIdByEmail;
//Export schema
exports.User = User;
