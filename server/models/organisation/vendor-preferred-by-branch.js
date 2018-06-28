//db coonection
var db = require('../../../config/database.config');
var branchModel= require('./branch');
//schema email
var vendorPreferredByBranch = db.connect.define('vendor_preferred_by_branch', {
  Id: {
    field: 'id',
    type: db.Seq.INTEGER,
       autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
   branchId: {
    field: 'branch_id',
    type: db.Seq.INTEGER,
    allowNull: false
  },
  vendorId: {
    field: 'vendor_id',
    type: db.Seq.INTEGER,
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
  tableName: 'vendor_preferred_by_branch'
});
// relationship
branchModel.OrganisationBranch.hasMany(vendorPreferredByBranch, {
  foreignKey: 'branch_id'
});
vendorPreferredByBranch.belongsTo(branchModel.OrganisationBranch, {
  foreignKey: 'branch_id'
});
//
//GEt branch preferrred vendors
var get_branch_preferred_vendor = function get_branch_preferred_vendor(_branchId, callback) {

    vendorPreferredByBranch.findAll({
      where: {
       branchId:_branchId
      },
      include: [
          branchModel.OrganisationBranch
      ]
    }).then(function(result) {
      callback(null, result);
    });
  }  

  //Export method
exports.get_branch_preferred_vendor = get_branch_preferred_vendor;