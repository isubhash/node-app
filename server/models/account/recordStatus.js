var db = require('../../../config/database.config');
var recordStatus=  {
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
       allowNull: true
        }
      ,

        dateUpdated:{
          field: 'date_updated',
       type: db.Seq.DATE,
       allowNull: true
        }
}

exports.recordStatus=recordStatus;