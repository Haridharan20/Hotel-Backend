const UserModel = require("../model/user.model");
const encrypt = require("bcrypt");
const jwt = require("../auth/token");
require("dotenv/config");
const { REFRESH_TOKEN } = process.env;
const userController = {
  register: async (req, res) => {
    const { username, email, phonenumber, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const userPhone = await UserModel.findOne({ phone: phonenumber });
    if (userPhone) {
      return res.status(400).json({ msg: "Phonenumber already in use" });
    }
    UserModel.find().distinct(phonenumber, function (error, ids) {
      console.log(ids);
    });
    const hashPass = await encrypt.hash(password, 12);
    const model = new UserModel({
      name: username,
      email: email,
      phone: phonenumber,
      password: hashPass,
    });
    model
      .save()
      .then((result) => res.json({ msg: "Register successfully" }))
      .catch((err) => res.send(err));
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      const user = await UserModel.findOne({ email: username });
      console.log("user", user);
      if (!user) {
        return res.status(400).json({ success: false, msg: "User not found" });
      }
      const match = await encrypt.compare(password, user.password);
      console.log(match);
      if (!match) {
        return res
          .status(400)
          .json({ success: false, msg: "Password not Match" });
      } else {
        const token = await jwt.generateAccessToken(user.email);
        const refreshtoken = await jwt.generateRefreshToken(user.email);
        // console.log("token", token);
        res.json({
          success: true,
          msg: "Logged success",
          data: user,
          token: token,
          refresh: refreshtoken,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  },

  profile: async (req, res, next) => {
    const user = await UserModel.findOne({ email: req.data.email });
    if (user) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bookings: user.myBookings,
      });
    }
  },

  myBooking: (req, res) => {
    console.log(req.body, req.data);
    UserModel.updateOne(
      { email: req.data.email },
      { $push: { myBookings: req.body } },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  },

  updateMyBooking: (req, res) => {
    console.log(req.body);
    UserModel.updateOne(
      { _id: req.body.userId },
      {
        $pull: {
          myBookings: {
            roomId: req.body.roomId,
            bookedOn: req.body.bookingDate,
            Date: { from: req.body.from, to: req.body.to },
          },
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log("res", result);
          res.send(result);
        }
      }
    );
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return res.json("User not found");
    }
    const token = await jwt.tokenValidator(refreshToken, REFRESH_TOKEN);
    // console.log("token", token);
    if (token) {
      const accessToken = jwt.generateAccessToken(token.email);
      return res.json({ accessToken });
    }
  },
};

module.exports = userController;
