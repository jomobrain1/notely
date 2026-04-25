const express = require("express");
require("dotenv").config();
const notesRouter = require("./routes/notes.route");
const usersRouter = require("./routes/users.route.js");
const { errorHandler } = require("./middlewares/errors.middleware.js");
const connectDb = require("./config/db.js");
const cors = require("cors");

const PORT = process.env.PORT || 5000;
const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://notely-frontend-sepia.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// Middlewares
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    name: "Notes API",
    version: "v1",
    status: "Active",
  });
});

//connectDb
connectDb();

app.use("/api/notes", notesRouter);
app.use("/api/users", usersRouter);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
}

module.exports = app;
