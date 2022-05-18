const express = require("express");
const router = express.Router();
const roomController = require("../controller/room.controller");
router.post("/add", roomController.addRoom);
router.delete("/delete/:id", roomController.deleteRoom);
router.delete("/deleteAll/:id", roomController.deleteAllRooms);
router.put("/updateBooking", roomController.updateBooking);
router.get("/getRooms/:id", roomController.getRooms);
router.get("/getRoom/:id", roomController.getRoom);
router.post("/cancelBooking", roomController.cancelBooking);
router.put("/updateRoom/:id", roomController.updateRoom);

module.exports = router;
