import transporter from "../config/nodemailer.js";

const sendEmail = async ( to, subject, text ) => {
  const response = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });

  return response;
};

export default sendEmail;
