'use strict';

/**
 * This file contains all routes information to the user
 *
 */

var constant = require('../../../config/constant');

// Load joi for validation
const Joi = require('joi');

// Include handler
var commonHandler = require('../handlers/commonHandler');
const Relish = require('relish')({messages: {}});


// Create endpoints, All user related routes define here
module.exports = [

//saveMetadata metadata save method
 {
        method: 'POST',
        path: '/' + constant.appVersion + '/save_metadata',
        config: {
			auth: false,
			validate: {
				payload: {
							deviceType: Joi.string().required(),
							deviceID: Joi.string().optional(),
							networkType:Joi.string().allow(''),
							serviceProvider:Joi.string().allow(''),
							networkVersion:Joi.string().allow(''),
							latitude:Joi.string().allow(''),
							longitude:Joi.string().allow(''),
							ipAddress:Joi.string().allow('')
				}
			}
		},
        handler: commonHandler.saveMetadata
    },

    // Create route to get list of countries
    {
        method: 'GET',
        path: '/' + constant.appVersion + '/get_countries',
        config: {
			auth: false
		},
        handler: commonHandler.getCountries
    },
    
    // Create route to get list of states
    {
        method: 'POST',
        path: '/' + constant.appVersion + '/get_states',
        config: {
			auth: false,
			validate: {
                failAction: Relish.failAction,
				payload: {
					countryId: Joi.number().required()
				}
			}
		},
        handler: commonHandler.getStates
    },
    
    // Create route to get list of cities
    {
        method: 'POST',
        path: '/' + constant.appVersion + '/get_cities',
        config: {
			auth: false,
			validate: {
                failAction: Relish.failAction,
				payload: {
					stateId: Joi.number().required()
				}
			}
		},
        handler: commonHandler.getCities
    },
    
    // Create route to check username availability
    {
        method: 'POST',
        path: '/' + constant.appVersion + '/username_availability',
        config: {
			auth: false,
			validate: {
                failAction: Relish.failAction,
				payload:{
                    user: {
                        username : Joi.string().alphanum().max(20).required()
                    }
                }
			}
		},
        handler: commonHandler.usernameAvailability
    },
    
    
  //   //Create route to test email
  //   {
  //       method: 'get',
  //       path: '/' + constant.appVersion + '/test_mail',
  //       config: {
		// 	auth: false
		// },
  //       handler: commonHandler.testMail
  //   },
    
    // Create route for Login
    {
        method: 'POST',
        path: '/' + constant.appVersion + '/login',
        config: {
            auth: false,
            validate: {
                failAction: Relish.failAction,
                payload: {
                    login: {
                        username: Joi.string().min(6).max(20).required(),
                        password: Joi.string().min(3).required()
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
        handler: commonHandler.login
    },

    {
        method: 'POST',
        path: '/' + constant.appVersion + '/logout',
        config: {
            auth: "jwt",
            validate: {
                failAction: Relish.failAction,
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
        handler: commonHandler.logout
    },
    
    
    // Create route to validate token
    {
        method: 'POST',
        path: '/' + constant.appVersion + '/validate_token',
        config: {
            auth: "jwt",
            validate: {
                failAction: Relish.failAction,
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
        handler: commonHandler.validateToken
    },
    
    
    // verifyAccount
    {
        method: 'GET',
        path: '/' + constant.appVersion + '/verify_account',
        config: {
            auth: false
        },
        handler: commonHandler.verifyAccount
    }
];
