const express = require("express");
const router = express.Router();
const roomController = require("../controller/room.controller");
const multer_room = require("../Multer/multer_room");
router.post("/add", multer_room.array("images"), roomController.addRoom);
router.delete("/delete/:id", roomController.deleteRoom);
router.delete("/deleteAll/:id", roomController.deleteAllRooms);
router.put("/updateBooking", roomController.updateBooking);
router.get("/getRooms/:id", roomController.getRooms);
router.get("/getRoom/:id", roomController.getRoom);
router.post("/cancelBooking", roomController.cancelBooking);
router.put("/updateRoom/:id", roomController.updateRoom);

module.exports = router;
