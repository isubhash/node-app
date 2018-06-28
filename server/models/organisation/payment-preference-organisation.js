//db coonection
var db = require('../../../config/database.config');
//schema email
var paymentPreferenceOrganisation=db.connect.define('payment_preference_organisation', {
	id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	}
    ,
     organisationId:{
          field: 'organisation_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
     paymentModeId:{
          field: 'payment_mode_id',
       type: db.Seq.INTEGER,
       allowNull: false
     },
    status:{
          field: 'status',
       type: db.Seq.STRING,
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
       allowNull: false
        }
      ,
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
  tableName: 'payment_preference_organisation'
});

//Save data
var saveOrganisationPaymentPreference = function saveOrganisationPaymentPreference (organisationId,paymentModeId, callback)
{
  //var rowCount=0;
  
  paymentPreferenceOrganisation.build({
        organisationId:organisationId ,
        paymentModeId: paymentModeId,
        status:true,
        dateAdded:new Date()
      }).save().then(function(result) {
        return callback(null,result.id);
      });


}

//update method
var updateRecordStatus= function updateRecordStatus(recordID,userId,callback)
{
  paymentPreferenceOrganisation.update({
    addedByUserId:userId
  },
  { 
    fields: ['addedByUserId'],
    where: {id: recordID}
  }).then(function(result) {
         return callback(null,result);
  });
}
//Export methods
exports.saveOrganisationPaymentPreference = saveOrganisationPaymentPreference;
exports.updateRecordStatus = updateRecordStatus;