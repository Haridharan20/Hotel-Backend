const express = require("express");
const route = express.Router();
const verify = require("../auth/verify");
const multer_profile = require("../Multer/multer_profile");
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
route.post("/payment", controller.payment);
route.post(
  "/updateProfile",
  multer_profile.single("image"),
  controller.profileUpdate
);

module.exports = route;
