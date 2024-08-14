const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    console.log(req.cookies.token);
    console.log(req.header("Authorization".replace("Bearer", "")));
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer", "");
    console.log("token is->", token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload);
      req.user = payload;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
};
