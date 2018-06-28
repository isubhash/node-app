'use strict';

/**
 * This file contains all routes information to the service
 *
 */

var constant = require('../../../config/constant');

// Load joi for validation
const Joi = require('joi');

// Include handler
var serviceHandler = require('../handlers/serviceHandler');
const Relish = require('relish')({
  messages: {
    
  }
});
// Create endpoints, All service related routes define here
module.exports = [
{
   	method: 'POST',
        path: '/' + constant.appVersion + '/add_or_update_service',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					service:{
							serviceId:Joi.number().integer(),
							name:Joi.string().min(1).max(100).required(),
							recordStatus:{
										status:Joi.boolean(),
										addedByUserId:Joi.number().integer(),
										updatedByUserId:Joi.number().integer(),
										dateAdded:Joi.date().allow(''),
										dateUpdated:Joi.date().allow(''),
										}
							},
					actionType:Joi.string().min(3).max(6).required(),
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
		}
		,
        handler: serviceHandler.addOrUpdateService
   },
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/get_all_services',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					service:{
							serviceId:Joi.number().integer(),
							name:Joi.string().min(1).max(100).required()
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
		}
		,
        handler: serviceHandler.getAllServices
   }
];