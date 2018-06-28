'use strict';
// Load joi for validation
const Joi = require('joi');

// Include handler
var userHandler = require('../handlers/userHandler');
var constant = require('../../../config/constant');
const Relish = require('relish')({
  messages: {
    
  }
});
// Create endpoints
module.exports = [

//self registraiton by vendor
 {
        method: 'POST',
        path: '/' + constant.appVersion + '/self_registration',
        config: {
			auth: false,
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
							//validate inputs like that deviceType: Joi.string().required(),
							userInfo:{
								username:Joi.string().max(20).required(),
								password:Joi.string().max(64).required(),
								salutation: Joi.string().required().valid('Mr','Mrs','Ms','Dr','Er','Prof'),
								firstName:Joi.string().max(50).required(),
								middleName:Joi.string().max(50).allow(''),
								lastName:Joi.string().max(50).required(),
								employeeId:Joi.string().required(),
								roleId:Joi.number().integer().required(),
								emails: Joi.array().items(Joi.object().keys({
									email: Joi.string().max(100).email(),
									type: Joi.string().allow('')
								})),
								address:Joi.array().items(Joi.object().keys({
										addressType:Joi.string().required(),
										addressName:Joi.string().max(50).allow(''),
										addressLineFirst:Joi.string().max(128).required(),
										addressLineSecond:Joi.string().max(128).allow(''),
										cityId:Joi.number().integer().required(),
										stateId:Joi.number().integer().required(),
										countryId:Joi.number().integer().required(),
										zipCode:Joi.string().max(6).required()
									})),
									phoneNumbers:Joi.array().items(Joi.object().keys({
										phoneNumber:Joi.string().max(14).required(),
										type:Joi.string().required()
									}))
								},
							organisation:{
								organisationName:Joi.string().max(255).required(),
								registrationId:Joi.string().required(),
								currencyId:Joi.number().integer(),
								organisationBranches:Joi.array().items(Joi.object().keys({
									branchName:Joi.string().max(50).allow(''),
									emails:Joi.array().items(Joi.object().keys({
										email:Joi.string().max(100).required(),
										type:Joi.string().allow('')
									})),
									address:Joi.array().items(Joi.object().keys({
										addressType:Joi.string().required(),
										addressName:Joi.string().max(50).allow(''),
										addressLineFirst:Joi.string().max(128).required(),
										addressLineSecond:Joi.string().max(128).allow(''),
										cityId:Joi.number().integer().required(),
										stateId:Joi.number().integer().required(),
										countryId:Joi.number().integer().required(),
										zipCode:Joi.string().required()
									})),
									phoneNumbers:Joi.array().items(Joi.object().keys({
										phoneNumber:Joi.string().max(14).required(),
										type:Joi.string().required()
									}))
								})),
								paymentModesId:Joi.array().items(Joi.number().integer()),
								servicesId:Joi.array().items(Joi.number().integer())

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
		handler:userHandler.self_registration
       // add a handler like that handler: commonHandler.saveMetadata
 },
{
        method: 'POST',
        path: '/' + constant.appVersion + '/registraion',
        config: {
			auth: "jwt-admin",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
							actionId:Joi.number().integer().required(),
							userInfo:{
								username:Joi.string().max(20).required(),
								password:Joi.string().max(64).required(),
								salutation: Joi.string().required().valid('Mr','Mrs','Ms','Dr','Er','Prof','Other'),
								firstName:Joi.string().max(50).required(),
								middleName:Joi.string().max(50).allow(''),
								lastName:Joi.string().max(50).allow(''),
								employeeId:Joi.string().required(),
								roleId:Joi.number().integer().required(),
								emails: Joi.array().items(Joi.object().keys({
									email: Joi.string().max(100).email(),
									type: Joi.string().allow('')
								})),
								address:Joi.array().items(Joi.object().keys({
										addressType:Joi.string().required(),
										addressName:Joi.string().max(50).allow(''),
										addressLineFirst:Joi.string().max(128).required(),
										addressLineSecond:Joi.string().max(128).allow(''),
										cityId:Joi.number().integer().required(),
										stateId:Joi.number().integer().required(),
										countryId:Joi.number().integer().required(),
										zipCode:Joi.string().max(6).required()
									})),
									phoneNumbers:Joi.array().items(Joi.object().keys({
										phoneNumber:Joi.string().max(14).required(),
										type:Joi.string().required()
									}))
								},
							organisationId: Joi.number().integer().when('actionId', { is: 0, then: Joi.number().integer().min(1).required() }),
							branchId: Joi.number().integer().when('actionId', { is: 0, then: Joi.number().integer().min(1).required() }),
							organisation: Joi.object().when('actionId', { is: 1, then: Joi.object().required() }),
							
							//.concat(Joi.string().when('actionId', { is: '1', then: Joi.string().required() })),


							organisation:{
								organisationName:Joi.string().max(255).required(),
								registrationId:Joi.string().required(),
								currencyId:Joi.number().integer(),
								organisationBranches:Joi.array().items(Joi.object().keys({
									branchName:Joi.string().max(50).allow(''),
									emails:Joi.array().items(Joi.object().keys({
										email:Joi.string().max(100).required(),
										type:Joi.string().allow('')
									})),
									address:Joi.array().items(Joi.object().keys({
										addressType:Joi.string().required(),
										addressName:Joi.string().max(50).allow(''),
										addressLineFirst:Joi.string().max(128).required(),
										addressLineSecond:Joi.string().max(128).allow(''),
										cityId:Joi.number().integer().required(),
										stateId:Joi.number().integer().required(),
										countryId:Joi.number().integer().required(),
										zipCode:Joi.string().required()
									})),
									phoneNumbers:Joi.array().items(Joi.object().keys({
										phoneNumber:Joi.string().max(14).required(),
										type:Joi.string().required()
									}))
								})),
								paymentModesId:Joi.array().items(Joi.number().integer()),
								servicesId:Joi.array().items(Joi.number().integer())

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
		handler:userHandler.registration
       // add a handler like that handler: commonHandler.saveMetadata
 },
 {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_users',
        config: {
			auth: "jwt-admin",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
						searchKeyword:Joi.string().allow(''),
						userType: Joi.string().allow(''),
						startDate:Joi.string().allow(''),
						endDate:Joi.string().allow(''),
						sortBy:Joi.string().allow(''),
						limit:Joi.number().integer(),
						offset:Joi.number().integer(),
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
        handler: userHandler.get_users
 },
 {
 		method: 'POST',
        path: '/' + constant.appVersion + '/add_update_role',
        config: {
			auth: "jwt-admin",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
						actionId: Joi.number().integer().required(),
						organisationId: Joi.number().integer().required(),
						role:{
							roleId: Joi.number().integer().when('actionId', { is: 0, then: Joi.number().integer().required() }),
							roleName: Joi.string().required(),
							status: Joi.boolean().required()
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
		  handler: userHandler.add_update_role
   },
 {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_profile',
        config: {
			auth: "jwt",
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					userInfo:{
						userId:Joi.number().integer()
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
        handler: userHandler.get_profile
 },
 {
 		method: 'POST',
        path: '/' + constant.appVersion + '/update_profile',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					userInfo:{
						userId:Joi.number().integer(),
						username:Joi.string().max(20).required(),
						password:Joi.string().max(64).required(),
						firstName:Joi.string().max(50).required(),
						lastName:Joi.string().max(50).required(),
						employeeId:Joi.string().required(),
						roleId:Joi.number().integer().required(),
						emails: Joi.array().items(Joi.object().keys({
							emailId:Joi.number().integer(),
							email: Joi.string().max(100).email(),
							type: Joi.string().allow('')
						})),
						address:Joi.array().items(Joi.object().keys({
						addressId:Joi.number().integer(),
						addressType:Joi.string().required(),
						addressName:Joi.string().max(50).allow(''),
						addressLineFirst:Joi.string().max(128).required(),
						addressLineSecond:Joi.string().max(128).allow(''),
						cityId:Joi.number().integer().required(),
						stateId:Joi.number().integer().required(),
						countryId:Joi.number().integer().required(),
						zipCode:Joi.string().max(6).required()
					})),
						phoneNumbers:Joi.array().items(Joi.object().keys({
						phoneNumberId:Joi.number().integer(),
						phoneNumber:Joi.string().max(14).required(),
						type:Joi.string().required()
					})),
						recordStatus:{
							status:Joi.boolean(),
							addedByUserId:Joi.number().integer(),
							updatedByUserId: Joi.number().integer(),
							dateAdded: Joi.date().allow(''),
							dateUpdated:Joi.date().allow('')
						}
					},
					organisation:{
						organisationId:Joi.number().integer(),
						organisationName:Joi.string().max(50).allow('')
					},
					organisationBranches:Joi.array().items(Joi.object().keys({
						branchId:Joi.number().integer(),
						branchName:Joi.string().max(50).allow('')
					})),
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
        handler: userHandler.update_user_profile
 }
];