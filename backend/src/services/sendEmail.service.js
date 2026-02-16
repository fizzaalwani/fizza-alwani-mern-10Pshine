import transporter from "../config/nodemailer.js";

const sendEmail = async ({ to, subject, text }) => {
  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

export default sendEmail;
