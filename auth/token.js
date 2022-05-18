const jwt = require("jsonwebtoken");
require("dotenv/config");
const { ACCESS_TOKEN, REFRESH_TOKEN } = process.env;
const generateAccessToken = (email) => {
  const token = jwt.sign({ email }, ACCESS_TOKEN, {
    expiresIn: "15m",
  });
  return token;
};

const generateRefreshToken = (email) => {
  const token = jwt.sign({ email }, REFRESH_TOKEN, {
    expiresIn: "1h",
  });
  return token;
};

const tokenValidator = async (token, secret) => {
  try {
    const data = await jwt.verify(token, secret);
    return data;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.log("Token expire");
      return false;
    }
    // console.log("error secret", err);
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  tokenValidator,
};
