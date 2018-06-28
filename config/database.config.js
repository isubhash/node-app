'use strict';

// Database settings

var database = {};
var Sequelize = require('sequelize');
var connect = new Sequelize('nodeapp', 'postgres', '#nodeApp2017', {//username for mysql root pwd root
	  host: 'nodeapp.athg4n6yosaddfv.us-west-2.rds.amazonaws.com',
      dialect: "postgres",//changed from mysql to postgres
      port:    5432,//3306
    });

connect
  .authenticate()
  .then(function(err) {
    console.log('Database connection has been established successfully.');
  }, function (err) { 
    console.log('Unable to connect to the database:', err);
  });

//database.postgres_url = 'pg://postgres:pwd@localhost:5432/nodeapp';
//database.db_url = process.env.DATABASE_URL || 'pg://postgres:"BVWEJBfwe@&*!"@"http://ec2-15-25-67-424.us-west-2.compute.amazonaws.com/":5432

database.mongodb_url = 'localhost:27017/Nodeapp_DB';
database.Seq = Sequelize;
database.connect = connect;
module.exports = database;
