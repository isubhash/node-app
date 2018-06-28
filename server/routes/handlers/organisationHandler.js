'use strict';

/**
 * Contains all action methods related to organisation
 *
 **/

//Load models
var roleModel = require('../../models/account/role');
var metadatafile = require('../../models/common/metadata');
var serviceProvidedByOrgModel = require('../../models/organisation/service-provided-by-organisation');
var serviceUsedByOrgModel = require('../../models/organisation/service-used-by-organisation');
var orgVendorModel = require('../../models/organisation/organisation-vendor');
var vendorPreferredVendorsModel = require('../../models/organisation/vendor-preferred-by-branch');
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
 * To fetch the list of organisations
 *
 * @Date: 20 December 2016
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getOrganisation(request, reply) {
  let _msg;
  let data = {};
    //metadatafile.saveMetadata(request.payload.metadata);
    async.waterfall([
        function getData(callback) {
              orgModel.getOrganisation(function(err, res) {
                  if (err) {
                        callback(err, null);
                        return;
                  }
                  if(res.count>0){
                    _msg = "data get successfully."
                    callback(null, res.rows);
                  }else{
                    _msg = "no data to display."
                    callback(null, 0);
                  }
              });
        }
  ], function(err, result) {
        if (err) {
              console.error(err);
              return;
        }
        (result)?sendResponse(_msg, 200, request, reply, result):sendResponse(_msg, 200, request, reply, result);
  });
}


/**
 * To update organisation details
 *
 * @Date: 2 January 2017
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function updateOrganisation(request, reply) {
metadatafile.saveMetadata(request.payload.metadata);
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
            orgModel.updateOrganisation(request.payload.organisation, userId, function(err, res) {
                if (err) {
                      callback(err, null);
                      return;
                }
                callback(null, res);
            });
          }
  ], function(err, result) {
        if (err) {
              console.error(err);
              return;
        }
        (result)?sendResponse("Organisation details updated", 200, request, reply, ""):sendResponse("Unable to update organisation details!", 0, request, reply, "");
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

function getRoles(request, reply) {
  let orgId = request.payload.organisation.organisationId;
  if (metadatafile.saveMetadata(request.payload.metaData)) {
    var _msg;
    async.series([
      function getData(callback) {
        roleModel.get_roles(orgId, function(err, res) {

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
 * Provides list of services used by organisation
 *
 * @Date: 22 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getServicesUsedByORg(request, reply) {

  let orgId = request.payload.organisation.organisationId;
  console.log("org handler=>getServicesUsedByORg");
  if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        console.log("org handler=>getData");
        serviceUsedByOrgModel.get_services_used_by_org(orgId, function(err, res) {

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
 * Provides list of vendors
 *
 * @Date: 26 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getOrgVendor(request, reply) {
  let orgId = request.payload.organisation.organisationId;
  if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        orgVendorModel.get_organisation_vendor(orgId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data get successfully.";
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
 * Provides branch preferred vendors
 *
 * @Date: 26 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getBranchPreferredVendors(request, reply) {
  let branchId = request.payload.branch.branchId;
  if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        vendorPreferredVendorsModel.get_branch_preferred_vendor(branchId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data get successfully.";
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
 * Add or update organisation vendor by using action type(add/update)
 *
 * @Date: 29 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/

function addOrUpdateOrgVendor(request,reply){
  //var _addUpdateUserId=1;//get from token
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

      function addupdateOrgVendor(_addUpdateUserId,callback) {
        if(request.payload.actionType.toUpperCase()==='ADD'){
        orgVendorModel.add_organisation_vendor(request.payload,_addUpdateUserId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data has been saved successfully.";
          callback(null, res);
        });
        }
        else if(request.payload.actionType.toUpperCase()==='UPDATE')
        {
         orgVendorModel.update_organisation_vendor(request.payload,_addUpdateUserId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data has been updated successfully.";
          callback(null, res);
        }); 
        }
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
 * Add or update new service used by organisation by using action type(add/update)
 *
 * @Date: 30 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function addOrUpdateServiceUsedByOrg(request,reply) {
 
  //var _addUpdateUserId = 1; //get from token
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
      function addupdateService(_addUpdateUserId,callback) {
        if (request.payload.actionType.toUpperCase() === 'ADD') {

          async.waterfall([
            function checkServiceExist(callback) {
              serviceUsedByOrgModel.find_serive__used_by_org(request.payload, function(err, result) {
                callback(null, result);
              });
            }
          ], function(err, result) {
            if (result.length > 0) {
              sendResponse("service already exist", 0, request, reply, "");
            } else {
              serviceUsedByOrgModel.add_service_used_by_org(request.payload, _addUpdateUserId, function(err, res) {

                if (err) {
                  callback(err, null);
                  //return;
                }
                _msg = "data has been saved successfully.";
                callback(null, res);
              });
            }

          });

        } else if (request.payload.actionType.toUpperCase() === 'UPDATE') {
          console.log("UPDATE");
          async.waterfall([
            function checkServiceExist(callback) {
              serviceUsedByOrgModel.find_serive__used_by_org(request.payload, function(err, result) {
                callback(null, result);
              });

            }
            ], function(err, result) {
            if (result.length > 0) {
              console.log("going for update");
              serviceUsedByOrgModel.update_service_used_by_org(request.payload, _addUpdateUserId, function(err, res) {

                if (err) {
                  callback(err, null);
                  //return;
                }

                _msg = "data has been updated successfully.";
                callback(null, res);
              });
            }
            else
            {
              sendResponse("service did't add to this organisation", 0, request, reply, "");
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
  } else {
    sendResponse("metadata not saved.", 0, request, reply, "");
  } 
}

/**
 * Provides list of services provided by organisation
 *
 * @Date: 30 Dec 2016
 * @Author: akhil.kankran@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function getServicesProvidedByOrg(request, reply) {
  let orgId = request.payload.organisation.organisationId;
  if (metadatafile.saveMetadata(request.payload.metadata)) {
    var _msg;
    async.series([
      function getData(callback) {
        serviceProvidedByOrgModel.get_services_provided_by_org(orgId, function(err, res) {

          if (err) {
            callback(err, null);
            return;
          }

          _msg = "data get successfully.";
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


//Export model
module.exports.getRoles = getRoles;
module.exports.getServicesUsedByORg=getServicesUsedByORg;
module.exports.getOrgVendor= getOrgVendor;
module.exports.getBranchPreferredVendors=getBranchPreferredVendors;
module.exports.addOrUpdateOrgVendor=addOrUpdateOrgVendor;
module.exports.addOrUpdateServiceUsedByOrg=addOrUpdateServiceUsedByOrg;
module.exports.getServicesProvidedByOrg=getServicesProvidedByOrg;
module.exports.getOrganisation=getOrganisation;
module.exports.updateOrganisation=updateOrganisation;