'use strict';

var welcomeMail = function welcomeMail(name, verificationLink)
{
	var data = '<!doctype html><html><head><meta name="viewport" content="width=device-width" /><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Welcome to node</title></head><body class=""><table border="0" cellpadding="0" cellspacing="0" class="body"><tr><td><p>Dear ' + name + ',</p><p>&nbsp;</p><p>Welcome to node!!! The email address associated with your account is not confirmed. To confirm your email address, please click the following link:</p><p><a href="' + verificationLink + '">Click here to verify your email address</a></p><p>&nbsp;</p><p>If you didn\'t ask for this email, you can safely ignore it.</p><p>&nbsp;</p><p>Best Regards,<br/>The node Team</p></td><td>&nbsp;</td></tr></table></body></html>';
}

exports.welcomeMail = welcomeMail;