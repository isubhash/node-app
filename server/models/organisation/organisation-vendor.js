//db coonection
var db = require('../../../config/database.config');
//schema email
var OrganisationVendor = db.connect.define('organisation_vendor', {
  vendorId: {
    field: 'vender_id',
    type: db.Seq.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  organisationId: {
    field: 'organisation_id',
    type: db.Seq.INTEGER,
    allowNull: false
  },
  vendorOrganisationId: {
    field: 'vendor_organisation_id',
    type: db.Seq.INTEGER,
    allowNull: false
  },
  vendorName: {
    field: 'vendor_name',
    type: db.Seq.STRING,
    allowNull: false
  },
  status: {
    field: 'status',
    type: db.Seq.STRING,
    allowNull: false
  },
  addedByUserId: {
    field: 'added_by_user_id',
    type: db.Seq.INTEGER,
    allowNull: false
  },
  updatedByUserId: {
    field: 'updated_by_user_id',
    type: db.Seq.INTEGER,
    allowNull: true
  },
  dateAdded: {
    field: 'date_added',
    type: db.Seq.DATE,
    allowNull: false
  },
  dateUpdated: {
    field: 'date_updated',
    type: db.Seq.DATE,
    allowNull: true
  }
}, {
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'organisation_vendor'
});

//Get organisaiton vender
var get_organisation_vendor = function get_organisation_vendor(orgId, callback) {
  OrganisationVendor.findAll({
    where: {
      organisationId: orgId
    }
  }).then(function(result) {
    return callback(null, result);
  });
}

//Add organisation vendor
var add_organisation_vendor = function (data,addedByUserId,callback) {
  OrganisationVendor.build({
    organisationId:data.organisation.organisationId,
    vendorOrganisationId:data.vendor.vendorId,
    vendorName:data.vendor.vendorName,
    addedByUserId:addedByUserId,
    status:true,
    dateAdded:new Date()
  }).save().then(function(result) {
        return  callback(null, result.id);
    });
}

//Update organisation vendor
var update_organisation_vendor =function(data,updatedByUserId,callback) {

OrganisationVendor.update({
    vendorName:data.vendor.vendorName,
    status:true,
    updatedByUserId:updatedByUserId,
    dateUpdated:new Date()
  },
  { 
    fields: ['vendorName','status','updatedByUserId','dateUpdated'],
    where: {
      organisationId: data.organisation.organisationId,
       vendorOrganisationId:data.vendor.vendorId
    }
  }).then(function(result) {
         return callback(null,result);
  });
}
//Export methods
exports.get_organisation_vendor = get_organisation_vendor;
exports.add_organisation_vendor= add_organisation_vendor;
exports.update_organisation_vendor=update_organisation_vendor;
//Export schema
exports.OrganisationVendor = OrganisationVendor;
