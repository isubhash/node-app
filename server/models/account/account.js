'use strict';

var db = require('../../../config/database.config');

// Schemas of country table
const Country = db.connect.define('country', {
    countryId: 
    {
       field: 'country_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
    countryName:
    {
       field: 'country_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    countryCode:
    {
      field: 'country_code',
       type: db.Seq.STRING,
       allowNull: false
    },
    status:
    {
       type: db.Seq.BOOLEAN,
       allowNull: false
    }
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'country'
});

// Schemas of state table
const State = db.connect.define('state', {
    stateId: 
    {
      field: 'state_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
     countryId: 
    {
      field: 'country_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
    stateName:
    {
      field: 'state_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    status:
    {
       type: db.Seq.BOOLEAN,
       allowNull: false
    }
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'state'
});

// Schemas of state table
const City = db.connect.define('city', {
    cityId: 
    {
       field: 'city_id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
     },
     stateId: 
    {
       field: 'state_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
    cityName:
    {
       field: 'city_name',
       type: db.Seq.STRING,
       allowNull: false
    },
    status:
    {
       type: db.Seq.BOOLEAN,
       allowNull: false
    }
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'city'
});

// To fetch the list of countries
var get_country_list = function get_country_list(callback)
{
	Country.findAll().then(function(result) {
		//console.log(JSON.stringify(result));
    return callback(null, result);
});
}

// To fetch the list of states
var get_state_list = function get_state_list(countryId, callback)
{
  State.findAll({ where : { country_id : countryId } }).then(function(result) {
    return callback(null, result);
});
}

// To fetch the list of cities
var get_city_list = function get_city_list(stateId, callback)
{
  City.findAll({ where : { state_id : stateId } }).then(function(result) {
    return callback(null, result);
});
}

exports.get_country_list = get_country_list;
exports.get_state_list = get_state_list;
exports.get_city_list = get_city_list;

exports.City=City;
exports.State=State;
exports.Country=Country;