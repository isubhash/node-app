//db coonection
var db = require('../../../config/database.config');

//Get sch,ea for city/state/country
var AccountModel=require("./account");
//Get addres_to_branch schema
var AddressToBranchModel= require("./address-to-branch");
// define schema
const Address = db.connect.define('address', {
  id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  },
        addressType:{
          field: 'type',
       type: db.Seq.STRING,
       allowNull: false
        } ,
        addressName: {
          field: 'address_name',
       type: db.Seq.STRING,
       allowNull: true
        },
        addressLineFirst: {
          field: 'address_line_first',
       type: db.Seq.STRING,
       allowNull: false
        },
        addressLineSecond: {
          field: 'address_line_second',
       type: db.Seq.STRING,
       allowNull: true
        },
         cityId:  {
           field: 'city_id',
       type: db.Seq.INTEGER,
       allowNull: false
         },
          stateId: {
             field: 'state_id',
       type: db.Seq.INTEGER,
       allowNull: false
          },
          countryId: {
             field: 'country_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
        zipCode: {
                  field: 'zip_code',
       type: db.Seq.STRING,
       allowNull: false
        },
        status:{
          field: 'status',
       type: db.Seq.BOOLEAN,
       allowNull: false
        },
        addedByUserId:{
          field: 'added_by_user_id',
       type: db.Seq.INTEGER,
       allowNull: true
     },
        updatedByUserId:{
          field: 'updated_by_user_id',
       type: db.Seq.INTEGER,
       allowNull: true
        }
      ,

        dateAdded:{
          field: 'date_added',
       type: db.Seq.DATE,
       allowNull: true
        }
      ,

        dateUpdated:{
          field: 'date_updated',
       type: db.Seq.DATE,
       allowNull: true
        }}
      ,{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'address'
});
//Relationships
AddressToBranchModel.AddressToBranch.belongsTo(Address, {foreignKey: 'address_id'});  
Address.hasMany(AddressToBranchModel.AddressToBranch, {foreignKey: 'address_id'});

AccountModel.City.hasMany(Address,{foreignKey:'city_id'});
Address.belongsTo(AccountModel.City,{foreignKey:'city_id'});

AccountModel.State.hasMany(Address,{foreignKey:'state_id'});
Address.belongsTo(AccountModel.State,{foreignKey:'state_id'});

AccountModel.Country.hasMany(Address,{foreignKey:'country_id'});
Address.belongsTo(AccountModel.Country,{foreignKey:'country_id'});

//save method
var saveAddress = function saveAddress (address, callback)
{
   
  Address.build({
        addressType:address.addressType ,
        addressName: address.addressName,
        addressLineFirst: address.addressLineFirst,
        addressLineSecond: address.addressLineSecond,
        cityId:  address.cityId,
        stateId: address.stateId,
        countryId: address.countryId,
        zipCode: address.zipCode,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
          return callback(null,result.id); 
      });
     
}

//update address
var updateAddress = function updateAddress(data, userId, callback)
{
  Address.update({
    addressType:data.addressType,
    addressLineFirst:data.addressLineFirst,
    addressLineSecond:data.addressLineSecond,
    cityId:data.cityId,
    stateId:data.stateId,
    countryId:data.countryId,
    zipCode:data.zipCode,
    status:data.status,
    updatedByUserId:userId,
    dateUpdated:new Date()
  },
  { 
    fields: ['addressType','addressLineFirst','addressLineSecond','cityId','stateId','countryId','zipCode','status','updatedByUserId','dateUpdated'],
    where: {id: data.addressId}
  }).then(function(result) {
         return callback(null,result);
  });
}

//update method
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  Address.update({
    addedByUserId:userId,
    dateUpdated:new Date()
  },
  { 
    fields: ['addedByUserId','dateUpdated'],
    where: {id: recordID}
  }).then(function(result) {
         return callback(null,result);
  });
}

//Get brnach address

var get_brach_address= function (branchId,callback){
Address.find({where : { id : branchId },
      include: [
        AddressToBranchModel.AddressToBranch,
        AccountModel.City,
        AccountModel.State,
        AccountModel.Country
        ]
    }).then(function (result){

      callback(null,result);
    });
}


//Export methods
exports.saveAddress = saveAddress;
exports.updateRecordStatus=updateRecordStatus;
exports.get_brach_address=get_brach_address;
exports.updateAddress = updateAddress;