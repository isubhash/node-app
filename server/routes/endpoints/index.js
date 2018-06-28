'use strict';

/**
 * This file export all routes of admin as well user
 *
 */

var common = require('./common');
var user = require('./user');
var organisation = require('./organisation');
var branch=require('./branch');
var service=require('./service');
var po=require('./purchaseOrder');
module.exports = [].concat(common, user,organisation,branch,service,po);
