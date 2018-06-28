'use strict';

/**
 * User account related action goes here...
 *
 */

// Load modules
var JWT   = require('jsonwebtoken');
var async   = require('async');

var constant = require('../../../config/constant');
var metadatafile = require('../../models/common/metadata');
var accountModel = require('../../models/account/account'); 
var registrationModel = require('../../models/account/registration'); 
var loginModel = require('../../models/account/login');
var logoutModel = require('../../models/account/logout');

function sendSuccessResponse(request, reply, message, result){
 	return reply({ "status" : { "statusCode" : 200, "message" : message }, "data" : result });
 }

 function sendFailResponse(request, reply, message, result){
 	return reply({ "status" : { "statusCode" : 0, "message" : message }, "data" : result });
 }

/**
 * Success message as response, token already validated
 *
 * @Date: 09 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: message with status code
 * 200: Successful status code as token was verified
 */
function validateToken(request, reply) {
	//console.log(request.auth.token);
	//console.log(request.auth.credentials.email);
	// metadatafile.saveMetadata(request.payload.metadata);
	sendSuccessResponse(request, reply, 'Token is valid', 1);
}

/**
 * Provides list of countries
 *
 * @Date: 13 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 */
function getCountries(request, reply) {
	async.waterfall([
	    	function getData(callback) {
	        		accountModel.get_country_list(function(err, res) {
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
	    	sendSuccessResponse(request, reply, 'success', result);
	});
}

/**
 * Provides list of states
 *
 * @Date: 13 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing request json for country code
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with the name of state
 * 0: Failed status code with no data message
 */
function getStates(request, reply) {
	let countryId = request.payload.countryId;
	async.waterfall([
	    	function getData(callback) {
	        		accountModel.get_state_list(countryId, function(err, res) {
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
	    sendSuccessResponse(request, reply, 'success', result);
	});
}

/**
 * Provides list of cities
 *
 * @Date: 13 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing request json for state
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with the name of city
 * 0: Failed status code with no data message
 */
function getCities(request, reply) {
	let stateId = request.payload.stateId;
    let countryId = request.payload.countryId;
	async.waterfall([
	    	function getData(callback) {
	        		accountModel.get_city_list(stateId, function(err, res) {
				            if (err) {

					                callback(err, null);
	                				return ;
	           			}
				           callback(null, res);
	        		});
	    	}
	], function(err, result) {
	    	if (err) {
	        		console.error(err);
	        		return;
	    	}
	    sendSuccessResponse(request, reply, 'success', result);
	});
}

/**
 * Check the availability of the username
 *
 * @Date: 08 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing the username needed to check with database
 * @param json: callback when action complete
 * @return json: Username available or not available json
 * 200: Available
 * 0: Not available
 */
function usernameAvailability(request, reply) {
	
	let username = request.payload.user.username.toLowerCase();

	async.waterfall([
	    	function getData(callback) {
	        		registrationModel.check_username_availability(username, function(err, res) {
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
	    	(result)?sendSuccessResponse(request, reply, 'success', result):sendFailResponse(request, reply, 'fail', result);
	});
}

function verifyAccount(request, reply) {
}

/**
 * Generate unique access token for individual user
 *
 * @Date: 09 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param integer: request containing id of the user
 * @return string: access token as string
 */
function getToken(email){
	let obj   = { email:email };
	return JWT.sign(obj, constant.secretKey);
}

/**
 * Login user and provide the access token
 *
 * @Date: 09 September 2016
 * @Author Subhash: shubhash.patel@trignodev.com
 * @param json: request containing username and password to login
 * @param json: callback when action complete
 * @return json: success or failure message with status code 
 * 200: Login was successful
 * 0: Wrong credentials provided
 */
function login(request, reply) {
	let username = request.payload.login.username.toLowerCase();
	let password = request.payload.login.password;
console.log('test');
	// metadatafile.saveMetadata(request.payload.metadata[0]);
	var data = {}
	async.waterfall([
	    	function getData(callback) {
	        		loginModel.login(username, password, function(err, res) {
				            if (err) {
					                callback(err, null);
	                				return;
	           			}
	           			
	           			if(res.count>0){
	           				let email = res.rows[0].email;
	           				data.accessToken = getToken(email);
	           				data.userId = res.rows[0].userId;
	           				data.username = res.rows[0].username;
	           				data.firstName = res.rows[0].firstName;
	           				data.middleName = res.rows[0].middleName;
	           				data.lastName = res.rows[0].lastName;
	           				//data.email = res.rows[0].email;
	           				callback(null, data);
	           			}else{
	           				callback(null, 0);
	           			}
	        		});
	         }
	], function(err, result) {
	    	if (err) {
	        		console.error(err);
	        		return;
	    	}
	    	(result)?sendSuccessResponse(request, reply, 'success', result):sendFailResponse(request, reply, 'fail', result);
	});
}


/**
 * To logout the user
 *
 * @Date: 13 December 2016
 * @Author: Subhash Kumar
 * @param json: request containing request json
 * @param json: callback when action complete
 * @return json: success with required data or failure message with status code
 * 200: Successful status code with country name and code
 * 0: Failed status code with no data message
 **/
function logout(request, reply) {

	//metadatafile.saveMetadata(request.payload.metadata[0]);
	let accessToken = request.auth.token;

	var data = {}
	async.waterfall([
	    	function getData(callback) {
	        		logoutModel.logout(accessToken, function(err, res) {
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
	    	(result)?sendSuccessResponse(request, reply, 'success', result):sendFailResponse(request, reply, 'fail', result);
	});
}


// function testMail(request, reply) {
// 	var result = testMail.testMail('shubhash.patel@trignodev.com','Welcome to node','Test');
// 	res.send(result);
// }


//saveMetadata handler for metadata
function saveMetadata(request, reply) {
        var requestpayload=request.payload;
        if(metadatafile.saveMetadata(requestpayload)){
            reply('done');
        }
        else
        {
            reply('notdone');
        }
}

module.exports.saveMetadata = saveMetadata;
module.exports.getCountries = getCountries;
module.exports.getStates = getStates;
module.exports.getCities = getCities;
module.exports.validateToken = validateToken;
module.exports.usernameAvailability = usernameAvailability;
module.exports.verifyAccount = verifyAccount;
module.exports.login = login;
module.exports.logout = logout;
//module.exports.testMail = testMail;