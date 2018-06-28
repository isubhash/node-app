'use strict';
var async = require('async');
var db = require('../../../config/database.config');
var Address = require('./address');
var User = require('./user');
var Email = require('./email');
var PhoneNumber = require('./phone-number');
var Organisation = require('../organisation/organisation');
var Branch = require('../organisation/branch');
var EmailToUser = require('./email-to-user');
var EmailToBranch = require('./email-to-branch');
var PhnNumToUser = require('./phone-number-to-user');
var PhnNumToBranch = require('../organisation/phone-to-branch');
var AddressToUser = require('./address-to-user');
var AddressToBranch = require('./address-to-branch');
var PaymentPreference = require('../organisation/payment-preference-organisation');
var ServiceProvidedByOrganisation = require('../organisation/service-provided-by-organisation');

// To check the availability of the username in DB
var check_username_availability = function check_username_availability(username, callback) {
    User.User.findAndCountAll({
      where: {
        user_name: username
      }
    }).then(function(result) {
      return callback(null, result.count);
    });
  }
  
//Self registration
var self_registration_save = function self_registration_save(data, callback) {
  //Save address user
  var params = new Object();
  async.series([
    function getUserAddressId(callback) {
       for (var index = 0; index < data.userInfo.address.length; index++) {
        Address.saveAddress(data.userInfo.address[index], function(err, result) {
          
          params.userAddressId = result;
           console.log("_addressIdUser " + params.userAddressId);
          callback(null, params.userAddressId);
        });
      }

    },
    function getBranchAddressId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        Address.saveAddress(data.organisation.organisationBranches[index].address[0], function(err, result) {
          params.BranchAddressId = result;
          console.log("_addressIdBranch " + result);
          callback(null, params.BranchAddressId);
        });
      }

    },
    function getUserEmailId(callback) {
      for (var index = 0; index < data.userInfo.emails.length; index++) {
        Email.saveEmails(data.userInfo.emails[index], function(err, result) {
          params.userEmailId = result;
          console.log("_userEmailId " + params.userEmailId);
          callback(null, params.userEmailId);
        });
      }

    },
    function getBranchEmailId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        Email.saveEmails(data.organisation.organisationBranches[index].emails[0], function(err, result) {
          params.branchEmailId = result;
          console.log("_branchEmailId " + params.branchEmailId);
          callback(null, params.branchEmailId);
        });
      }

    },
    function getUserPhnId(callback) {
      for (var index = 0; index < data.userInfo.phoneNumbers.length; index++) {
        PhoneNumber.savePhoneNumbers(data.userInfo.phoneNumbers[index], function(err, result) {
          //_phnToUser = result;
          params.userPhnId = result;
          console.log("_phnToUser" + params.userPhnId);
          callback(null, params.userPhnId);
        });
      }

    },
    function getBranchPhnId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        PhoneNumber.savePhoneNumbers(data.organisation.organisationBranches[index].phoneNumbers[0], function(err, result) {
          params.branchPhnId = result;
          console.log("_phnToBranch" + params.branchPhnId);
          callback(null, params.branchPhnId);
        });
      }

    },
    function getOrgId(callback) {
      Organisation.saveOrganisation(data.organisation, function(err, result) {
        params.organisationId = result;
        console.log("org Id" + params.organisationId);
        callback(null, params.organisationId);
      });

    }

  ], function(err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
      async.series([


        function getBranchId(callback) {
          for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
            Branch.saveOrganisationBranch(data.organisation.organisationBranches[index], params.organisationId, params.BranchAddressId, function(err, result) {
              params.branchId = result;
              console.log("branch Id" + params.branchId);
              callback(null, params.branchId);
            });
          }

        }
      ], function(err, result) {

        if (err) {
          console.log(err);
          return;
        } else {
          async.series([
            function getUserId(callback) {
              User.saveUser(data.userInfo, params.organisationId, params.branchId, params.userAddressId, function(err, result) {
                params.userid = result;
                console.log("userID" + params.userid);
                callback(null, params.userid);
              });

            }

          ], function(err, result) {
              
          if (err) {
              console.log(err);
            return;
        } else {
async.series([

function saveEmailTouser(callback) {
  EmailToUser.saveEmailToUser(params.userEmailId, params.userid, function(err, result) {
    callback(null,null);
  });
},
function saveEmailToBranch(callback) {
  EmailToBranch.saveEmailToBranch(params.branchEmailId, params.branchId, function(err, result) {
   callback(null, null);
  });
  
},
function savePhnToUser(callback) {
  PhnNumToUser.savePhoneNumbersToUser(params.userPhnId, params.userid, function(err, result) {
    callback(null, null);
  });
},
function savePhnToBranch(callback) {
  PhnNumToBranch.savePhoneNumbersToBranch(params.branchPhnId,params.branchId, function(err, result) {
    callback(null, null);
  });
  
},
function saveAddToUSer(callback) {
  AddressToUser.saveAddressToUser(params.userAddressId, params.userid, function(err, result) {
    callback(null, null);
  });
  
},
function saveAddToBranch(callback) {
  AddressToBranch.saveAddressToBranch(params.BranchAddressId, params.branchId, function(err, result) {
    callback(null, null);
  });
  
},
function savePaymentPreference(callback) {
  PaymentPreference.saveOrganisationPaymentPreference(params.organisationId,data.organisation.paymentModesId[0], function(err, result) {
    params.paymentPreferenceId = result;
    console.log("_paymentPreferenceId "+params.paymentPreferenceId);
     callback(null,params.paymentPreferenceId);
  });
 
},
function saveServiceProvidedByOrganisation(callback) {
  ServiceProvidedByOrganisation.saveOrganisationService(params.organisationId,data.organisation.servicesId[0], function(err, result) {
    params.serviceProvidedByOrgId = result;
    console.log("_serviceProvidedByOrgId "+params.serviceProvidedByOrgId);
    callback(null, params.serviceProvidedByOrgId);
  });
  
},
function updateStatusRecord(callback){


//Update enail status record
Email.updateRecordStatus(params.userEmailId,params.userid,function(err,result){
console.log(result);
});
Email.updateRecordStatus(params.userEmailId,params.userid,function(err,result){
console.log(result);
});
// //Update user address status record
Address.updateRecordStatus(params.userAddressId,params.userid,function(err,result){
console.log(result);
});
//Update branch address status record
Address.updateRecordStatus(params.BranchAddressId,params.userid,function(err,result){
console.log(result);
});
 //Update user phoen number status record
PhoneNumber.updateRecordStatus(params.userPhnId,params.userid,function(err,result){
console.log(result);
});

//Update branch phoen number status record
PhoneNumber.updateRecordStatus(params.branchPhnId,params.userid,function(err,result){
console.log(result);
});
//Update Organisation status record
Organisation.updateRecordStatus(params.organisationId,params.userid,function(err,result){
console.log(result);
});
//Update Branch status record
Branch.updateRecordStatus(params.branchId,params.userid,function(err,result){
console.log(result);
});
// //Update user status record
User.updateRecordStatus(params.userid,params.userid,function(err,result){
console.log(result);
});
// //Update payment preferences status record
PaymentPreference.updateRecordStatus(params.paymentPreferenceId,params.userid,function(err,result){
console.log(result);
});
// //Update service provided by organisation status record
ServiceProvidedByOrganisation.updateRecordStatus(params.serviceProvidedByOrgId,params.userid,function(err,result){
console.log(result);
});
}
  ],function (err,result){


});

        }
            callback();
          });
        }
      });
    }

  });
}

