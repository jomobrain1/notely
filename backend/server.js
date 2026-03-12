const express = require("express");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const notesRouter = require("./routes/notes.route");
const usersRouter = require("./routes/users.route.js");
const { errorHandler } = require("./middlewares/errors.middleware.js");
const connectDb = require("./config/db.js");
const cors = require("cors");
app.get("/", (req, res) => {
  res.json({
    name: "Notes API",
    version: "v1",
    status: "Active",
  });
});

//connectDb
connectDb();

// Middlewares
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
