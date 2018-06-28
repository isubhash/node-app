//db coonection
var db = require('../../../config/database.config');
//schema email
var PhoneNumber=db.connect.define('phone_number', {
	id:{
    field: 'id',
       type: db.Seq.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
  	},
    type:{
       field: 'type',
       type: db.Seq.STRING,
       allowNull: false
    },
    phoneNumber:{
       field: 'phone_number',
       type: db.Seq.STRING,
       allowNull: false
    } ,
    status:{
       field: 'status',
       type: db.Seq.BOOLEAN,
       allowNull: false
        }  
},
{
  timestamps: false,
  underscored: true,
  freezeTableName: true,
  tableName: 'email'
});