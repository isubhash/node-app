'use strict';

/**
 * Contains all action methods related to branch
 *
 **/

//Load models
var metadatafile = require('../../models/common/metadata');
var addressModel = require('../../models/account/address');

var userModel = require('../../models/account/user');
var addressToBranchModel = require('../../models/account/address-to-branch');

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
 * Provides list of roles
 *
 * @Date: 22 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/

function getBranchAddress(request, reply) {
  let branchId = request.payload.branch.branchId;
  if (metadatafile.saveMetadata(request.payload.metaData)) {
    var _msg;
    async.series([
      function getData(callback) {
        addressModel.get_brach_address(branchId, function(err, res) {

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
 * To add a new branch address or update existing address of the branch
 *
 * @Date: 3 January 2017
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function addUpdateBranchAddress(request, reply) {

  // metadatafile.saveMetadata(request.payload.metaData);
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
              async.waterfall([
                function getData(callback) {
                  addressModel.saveAddress(request.payload.address, function(err, res) {
                    if (err) {
                      callback(err, null);
                      return;
                    }
                    callback(null, res);
                  });
                },
                function(addressId, callback){
                  if(addressId){
                    addressModel.updateRecordStatus(addressId,userId);
                    addressToBranchModel.saveAddressToBranch(addressId,request.payload.branchId, function(err, res) {
                    if (err) {
                      callback(err, null);
                      return;
                    }
                    callback(null, res);
                  });
                  }else{
                    callback(null, 0)
                  }
                }
              ], function(err, result) {
                if (err) {
                  console.error(err);
                  return;
                }
                sendResponse("Success", 200, request, reply, "");
              });
            }else{
              addressModel.updateAddress(request.payload.address, userId, function(err, res) {
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

//Export model
module.exports.getBranchAddress = getBranchAddress;
module.exports.addUpdateBranchAddress = addUpdateBranchAddress;


