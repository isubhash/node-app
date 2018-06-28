/*
*Added by Akhil on 2016-12-08 to save metadata in mongodb
*/


var mongojs = require('mongojs'); 
var dbconn= require('../../../config/database.config');

var db = mongojs(dbconn.mongodb_url, ['metadata']);

exports.saveMetadata =function(data)
{
	db.metadata.save(data, (err, result) => {
		if (err){
				//return Boom.wrap(err, 'Internal MongoDB error');
				console.log('methodname: saveMetadata, Error:'+err);
				return false;
				}});
	return true;	
}