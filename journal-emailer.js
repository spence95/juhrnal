var nodemailer = require('nodemailer');

module.exports = function(fromEmail, toEmail, password, entryDate, entryText) {
  var transporter = nodemailer.createTransport('smtps://sutton1190%40gmail.com:greeneggsandham400@smtp.gmail.com');

  var dd = entryDate.getDate();
  var mm = entryDate.getMonth()+1; //January is 0!
  var yyyy = entryDate.getFullYear();

  var realDate = mm + "/" + dd + "/" + yyyy;

  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: '"Juhrnal" <' + fromEmail + '>', // sender address
      to: toEmail, // list of receivers
      subject: realDate, // Subject line
      text: entryText, // plaintext body
      html: entryText // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      return console.log('Message sent: ' + info.response);
  });

}
