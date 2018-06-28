'use strict';

/**
 * Contains all action methods related to branch
 *
 **/

//Load models
var metadatafile = require('../../models/common/metadata');
var poModel = require('../../models/purchaseOrder/purchaseOrder');
var userModel= require('../../models/account/user'); 
var async = require('async');
//var hapi=require('hapi');
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
 * create PO
 *
 * @Date: 2 Jan 2017
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function createOrUpdatePO(request,reply){
 
  
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
      function createOrUpdatePO(userId,callback) {
      	if(request.payload.actionType.toUpperCase()==='ADD'){
      		poModel.createPO(request.payload.purchaseOrder,userId, function(err, res) {
      			if (err) {
      				callback(err,null);
      			}
      			_msg = "data has been saved successfully.";
      			callback(null, res);
      		});
      	}
      	else 
      		if(request.payload.actionType.toUpperCase()==='UPDATE')
      			{
      				poModel.updatePO(request.payload.purchaseOrder,userId, function(err, res) {
      					if (err) {
      						callback(err,null);
      					}
      					_msg = "data has been updated successfully.";
      					callback(null, res);
        }); 
        }
      }
    ], function(err, result) {
      if (err) {
       sendResponse(err, 0, request, reply, null);
      }
      sendResponse(_msg, 200, request, reply, result[0]);
    });
  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  }
}

/**
 * Get PO by organisation id
 *
 * @Date: 3 Jan 2017
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
 function getPurchaseOrderByOrganisationId(request,reply){
 	metadatafile.saveMetadata(request.payload.metadata);//save metadata
 	async.waterfall([
	    	function getData(callback) {
	        		poModel.getPoByOrganisationId(request.payload.organisation.organisationId,function(err, res) {
				            if (err) {
					                callback(err, null);
					            }else{
					            	callback(null, res);
					            }
					        });
	        	}
	        	], function(err, result) {
	    	if (err) {
	    	sendResponse("something wrong.",0,request, reply, err);
	    }
	    else{
	    	sendResponse("get data successfully.",200,request, reply, result);
	    }
	});
 }

/**
 * Get PO detail
 *
 * @Date: 5 Jan 2017
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getPODetail(request,reply){
  metadatafile.saveMetadata(request.payload.metadata);//save metadata
  async.waterfall([
        function getData(callback) {
              poModel.purchaseOrderDetail(request.payload.purchaseOrder,function(err, res) {
                    if (err) {
                          callback(err, null);
                      }else{
                        callback(null, res);
                      }
                  });
            }
            ], function(err, result) {
        if (err) {
        sendResponse("something wrong.",0,request, reply, err);
      }
      else{
        sendResponse("get data successfully.",200,request, reply, result);
      }
  });
}


/**
 * PO Accept/Reject
 *
 * @Date: 5 Jan 2017
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function pOAcceptOrReject(request,reply){
metadatafile.saveMetadata(request.payload.metadata);//save metadata
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
  function changePoStatus(userId,callback) {
    poModel.changePoStatus(request.payload.purchaseOrder,userId,function(err, res) {
      if (err) {
        callback(err, null);
      }else{
        callback(null, res);
      }
    });
  }
  ], function(err, result) {
        if (err) {
        sendResponse("something wrong.",0,request, reply, err);
      }
      else{
        sendResponse("PO status changed successfully.",200,request, reply, result);
      }
  });
}


//Export model
module.exports.createOrUpdatePO = createOrUpdatePO;
module.exports.getPurchaseOrderByOrganisationId = getPurchaseOrderByOrganisationId;
module.exports.getPODetail= getPODetail;
module.exports.pOAcceptOrReject= pOAcceptOrReject;