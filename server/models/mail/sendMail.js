'use strict';

var aws     = require('aws-sdk');

var email   = "contact@subhashsingh.co.in";
    
aws.config.loadFromPath('./config/aws.config.json');

var ses = new aws.SES()

// Sending test mail
var testMail = function testMail(to, subject, body)
{
	var ses_mail = "From: 'Node app' <" + email + ">\n";
    ses_mail = ses_mail + "To: " + to + "\n";
    ses_mail = ses_mail + subject;
    ses_mail = ses_mail + "MIME-Version: 1.0\n";
    ses_mail = ses_mail + "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail = ses_mail + "--NextPart\n";
    ses_mail = ses_mail + "Content-Type: text/html; charset=us-ascii\n\n";
    ses_mail = ses_mail + body;
    
    var params = {
        RawMessage: { Data: new Buffer(ses_mail) },
        Destinations: [ email ],
        Source: "'Subhash Kumar' <" + email + ">'"
    };
    
    ses.sendRawEmail(params, function(err, data) {
        if(err) {
            res.send(err);
        } 
        else {
            res.send(data);
        }           
    });
}

exports.testMail = testMail;