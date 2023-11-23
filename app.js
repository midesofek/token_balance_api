const express = require("express");
const cors = require("cors");

const appRouter = require("./routes/appRoutes");

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// routes
app.use("/api/v1", appRouter);

module.exports = app;
