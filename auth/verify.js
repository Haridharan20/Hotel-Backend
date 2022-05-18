const validator = require("./token");
require("dotenv/config");
const { ACCESS_TOKEN } = process.env;
const validate = async (req, res, next) => {
  try {
    jtoken = req.headers.authorization.slice(4);
    const valid = await validator.tokenValidator(jtoken, ACCESS_TOKEN);
    if (valid) {
      req.data = valid;
      next();
    } else {
      res.status(401).send("Access denied");
    }
  } catch (err) {
    res.send(err);
  }
};
module.exports = {
  validate,
};
