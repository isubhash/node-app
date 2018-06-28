'use strict';

// Load modules
var async   = require('async');
var metadatafile = require('../../models/common/metadata');
var registrationModel = require('../../models/account/registration'); 
var userModel= require('../../models/account/user'); 
var roleModel= require('../../models/account/role'); 
var organisationModel= require('../../models/organisation/organisation'); 


/**
 * self registration by vendor
 *
 * @Date: 22 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function sendResponse(msg, code, request, reply, result) {
  return reply({
    "status": {
      "statusCode": code,
      "message": msg
    },
    "data": result
  });
}


/**
 * To register an user by admin/super admin
 *
 * @Date: 3 January 2017
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function registration(request, reply) {
  //metadatafile.saveMetadata(request.payload.metadata)
  async.waterfall([
  function(callback){
      userModel.getUserIdByEmail(request.auth.credentials.email, function(err, res) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, res);
      });
  },
  function(userId, callback){
    if(request.payload.actionId){
      
      async.waterfall([
        function(callback){
            organisationModel.isRegistratioinIdAvailable(request.payload.organisation.registrationId, function(err, res) {
                if (err) {
                  callback(err, null);
                  return;
                }
                callback(null, res);
            });
        },
        function(registrationPossibleFlag, callback){
          if(registrationPossibleFlag){
           registrationModel.registration_save(userId, request.payload, function(err, res) {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, 1);
            });
         }else{
          console.log('registration id already exist!');
          callback(null, 0);
         }
        }
      ], function (err, result) {
            callback(null, result);
      });
      
     
    }else{
      registrationModel.add_user(userId, request.payload, function(err, res) {
          if (err) {
            callback(err, null);
            return;
          }
          callback(null, 1);
      });
    }
  }
], function (err, result) {
  (!result)?sendResponse("Registration ID already exist!", 0, request, reply, "data not saved"):sendResponse("Success", 200, request, reply, "data saved");
});

}


/**
 * To register a vendor himself/herself via app
 *
 * @Date: 
 * @Author: Akhil
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function self_registration(request, reply) {
	//call insert methods from /models/account/registration
  async.waterfall([
        function(callback){
            organisationModel.isRegistratioinIdAvailable(request.payload.organisation.registrationId, function(err, res) {
                if (err) {
                  callback(err, null);
                  return;
                }
                callback(null, res);
            });
        },
        function(registrationPossibleFlag, callback){
          if(registrationPossibleFlag){
           registrationModel.self_registration_save(request.payload, function(err, res) {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, 1);
            });
         }else{
          console.log('registration id already exist!');
          callback(null, 0);
         }
        }
      ], function (err, result) {
  (!result)?sendResponse("Registration ID already exist!", 0, request, reply, "data not saved"):sendResponse("Success", 200, request, reply, "data saved");
});
}

/**
 * Provides list of users according to searched keyword
 *
 * @Date: 22 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function get_users(request,reply){
 // var _metaResult= metadatafile.saveMetadata(request.payload.metadata)
if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        userModel.getUsers(request.payload, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data get successfully."
          callback(null, res);
        });
      }
    ], function(err, result) {
      if (err) {
        console.error(err);
        return;
      }
      sendResponse(_msg, 200, request, reply, result[0]);
    });
  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  }
}

/**
 * To add a new role of an organisation or to update an existing one
 *
 * @Date: 3 January 2017
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function add_update_role(request, reply){

  //metadatafile.saveMetadata(request.payload.metadata)
  async.waterfall([
        function(callback){
          userModel.getUserIdByEmail(request.auth.credentials.email, function(err, res) {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, res);
          });
      },
        function getData(userId, callback) {
            if(request.payload.actionId){
              roleModel.addRole(request.payload.role.roleName, request.payload.organisationId, request.payload.role.status, userId, function(err, res) {
                  if (err) {
                        callback(err, null);
                        return;
                  }
                  callback(null, res);
              });
            }else{
              roleModel.updateRole(request.payload.role.roleId, request.payload.role.roleName, request.payload.organisationId, request.payload.role.status, userId, function(err, res) {
                  if (err) {
                        callback(err, null);
                        return;
                  }
                  callback(null, res);
              });
            }
        }
  ], function(err, result) {
        if (err) {
              console.error(err);
              return;
        }
        (result)?sendResponse("Success", 200, request, reply, ""):sendResponse("Failed!", 0, request, reply, "");
  });
}

/**
 * Provides user profile
 *
 * @Date: 26 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function get_profile(request,reply){
 // var _metaResult= metadatafile.saveMetadata(request.payload.metadata)
if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        userModel.getProfile(request.payload, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data get successfully."
          callback(null, res);
        });
      }
    ], function(err, result) {
      if (err) {
        console.error(err);
        return;
      }
      sendResponse(_msg, 200, request, reply, result[0]);
    });
  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  }
}

/**
 * Update user profile
 *
 * @Date: 27 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function update_user_profile(request,reply)
{
  
  console.log("userhandler");
if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
   async.waterfall([
        function(callback){
          userModel.getUserIdByEmail(request.auth.credentials.email, function(err, res) {
              if (err) {
                callback(err, null);
                return;
              }
              callback(null, res);
          });
      },
      function getData(userId,callback) {
        userModel.updateProfile(request.payload,userId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }
          _msg = "data has been updated successfully."
          callback(null, res);
        });
        
      }
    ], function(err, result) {
      if (err) {
        console.log(err);
       // Boom.expectationFailed('expected this to work');
      }
      sendResponse(_msg, 200, request, reply, result[0]);
    });
  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  }
}

module.exports.self_registration = self_registration;
module.exports.get_users=get_users;
module.exports.get_profile= get_profile;
module.exports.update_user_profile=update_user_profile;
module.exports.add_update_role = add_update_role;
module.exports.registration=registration;