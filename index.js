const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoute = require("./routes/user.routes");
const hotelRoute = require("./routes/hotel.routes");
const roomRoutes = require("./routes/room.routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv/config");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const port = 8000;

const uri = process.env.DB_CONNECTION;
mongoose
  .connect(uri)
  .then((result) =>
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    })
  )
  .catch((err) => console.log(err));

app.use("/user", userRoute);
app.use("/hotel", hotelRoute);
app.use("/room", roomRoutes);
