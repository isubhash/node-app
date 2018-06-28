'use strict';

// Load hapi framework
const Hapi = require('hapi');

// Load configuration settings
var config = require('./config/configuration');

var database = require('./config/database.config');
var constant = require('./config/constant');
var logoutModel = require('./server/models/account/logout');

// Validate user
var validateUser = function (decoded, request, callback) {
// console.log(decoded.email);
     logoutModel.isLoggedOut(request.auth.token, function(err, res) {
         if (err) {
               callback(err, null);
               return;
         }
         if(res){
             return callback(null, false);
         }else{
             return callback(null, true);
         }
     });
};

// Validate admin
var validateAdmin = function (decoded, request, callback) {
    logoutModel.isLoggedOut(request.auth.token, function(err, res) {
         if (err) {
               callback(err, null);
               return;
         }
         if(res){
             return callback(null, false);
         }else{
             return callback(null, true);
         }
     });
};

// Validate superadmin
var validateSuperAdmin = function (decoded, request, callback) {
    logoutModel.isLoggedOut(request.auth.token, function(err, res) {
         if (err) {
               callback(err, null);
               return;
         }
         if(res){
             return callback(null, false);
         }else{
             return callback(null, true);
         }
     });
};


// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: config.host,
    port: config.port,
     routes: {
            cors: true
        }
});


// Register plugins
server.register([
  { register: require('hapi-auth-jwt2') }
  ], function (err) {
      if (err) {
        console.log('Unable to load a plugin');
      }

  server.auth.strategy('jwt', 'jwt',
  {
    key: constant.secretKey,
    validateFunc: validateUser,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.strategy('jwt-admin', 'jwt',
  {
    key: constant.secretKey,
    validateFunc: validateAdmin,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.strategy('jwt-superadmin', 'jwt',
  {
    key: constant.secretKey,
    validateFunc: validateSuperAdmin,
    verifyOptions: { algorithms: [ 'HS256' ] }
  });

  server.auth.default('jwt-superadmin');

  // Load routes file
  var routes = require('./server/routes/endpoints');
  server.route(routes);
  });


// Start the server
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Node Web Services are running at : ', server.info.uri);
});
