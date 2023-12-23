const nodemailer = require('nodemailer');

async function sendConfirmationEmail(email, firstName, validationStatus) {
  // Your Gmail API credentials
  const clientId = '639432368584-odbo96ocdmre9fprjn245uo7r7mbkr3b.apps.googleusercontent.com';
  const clientSecret = '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';
  const refreshToken = '1//04LCxl1Io_pSDCgYIARAAGAQSNwF-L9IrHOmeL8wywSBYuc5gK3aU24y-Rop4BrUaSoihF4o3EjvwtbOsEC81kpQCshBqCNZO2Us';
  const accessToken = 'ya29.a0AfB_byBrqEmqh0innojIHyzw8c_tlD9Fq33pSQAmh2OvMWG-kVocBx2AZ8ENbqOPB6JZa355a5kTrvKQeK5GLrHGFt3V1nwjSy-AHsugn6mESnvnfRxWt3VQ8Y8ynwVTnLqlYRT7ZL4jv-UrM32nr2E80JdA3yzJDlNwaCgYKAdsSARESFQHGX2Micq9LIg9fIdT9P8TljDBkPw0171';


  // Create a Nodemailer transporter using OAuth2
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'freakyfred376@gmail.com',
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
      redirectUri: 'https://developers.google.com/oauthplayground',
    },
  });

  const subject =
    validationStatus === 'approved'
      ? 'Welcome to LAWA Organization'
      : 'LAWA Organization - Registration Update';

  const text =
    validationStatus === 'approved'
      ? `Hi ${firstName},\n\nCongratulations! You have been approved to join LAWA Organization. Welcome aboard!\n\nBest regards,\nThe LAWA Team`
      : `Hi ${firstName},\n\nWe regret to inform you that your registration with LAWA Organization has been rejected. If you have any questions, please contact us.\n\nBest regards,\nThe LAWA Team`;

  const mailOptions = {
    from: 'freakyfred376@gmail.com',
    to: email,
    subject: subject,
    text: text,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmationEmail;
