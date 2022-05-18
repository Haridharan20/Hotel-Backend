const RoomModel = require("../model/room.model");
const hotelController = require("../controller/hotel.controller");
const roomController = {
  addRoom: (req, res) => {
    const { hotel_id, roomtype, price, capacity } = req.body;
    const model = RoomModel({
      hotel_id,
      roomtype,
      price,
      capacity,
    });
    model
      .save()
      .then((result) => {
        res.json({
          roomid: result._id,
          msg: "Added successfully",
        });
      })
      .catch((err) => {
        res.json("Error");
      });
  },

  getRooms: (req, res) => {
    RoomModel.find({ hotel_id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json("Error");
      });
  },

  getRoom: (req, res) => {
    RoomModel.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log("Error");
      });
  },

  updateBooking: (req, res) => {
    console.log("called");
    console.log(req.body.id);
    RoomModel.updateOne(
      { _id: req.body.id },
      { $push: { bookings: req.body.dates } },
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

  updateRoom: (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    RoomModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        roomtype: req.body.roomtype,
        capacity: req.body.capacity,
        price: req.body.price,
      },
      null,
      (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          res.json({ msg: "Update Successfully" });
        }
      }
    );
  },

  deleteRoom: (req, res) => {
    console.log("delete");
    console.log(req.params);
    RoomModel.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ msg: "Deleted Successfully" });
      }
    });
  },

  deleteAllRooms: (req, res) => {
    RoomModel.deleteMany({ hotel_id: req.params.id })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  cancelBooking: (req, res) => {
    console.log(req.body);
    RoomModel.updateOne(
      { _id: req.body.roomId },
      {
        $pull: {
          bookings: {
            from: req.body.from,
            to: req.body.to,
            user: req.body.userId,
          },
        },
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          console.log(result);
          res.send(result);
        }
      }
    );
  },
};
module.exports = roomController;
