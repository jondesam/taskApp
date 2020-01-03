const sgMail = require("@sendgrid/mail");
  
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//   to: "marusoki@gmail.com",
//   from: "godaiys@hotmail.com",
//   subject: "This is my first creation",
//   text: "I hope this text get to you"
// });

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "godaiys@hotmail.com",
    subject: "Thanks for joining in",
    text: `Welcome to the app, ${name}. let me know how you get along with the app. `
  });
};

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "godaiys@hotmail.com",
    subject: "Good bye",
    text: `Hope you can come back ${name}`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail
};
