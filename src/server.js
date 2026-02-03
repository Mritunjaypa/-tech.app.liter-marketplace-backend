const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

// DB connect
const dbconnect = require("./config/database");
dbconnect();

// CORS
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

// body parser
app.use(express.json());

// ✅ STATIC MEDIA FOLDER
app.use(
  "/public",
  express.static(path.join(__dirname, "../public"))
);

// routes
const apiRoutes = require("./routes/api.route");
app.use("/api/v1", apiRoutes);

// server start
app.listen(PORT, () => {
  console.log(`Server started successfully at ${PORT}`);
});
