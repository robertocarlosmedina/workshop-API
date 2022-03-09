const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const presentation = require("./routes/presentation.js");
const user_registration = require("./routes/registrationRoutes.js");
const user_routes = require("./routes/userAuth.js");

app.disable("x-powered-by");
app.use(express.urlencoded({ extended: true }));

// ------------------------ End points -----------------------
app.use("/", presentation);
app.use("/user_auth", user_routes);
app.use("/user_register", user_registration);

module.exports = app;
