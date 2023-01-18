const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser } = require("./middleware/auth.middleware");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("*", checkUser);

//routes
app.use("/api/user", userRoutes);
//server

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT} `);
});
