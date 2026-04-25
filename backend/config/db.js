const mongoose = require("mongoose");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

let connectionPromise = null;

const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not configured");
    }

    let safeMongoTarget = "invalid Mongo URI";
    try {
      const parsedUri = new URL(MONGO_URI);
      safeMongoTarget = `${parsedUri.protocol}//${parsedUri.host}${parsedUri.pathname}`;
    } catch {
      // Keep a safe fallback if URL parsing fails.
    }

    console.log(`Connecting to MongoDB: ${safeMongoTarget}`);

    connectionPromise = mongoose.connect(MONGO_URI);
    await connectionPromise;
    console.log("Database connected successfully");
    return mongoose.connection;
  } catch (error) {
    connectionPromise = null;
    console.log("Database connection error:", error);

    if (error?.name === "MongooseServerSelectionError") {
      console.log(
        "MongoDB server selection failed. Check Atlas network access, cluster hostname, and whether the database user can reach the cluster.",
      );
    }

    if (!process.env.VERCEL) {
      process.exit(1);
    }

    throw error;
  }
};

module.exports = connectDb;
