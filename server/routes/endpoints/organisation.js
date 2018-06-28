'use strict';

/**
 * This file contains all routes information to the organisation
 *
 */

var constant = require('../../../config/constant');

// Load joi for validation
const Joi = require('joi');

// Include handler
var orgHandler = require('../handlers/organisationHandler');
const Relish = require('relish')({
  messages: {
    
  }
});
// Create endpoints, All organisation related routes define here
module.exports = [
 {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_organisations',
        config: {
			auth: "jwt-superadmin",
			validate: {
				payload: {
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
        handler: orgHandler.getOrganisation
   },
   {
 		method: 'POST',
        path: '/' + constant.appVersion + '/update_organisation',
        config: {
			auth: "jwt-admin",
			validate: {
				payload: {
					organisation:{
								organisationId:Joi.number().integer().required(),
								organisationName:Joi.string().max(255).required(),
								registrationId:Joi.string().required(),
								defaultCurrencyId:Joi.number().integer(),
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
        handler: orgHandler.updateOrganisation
   },
{
 	method: 'POST',
    path: '/' + constant.appVersion + '/get_roles',
    config: {
		auth: false,
		validate: {
			failAction: Relish.failAction,//to get custom error
			payload: {
					organisation:{
								organisationId:Joi.number().integer().min(1).max(11),
								organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
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
        handler: orgHandler.getRoles
    },
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/get_services_used_by_organisation',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
									organisationId:Joi.number().integer(),
									organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
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
        handler: orgHandler.getServicesUsedByORg
   },
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/get_services_provided_by_organisation',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
									organisationId:Joi.number().integer(),
									organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
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
        handler: orgHandler.getServicesProvidedByOrg
   }
   ,
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/get_organisation_vendors',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
									organisationId:Joi.number().integer(),
									organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
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
        handler: orgHandler.getOrgVendor
   },
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/get_branch_preferred_vendors',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					branch:{
									branchId:Joi.number().integer(),
									branchName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
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
        handler: orgHandler.getBranchPreferredVendors
   },
    {
   	method: 'POST',
        path: '/' + constant.appVersion + '/add_or_update_organisation_vendor',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
									organisationId:Joi.number().integer(),
									organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
					},
					vendor:{
						vendorId:Joi.number().integer(),
						vendorName:Joi.string().min(1).max(100).required()
					},
					recordStatus:{
						status:Joi.boolean(),
						addedByUserId:Joi.number().integer(),
						updatedByUserId:Joi.number().integer(),
						dateAdded:Joi.date().allow(''),
						dateUpdated:Joi.date().allow(''),
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
        handler: orgHandler.addOrUpdateOrgVendor
   },
   {
   	method: 'POST',
        path: '/' + constant.appVersion + '/add_or_update_service_used_by_organisation',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
									organisationId:Joi.number().integer(),
									organisationName:Joi.string().allow(''),
									organisationRegistrationID:Joi.string().allow(''),
									defaultCurrencyId:Joi.number().integer()
					},
					service:{
						serviceId:Joi.number().integer(),
						name:Joi.string().min(1).max(100).allow('')
					},
					recordStatus:{
						status:Joi.boolean(),
						addedByUserId:Joi.number().integer(),
						updatedByUserId:Joi.number().integer(),
						dateAdded:Joi.date().allow(''),
						dateUpdated:Joi.date().allow(''),
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
        handler: orgHandler.addOrUpdateServiceUsedByOrg
   }
];