'use strict';

/**
 * This file contains all routes information about the PO
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
var poHandler = require('../handlers/poHandler');

// Create endpoints, All purchase order related routes define here
module.exports = [
// Create route to create or update PO
    {
 		method: 'POST',
        path: '/' + constant.appVersion + '/create_update_purchase_order',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					purchaseOrder: {
						id:Joi.number(),
					   orderNumber: Joi.string().max(20).required(),
					    type: Joi.string().required(),
					    branch: {
					    	branchId: Joi.number().integer(),
					      	branchName: Joi.string().allow('')
					    },
					    shippingAddress: Joi.string().required(),    
					    billingAddress: Joi.string().required(),
					    createdbyUser: {
					      userId: Joi.number().integer(),
					      salutation: Joi.string().allow(''),
					      username: Joi.string().allow(''),
					      firstName: Joi.string().allow(''),
					      middleName: Joi.string().allow(''),
					      lastName: Joi.string().allow('')
					    },
					    title: Joi.string().max(150).required(),
					    description: Joi.string().required(),
					    quantity: Joi.number().integer(),
					    uom:Joi.string().allow('liter'),
					   currencyId:Joi.number().integer(),
					   expectedAmount: Joi.number(),
					    paymentTerms: Joi.string().required(),
					    paymentPreference: {
					      id: Joi.number().integer(),
					      name: Joi.string().allow('')
					    },
					    barcode: Joi.string().allow(''),
					    poApprovalUser: {
					      userId: Joi.number().integer(),
					      salutation: Joi.string().allow(''),
					      username: Joi.string().allow(''),
					      firstName: Joi.string().allow(''),
					      middleName: Joi.string().allow(''),
					      lastName: Joi.string().allow('')
					    },
					    invoiceApprovalUser: {
					      userId: Joi.number().integer(),
					      salutation: Joi.string().allow(''),
					      username: Joi.string().allow(''),
					      firstName: Joi.string().allow(''),
					      middleName: Joi.string().allow(''),
					      lastName: Joi.string().allow('')
					    },
					    poStatus:Joi.string().required(),
					    poForVendor: {
					      vendorId: Joi.number().integer(),
					      vendorName: Joi.string().allow('')
					    },
					    fob:Joi.string().max(45).allow(''),
					    rate_type:Joi.string().max(45).allow(''),
					    effectiveDate:Joi.date().allow(''),
					    expirationDate:Joi.date().allow(''),
					    minReleaseAmount:Joi.number(),
					    notificationControlExpirationDate:Joi.date().allow(''),
					    acceptanceRequired:Joi.boolean(),
					    transportationArrainged:Joi.string().allow(''),
					    releaseNumber:Joi.string().allow(''),
					    releaseDate:Joi.date().allow(''),
					    unitPrice:Joi.number(),
					    unNumber:Joi.string().allow(''),
					    hazardClass:Joi.string().allow(''),
					    ospUomType:Joi.string().allow(''),
					    listPrice:Joi.number(),
					    marketPrice:Joi.number(),
					    priceType:Joi.string().allow(''),
					    allowPriceOverride:Joi.string().allow(''),
					    promisedDate:Joi.date().allow(''),
					    needByDate:Joi.date().allow(''),
					    transactionNature:Joi.string().allow(''),
					    priceBreakType:Joi.string().allow(''),
					    operatingUnit:Joi.string().allow(''),
					    pCard:Joi.string().allow(''),
					    job:Joi.string().allow(''),
					     recordStatus:{
					     	status:Joi.boolean()
					     }
					  },
					actionType:Joi.string().required(),// "add/update",
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
        handler: poHandler.createOrUpdatePO
   },
   // Create route to get PO by organisationId
    {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_purchase_order',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					organisation:{
						organisationId:Joi.number().integer(),
						organisationName:Joi.string().allow(''),
						registrationId:Joi.string().allow(''),
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
        handler: poHandler.getPurchaseOrderByOrganisationId
   },
   // Create route to get PO detail
    {
 		method: 'POST',
        path: '/' + constant.appVersion + '/get_purchase_order_detail',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					purchaseOrder:{
						id:Joi.number().integer().required(),
						title:Joi.string().allow(''),
						poStatus:Joi.string().valid('approved','rejected','pending'),
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
        handler: poHandler.getPODetail
   },
   // change PO status approved/rejected
    {
 		method: 'POST',
        path: '/' + constant.appVersion + '/po_accept_or_reject',
        config: {
			auth: 'jwt',
			validate: {
				failAction: Relish.failAction,//to get custom error
				payload: {
					purchaseOrder:{
						id:Joi.number().integer().required(),
						title:Joi.string().allow(''),
						poStatus:Joi.string().valid('approved','rejected'),
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
        handler: poHandler.pOAcceptOrReject
   }
   
];