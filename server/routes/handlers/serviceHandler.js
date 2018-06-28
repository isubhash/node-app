'use strict';

/**
 * Contains all action methods related to service master
 *
 **/

//Load models
var metadatafile = require('../../models/common/metadata');
var serviceModel = require('../../models/service/service');
var userModel= require('../../models/account/user'); 
var async = require('async');

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
 * Add or update service by using action type(add/update)
 *
 * @Date: 29 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/

function addOrUpdateService(request, reply) {
 // var _addUpdateUserId = 1; //get from token
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
      }], function(err, result) {
        if (err) {
        sendResponse("something wrong.",0,request, reply, err);
      }
      else{
         var updatedByUserId=result;
    async.series([
      function addupdateService(callback) {
        if (request.payload.actionType.toUpperCase() === 'ADD') {

          async.waterfall([
            function checkServiceExist(callback) {
              serviceModel.find_serive_by_name(request.payload, function(err, result) {
                callback(null, result);
              });
            }
          ], function(err, result) {
            if (result.length > 0) {
              sendResponse("service already exist", 0, request, reply, "");
            } else {
              serviceModel.add_service(request.payload, updatedByUserId, function(err, res) {

                if (err) {
                  callback(err, null);
                  //return;
                }
                _msg = "data has been saved successfully."
                callback(null, res);
              });
            }

          });

        } else if (request.payload.actionType.toUpperCase() === 'UPDATE') {
          async.waterfall([
            function checkServiceExist(callback) {
              serviceModel.find_serive_by_name_and_id(request.payload, function(err, result) {
                callback(null, result);
              });

            }
            ], function(err, result) {
            if (result.length > 0) {
              serviceModel.update_service(request.payload, updatedByUserId, function(err, res) {

                if (err) {
                  callback(err, null);
                  //return;
                }

                _msg = "data has been updated successfully."
                callback(null, res);
              });
            }
            else
            {
              sendResponse("service does not exist", 0, request, reply, "");
            }
          });
        }
      }
    ], function(err, result) {
      if (err) {
        sendResponse("data not saved.", 0, request, reply, "");
      }
      sendResponse(_msg, 200, request, reply, result[0]);
    });
      }
  });


  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  }
}

/**
 * Get all services
 *
 * @Date: 29 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getAllServices(request,reply)
{
if (metadatafile.saveMetadata(request.payload.metadata)) {

  serviceModel.find_all_serives(request.payload,function(err,result){
    if (err) {
        sendResponse("data not available", 0, request, reply, "");
      }
      sendResponse("data get successfully.", 200, request, reply, result);
  })
}
else
{
   sendResponse("metadata not saved.", 0, request, reply, "");
}
}
//Export model
module.exports.addOrUpdateService = addOrUpdateService;
module.exports.getAllServices=getAllServices;
