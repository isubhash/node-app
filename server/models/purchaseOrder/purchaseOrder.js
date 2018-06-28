//db coonection
var db = require('../../../config/database.config');

//schema purchasing order
var purchaseOrder=db.connect.define('purchase_order', {
	id:{
       field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    orderNumber:{
        field: 'order_number',
        type: db.Seq.STRING,
        allowNull: false
     },
    poType:{
        field: 'po_type',
        type: db.Seq.STRING,
        allowNull: false
     },
    branchId:{
        field: 'branch_id',
        type: db.Seq.INTEGER,
        allowNull: false
     },
    shippingAddress:{
        field: 'shipping_address',
        type: db.Seq.STRING,
        allowNull: false
     },
    billingAddress:{
        field: 'billing_address',
        type: db.Seq.STRING,
        allowNull: false
     },
    userID:{
        field: 'user_id',
        type: db.Seq.INTEGER,
        allowNull: false
     },
     title:{
        field: 'title',
        type: db.Seq.STRING,
        allowNull: false
    },
     description:{
        field: 'description',
        type: db.Seq.STRING,
        allowNull: false
    },
     quantity:{
        field: 'quantity',
        type: db.Seq.INTEGER,
        allowNull: false
    },
     uom:{
        field: 'uom',
        type: db.Seq.STRING,
        allowNull: true
    },
     currencyId:{
        field: 'currency_id',
        type: db.Seq.INTEGER,
        allowNull: false
    },
     expectedPrice:{
        field: 'expected_price',
        type: db.Seq.INTEGER,
        allowNull: false
    },
     paymentTerms:{
        field: 'payment_terms',
        type: db.Seq.STRING,
        allowNull: false
    },
     paymentPreferenceId:{
        field: 'payment_preference_id',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    barcode:{
        field: 'barcode',
        type: db.Seq.STRING,
        allowNull: true
    },
    poApprovedByUserId:{
        field: 'po_approved_by_user_id',
        type: db.Seq.INTEGER,
        allowNull: false
    },
    invoiceApprovedByUserId:{
        field: 'invoice_approved_by_user_id',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    poStatus:{
        field: 'po_status',
        type: db.Seq.STRING,
        allowNull: false
    },
    poForVenderId:{
        field: 'po_for_vendor_id',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    fob:{
        field: 'fob',
        type: db.Seq.STRING,
        allowNull: true
    },
    rateType:{
        field: 'rate_type',
        type: db.Seq.STRING,
        allowNull: true
    },
    effectiveDate:{
        field: 'effective_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    expirationDate:{
        field: 'expiration_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    minReleaseAmount:{
        field: 'min_release_amount',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    notificationControlExpirationDate:{
        field: 'notification_control_expiration_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    acceptanceRequired:{
        field: 'acceptance_required',
        type: db.Seq.BOOLEAN,
        allowNull: true
    },
    transportationArrainged:{
        field: 'transportation_arrainged',
        type: db.Seq.STRING,
        allowNull: true
    },
    releaseNumber:{
        field: 'release_number',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    releaseDate:{
        field: 'release_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    unitPrice:{
        field: 'unit_price',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    unNumber:{
        field: 'un_number',
        type: db.Seq.STRING,
        allowNull: true
    },
    hazardClass:{
        field: 'hazard_class',
        type: db.Seq.STRING,
        allowNull: true
    },
    ospUomType:{
        field: 'osp_uom_type',
        type: db.Seq.STRING,
        allowNull: true
    },
    listPrice:{
        field: 'list_price',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    marketPrice:{
        field: 'market_price',
        type: db.Seq.INTEGER,
        allowNull: true
    },
    priceType:{
        field: 'price_type',
        type: db.Seq.STRING,
        allowNull: true
    },
    allowPriceOverride:{
        field: 'allow_price_override',
        type: db.Seq.STRING,
        allowNull: true
    },
    promisedDate:{
        field: 'promised_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    needByDate:{
        field: 'need_by_date',
        type: db.Seq.DATE,
        allowNull: true
    },
    transactionNature:{
        field: 'transaction_nature',
        type: db.Seq.STRING,
        allowNull: true
    },
    priceBreakType:{
        field: 'price_break_type',
        type: db.Seq.STRING,
        allowNull: true
    },
    operatingUnit:{
        field: 'operating_unit',
        type: db.Seq.STRING,
        allowNull: true
    },
    pCard:{
        field: 'p_card',
        type: db.Seq.STRING,
        allowNull: true
    },
    job:{
        field: 'job',
        type: db.Seq.STRING,
        allowNull: true
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
    },
	  dateAdded:{
        field: 'date_added',
        type: db.Seq.DATE,
        allowNull: true
    },
    dateUpdated:{
        field: 'date_updated',
        type: db.Seq.DATE,
        allowNull: true
    } 
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'purchase_order'
});

//Create PO
var createPO =function(data,addedBy,callback)
{
  purchaseOrder.build({
    orderNumber: data.orderNumber,
    poType:data.type,
    branchId:data.branch.branchId,
    shippingAddress:data.shippingAddress,
    billingAddress:data.billingAddress,
    userID:addedBy,
     title:data.title,
     description:data.description,
     quantity:data.quantity,
     uom:(data.uom)?data.uom:null,
     currencyId:data.currencyId,
     expectedPrice:data.expectedAmount,
     paymentTerms:data.paymentTerms,
     paymentPreferenceId:data.paymentPreference.id,
    barcode:(data.barcode)?data.barcode:null,
    poApprovedByUserId:data.poApprovalUser.userId,
    invoiceApprovedByUserId:data.invoiceApprovalUser.userId,
    poStatus:data.poStatus,
    poForVenderId:data.poForVendor.vendorId,
     fob:(data.fob)?data.fob:null,
     rateType:(data.rateType)?data.rateType:null,
    effectiveDate:(data.effectiveDate)?data.effectiveDate:null,
    expirationDate:(data.expirationDate)?data.expirationDate:null,
    minReleaseAmount:(data.minReleaseAmount)?data.minReleaseAmount:null,
    notificationControlExpirationDate:(data.notificationControlExpirationDate)?data.notificationControlExpirationDate:null,
    acceptanceRequired:(data.acceptanceRequired)?data.acceptanceRequired:null,
    transportationArrainged:(data.transportationArrainged)?data.transportationArrainged:null,
    releaseNumber:(data.releaseNumber)?data.releaseNumber:null,
    releaseDate:(data.releaseDate)?data.releaseDate:null,
    unitPrice:(data.unitPrice)?data.unitPrice:null,
    unNumber:(data.unNumber)?data.unNumber:null,
    hazardClass:(data.hazardClass)?data.hazardClass:null,
    ospUomType:(data.ospUomType)?data.ospUomType:null,
    listPrice:(data.listPrice)?data.listPrice:null,
    marketPrice:(data.marketPrice)?data.marketPrice:null,
    priceType:(data.priceType)?data.priceType:null,
    allowPriceOverride:(data.allowPriceOverride)?data.allowPriceOverride:null,
    promisedDate:(data.promisedDate)?data.promisedDate:null,
    needByDate:(data.needByDate)?data.needByDate:null,
    transactionNature:(data.transactionNature)?data.transactionNature:null,
    priceBreakType:(data.priceBreakType)?data.priceBreakType:null,
    operatingUnit:(data.operatingUnit)?data.operatingUnit:null,
    pCard:(data.pCard)?data.pCard:null,
    job:(data.job)?data.job:null,
    status: true,
    dateAdded: new Date()
  }).save().then(function(result) {
    return callback(null, result.Id);
  });

}
//Update PO
var updatePO= function(data,updatedBy,callback)
{
  //var _fieldsArrey =[];
  console.log("----------------"+data.recordStatus.status);
purchaseOrder.update({
  id:data.id,
    orderNumber: data.orderNumber,
    poType:data.type,
    branchId:data.branch.branchId,
    shippingAddress:data.shippingAddress,
    billingAddress:data.billingAddress,
    userID:updatedBy,
     title:data.title,
     description:data.description,
     quantity:data.quantity,
     uom:(data.uom)?data.uom:null,
     currencyId:data.currencyId,
     expectedPrice:data.expectedAmount,
     paymentTerms:data.paymentTerms,
     paymentPreferenceId:data.paymentPreference.id,
     barcode:(data.barcode)?data.barcode:null,
    poApprovedByUserId:data.poApprovalUser.userId,
    invoiceApprovedByUserId:data.invoiceApprovalUser.userId,
    poStatus:data.poStatus,
    poForVenderId:data.poForVendor.vendorId,
    fob:(data.fob)?data.fob:null,
     rateType:(data.rateType)?data.rateType:null,
    effectiveDate:(data.effectiveDate)?data.effectiveDate:null,
    expirationDate:(data.expirationDate)?data.expirationDate:null,
    minReleaseAmount:(data.minReleaseAmount)?data.minReleaseAmount:null,
    notificationControlExpirationDate:(data.notificationControlExpirationDate)?data.notificationControlExpirationDate:null,
    acceptanceRequired:(data.acceptanceRequired)?data.acceptanceRequired:null,
    transportationArrainged:(data.transportationArrainged)?data.transportationArrainged:null,
    releaseNumber:(data.releaseNumber)?data.releaseNumber:null,
    releaseDate:(data.releaseDate)?data.releaseDate:null,
    unitPrice:(data.unitPrice)?data.unitPrice:null,
    unNumber:(data.unNumber)?data.unNumber:null,
    hazardClass:(data.hazardClass)?data.hazardClass:null,
    ospUomType:(data.ospUomType)?data.ospUomType:null,
    listPrice:(data.listPrice)?data.listPrice:null,
    marketPrice:(data.marketPrice)?data.marketPrice:null,
    priceType:(data.priceType)?data.priceType:null,
    allowPriceOverride:(data.allowPriceOverride)?data.allowPriceOverride:null,
    promisedDate:(data.promisedDate)?data.promisedDate:null,
    needByDate:(data.needByDate)?data.needByDate:null,
    transactionNature:(data.transactionNature)?data.transactionNature:null,
    priceBreakType:(data.priceBreakType)?data.priceBreakType:null,
    operatingUnit:(data.operatingUnit)?data.operatingUnit:null,
    pCard:(data.pCard)?data.pCard:null,
    job:(data.job)?data.job:null,
    status: data.recordStatus.status,
    updatedByUserId:updatedBy,
    dateUpdated: new Date()
  }, {
    fields: ['id','orderNumber','poType','branchId','shippingAddress','billingAddress','userID','title','description','quantity','uom','currencyId','expectedPrice','paymentTerms','paymentPreferenceId','barcode','poApprovedByUserId','invoiceApprovedByUserId','poStatus','poForVenderId','fob','rateType','effectiveDate','expirationDate','minReleaseAmount','notificationControlExpirationDate','acceptanceRequired','transportationArrainged','releaseNumber','releaseDate','unitPrice','unNumber','hazardClass','ospUomType','listPrice','marketPrice','priceType','allowPriceOverride','promisedDate','needByDate','transactionNature','priceBreakType','operatingUnit','pCard','job','status','updatedByUserId','dateUpdated'],
    where: {
      Id: data.id
    }
  }).then(function(result) {
    return callback(null, result);
  });
}

//Get PO by organisationId
var getPoByOrganisationId = function(orgId, callback) {
  db.connect.query('SELECT PO.id,PO.title,PO.po_status,PO.expected_price,PO.description,PO.barcode,PO.status FROM purchase_order PO inner join organisation_branch BRANCH on BRANCH.branch_id=PO.branch_id inner join organisation  ORG on ORG.organisation_id=BRANCH.organisation_id where ORG.organisation_id= :organisationId', {
    replacements: {
      organisationId: orgId
    },
    type: db.connect.QueryTypes.SELECT
  }).then(function(result) {
    
   callback(null, result);
     })
}

//Get PO detail

var purchaseOrderDetail =function(poData,callback)
{
    callback(null,null);
}

//accept or reject PO by changing po status
var changePoStatus = function(poData,updatedBy,callback)
{
    purchaseOrder.update({
    poStatus:poData.poStatus,
    updatedByUserId:updatedBy,
    dateUpdated:new Date()
  },
  {
    fields: ['poStatus','updatedByUserId','dateUpdated'],
    where: {id: poData.id}
  }).then(function(result) {
         return callback(null,result);
  });
}
//Export schema
exports.purchaseOrder=purchaseOrder

//Export methods
exports.createPO=createPO;
exports.updatePO=updatePO;
exports.getPoByOrganisationId=getPoByOrganisationId;
exports.purchaseOrderDetail=purchaseOrderDetail;
exports.changePoStatus=changePoStatus;