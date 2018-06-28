'use strict';

/**
 * This file contains all routes information about the branch
 *
 */

var constant = require('../../../config/constant');

// Load joi for validation
const Joi = require('joi');
const Relish = require('relish')({
  messages: {
    
  }
});
// Include handler
var branchHandler = require('../handlers/branchHandler');

// Create endpoints, All branch related routes define here
module.exports = [
// Create route to get list of roles
    {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_branch_address',
        config: {
			auth: "jwt",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					branch:{
									branchId:Joi.number().integer().min(1),
									branchName:Joi.string().allow('')
					},
					 metadata: {
                        deviceType: Joi.string().valid('android','ios','web'),
                        deviceId: Joi.string().alphanum().allow(''),
                        networkType:Joi.string().allow(''),
                        serviceProvider:Joi.string().allow(''),
                        networkVersion:Joi.string().allow(''),
                        latitude:Joi.string().allow(''),
                        longitude:Joi.string().allow(''),
                        ipAddress:Joi.string().allow('')
                    }
				}
			}
		},
        handler: branchHandler.getBranchAddress
   },
   {
 		method: 'POST',
        path: '/' + constant.appVersion + '/add_update_branch_address',
        config: {
			auth: "jwt-admin",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					actionId:Joi.number().integer().required(),
					branchId:Joi.number().integer().required(),
					address:{
								addressId: Joi.number().integer().when('actionId', { is: 0, then: Joi.number().integer().required() }),
								addressType:Joi.string().required(),
								addressName:Joi.string().max(50).allow(''),
								addressLineFirst:Joi.string().max(128).required(),
								addressLineSecond:Joi.string().max(128).allow(''),
								cityId:Joi.number().integer().required(),
								stateId:Joi.number().integer().required(),
								countryId:Joi.number().integer().required(),
								zipCode:Joi.string().max(6).required(),
								status:Joi.boolean().required()
					},
					 metadata: {
                        deviceType: Joi.string().valid('android','ios','web'),
                        deviceId: Joi.string().alphanum().allow(''),
                        networkType:Joi.string().allow(''),
                        serviceProvider:Joi.string().allow(''),
                        networkVersion:Joi.string().allow(''),
                        latitude:Joi.string().allow(''),
                        longitude:Joi.string().allow(''),
                        ipAddress:Joi.string().allow('')
                    }
				}
			}
		},
        handler: branchHandler.addUpdateBranchAddress
   }
   
];