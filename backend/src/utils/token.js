import jwt from 'jsonwebtoken'

export const generateAccessToken = (id) => {

   if (!process.env.JWT_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not defined");
  }
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "15m"
  });
};

export const generateRefreshToken = (id) => {

   if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_ACCESS_SECRET not defined");
  }
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d"
  });
};