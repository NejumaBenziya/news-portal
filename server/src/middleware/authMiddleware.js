const jwt = require("jsonwebtoken");

// Authentication middleware
module.exports = function (
  req,
  res,
  next
) {

  // Get token from request headers
  const token = req.header(
    "Authorization"
  );

  // Check if token exists
  if (!token) {

    return res.status(401).json({
      msg: "No token, authorization denied"
    });
  }

  try {

    // Verify JWT token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach decoded user data to request
    req.user = decoded;

    // Move to next middleware/controller
    next();

  } catch (err) {

    // Invalid token response
    res.status(401).json({
      msg: "Token is not valid"
    });
  }
};