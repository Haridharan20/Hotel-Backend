const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema(
  {
    hotel_id: {
      type: String,
      required: true,
    },
    roomtype: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    bookings: {
      type: [Object],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", RoomSchema);
module.exports = RoomModel;
