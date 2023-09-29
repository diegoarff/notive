import mongoose from "mongoose";

mongoose.connect(<string>process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established");
});

connection.on("error", (err) => {
  console.log(err);
  process.exit(0);
});