// Register an user by admin/superadmin
var registration_save = function registration_save(userId, data, callback) {
  //Save address user
  var params = new Object();
  async.series([
    function getUserAddressId(callback) {
       for (var index = 0; index < data.userInfo.address.length; index++) {
        Address.saveAddress(data.userInfo.address[index], function(err, result) {
          
          params.userAddressId = result;
           console.log("_addressIdUser " + params.userAddressId);
          callback(null, params.userAddressId);
        });
      }

    },
    function getBranchAddressId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        Address.saveAddress(data.organisation.organisationBranches[index].address[0], function(err, result) {
          params.BranchAddressId = result;
          console.log("_addressIdBranch " + result);
          callback(null, params.BranchAddressId);
        });
      }

    },
    function getUserEmailId(callback) {
      for (var index = 0; index < data.userInfo.emails.length; index++) {
        Email.saveEmails(data.userInfo.emails[index], function(err, result) {
          params.userEmailId = result;
          console.log("_userEmailId " + params.userEmailId);
          callback(null, params.userEmailId);
        });
      }

    },
    function getBranchEmailId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        Email.saveEmails(data.organisation.organisationBranches[index].emails[0], function(err, result) {
          params.branchEmailId = result;
          console.log("_branchEmailId " + params.branchEmailId);
          callback(null, params.branchEmailId);
        });
      }

    },
    function getUserPhnId(callback) {
      for (var index = 0; index < data.userInfo.phoneNumbers.length; index++) {
        PhoneNumber.savePhoneNumbers(data.userInfo.phoneNumbers[index], function(err, result) {
          //_phnToUser = result;
          params.userPhnId = result;
          console.log("_phnToUser" + params.userPhnId);
          callback(null, params.userPhnId);
        });
      }

    },
    function getBranchPhnId(callback) {
      for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
        PhoneNumber.savePhoneNumbers(data.organisation.organisationBranches[index].phoneNumbers[0], function(err, result) {
          params.branchPhnId = result;
          console.log("_phnToBranch" + params.branchPhnId);
          callback(null, params.branchPhnId);
        });
      }

    },
    function getOrgId(callback) {
      Organisation.saveOrganisation(data.organisation, function(err, result) {
        params.organisationId = result;
        console.log("org Id" + params.organisationId);
        callback(null, params.organisationId);
      });

    }

  ], function(err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
      async.series([


        function getBranchId(callback) {
          for (var index = 0; index < data.organisation.organisationBranches.length; index++) {
            Branch.saveOrganisationBranch(data.organisation.organisationBranches[index], params.organisationId, params.BranchAddressId, function(err, result) {
              params.branchId = result;
              console.log("branch Id" + params.branchId);
              callback(null, params.branchId);
            });
          }

        }
      ], function(err, result) {

        if (err) {
          console.log(err);
          return;
        } else {
          async.series([
            function getUserId(callback) {
              User.saveUser(data.userInfo, params.organisationId, params.branchId, params.userAddressId, function(err, result) {
                params.userid = result;
                console.log("userID" + params.userid);
                callback(null, params.userid);
              });

            }

          ], function(err, result) {
              
          if (err) {
              console.log(err);
            return;
        } else {
async.series([

function saveEmailTouser(callback) {
  EmailToUser.saveEmailToUser(params.userEmailId, params.userid, function(err, result) {
    callback(null,null);
  });
},
function saveEmailToBranch(callback) {
  EmailToBranch.saveEmailToBranch(params.branchEmailId, params.branchId, function(err, result) {
   callback(null, null);
  });
  
},
function savePhnToUser(callback) {
  PhnNumToUser.savePhoneNumbersToUser(params.userPhnId, params.userid, function(err, result) {
    callback(null, null);
  });
},
function savePhnToBranch(callback) {
  PhnNumToBranch.savePhoneNumbersToBranch(params.branchPhnId,params.branchId, function(err, result) {
    callback(null, null);
  });
  
},
function saveAddToUSer(callback) {
  AddressToUser.saveAddressToUser(params.userAddressId, params.userid, function(err, result) {
    callback(null, null);
  });
  
},
function saveAddToBranch(callback) {
  AddressToBranch.saveAddressToBranch(params.BranchAddressId, params.branchId, function(err, result) {
    callback(null, null);
  });
  
},
function savePaymentPreference(callback) {
  PaymentPreference.saveOrganisationPaymentPreference(params.organisationId,data.organisation.paymentModesId[0], function(err, result) {
    params.paymentPreferenceId = result;
    console.log("_paymentPreferenceId "+params.paymentPreferenceId);
     callback(null,params.paymentPreferenceId);
  });
 
},
function saveServiceProvidedByOrganisation(callback) {
  ServiceProvidedByOrganisation.saveOrganisationService(params.organisationId,data.organisation.servicesId[0], function(err, result) {
    params.serviceProvidedByOrgId = result;
    console.log("_serviceProvidedByOrgId "+params.serviceProvidedByOrgId);
    callback(null, params.serviceProvidedByOrgId);
  });
  
},
function updateStatusRecord(callback){

//Update enail status record
Email.updateRecordStatus(params.userEmailId,userId,function(err,result){
});
Email.updateRecordStatus(params.userEmailId,userId,function(err,result){
});
// //Update user address status record
Address.updateRecordStatus(params.userAddressId,userId,function(err,result){
});
//Update branch address status record
Address.updateRecordStatus(params.BranchAddressId,userId,function(err,result){
});
 //Update user phoen number status record
PhoneNumber.updateRecordStatus(params.userPhnId,userId,function(err,result){
});
//Update branch phoen number status record
PhoneNumber.updateRecordStatus(params.branchPhnId,userId,function(err,result){
});
//Update Organisation status record
Organisation.updateRecordStatus(params.organisationId,userId,function(err,result){
});
//Update Branch status record
Branch.updateRecordStatus(params.branchId,userId,function(err,result){
});
//Update user status record
User.updateRecordStatus(params.userid,userId,function(err,result){
});
//Update payment preferences status record
PaymentPreference.updateRecordStatus(params.paymentPreferenceId,userId,function(err,result){
});
//Update service provided by organisation status record
ServiceProvidedByOrganisation.updateRecordStatus(params.serviceProvidedByOrgId,userId,function(err,result){
});
}
  ],function (err,result){
    
});
        }
        callback();
          });
        }
      });
    }
  });

}

