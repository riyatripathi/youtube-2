const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database/db"); // Import the database module
const expressSession = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const logger = require("./logger");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
/* const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 50, // Max request per minute
	message: "Too many requests from this IP, please try again later."
});
*/
// app.use(limiter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET, // Change this to a secret phrase for encoding session ID
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Include the route modules
const indexRoutes = require("./routes/index");
const adminRoutes = require("./routes/admin");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

// Use the route modules
app.use("/", indexRoutes);
app.use("/admin", adminRoutes);
app.use("/", productRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
