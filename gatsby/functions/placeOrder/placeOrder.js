const nodemailer = require('nodemailer');

// we use https://ethereal.email/ to fake a mail provider (in prod use postmark, sendgrid...)

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PWD,
  },
});

// test sending an Email

exports.handler = async (event, context) => {
  const info = await transporter.sendMail({
    from: "Slick's slices <slick@example.com>",
    to: 'orders@example.com',
    subject: 'New order!',
    html: `<p>Your pizza order is on the way!!</p>`,
  });
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