// Add a new user to an existing organisation
var add_user = function add_user(userId, data, callback) {
  var params = new Object();
  async.series([
    function getUserAddressId(callback) {
       for (var index = 0; index < data.userInfo.address.length; index++) {
        Address.saveAddress(data.userInfo.address[index], function(err, result) {
          params.userAddressId = result;
          callback(null, params.userAddressId);
        });
      }
    },
    function getUserEmailId(callback) {
      for (var index = 0; index < data.userInfo.emails.length; index++) {
        Email.saveEmails(data.userInfo.emails[index], function(err, result) {
          params.userEmailId = result;
          callback(null, params.userEmailId);
        });
      }
    },
    function getUserPhnId(callback) {
      for (var index = 0; index < data.userInfo.phoneNumbers.length; index++) {
        PhoneNumber.savePhoneNumbers(data.userInfo.phoneNumbers[index], function(err, result) {
          params.userPhnId = result;
          console.log("_phnToUser" + params.userPhnId);
          callback(null, params.userPhnId);
        });
      }

    }
  ], function(err, result) {
    if (err) {
      console.log(err);
      return;
    } else {
          async.series([
            function getUserId(callback) {
              User.saveUser(data.userInfo, data.organisationId, data.branchId, params.userAddressId, function(err, result) {
                params.userid = result;
                console.log("userID" + params.userid);
                callback(null, params.userid);
              });
            }
          ], function(err, result) {
              
          if (err) {
              console.log(err);
            return;
        } else {
async.series([

function saveEmailTouser(callback) {
  EmailToUser.saveEmailToUser(params.userEmailId, params.userid, function(err, result) {
    callback(null,null);
  });
},
function savePhnToUser(callback) {
  PhnNumToUser.savePhoneNumbersToUser(params.userPhnId, params.userid, function(err, result) {
    callback(null, null);
  });
},
function saveAddToUSer(callback) {
  AddressToUser.saveAddressToUser(params.userAddressId, params.userid, function(err, result) {
    callback(null, null);
  });
},
function updateStatusRecord(callback){
    Email.updateRecordStatus(params.userEmailId,userId,function(err,result){});
    Address.updateRecordStatus(params.userAddressId,userId,function(err,result){});
    PhoneNumber.updateRecordStatus(params.userPhnId,userId,function(err,result){});
    User.updateRecordStatus(params.userid,userId,function(err,result){});
}
  ],function (err,result){

});
        }
        callback();
          });
    }
  });
}

exports.check_username_availability = check_username_availability;
exports.self_registration_save = self_registration_save;
exports.registration_save = registration_save;
exports.add_user = add_user;
