const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create transporter
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  // Define the email options
  const mailOptions = {
    from: 'Derrick Meikan <derrick.meikan@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Actually send the email
  await transport.sendMail(mailOptions);
};

module.exports = sendEmail;
