import logger from "../utils/logger.js";

const errorHandler=(err,req,res,next)=>{
     logger.error(
    {
      method: req.method,
      url: req.originalUrl,
      message: err.message,
      stack: err.stack
    },
    "Unhandled Exception"
  );

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}

export default errorHandler