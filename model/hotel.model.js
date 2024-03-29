const mongoose = require("mongoose");

const HotelSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  admin_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  address: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
  ],

  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  contact_no: {
    type: Number,
    required: true,
    unique: true,
  },

  images: {
    type: [String],
    required: true,
  },
  ratings: {
    type: Number,
    default: 0,
  },
});

const HotelModel = mongoose.model("Hotel", HotelSchema);
module.exports = HotelModel;
