const express = require("express");
const route = express.Router();
const verify = require("../auth/verify");
const controller = require("../controller/user.controller");

route.get("/", (req, res) => {
  res.send("Welcome");
});

route.post("/register", controller.register);
route.post("/login", controller.login);
route.post("/refresh", controller.refreshToken);
route.get("/profile", verify.validate, controller.profile);
route.post("/myBooking", verify.validate, controller.myBooking);
route.post("/updateMyBooking", controller.updateMyBooking);

// module.exports = route;
module.exports = route;
