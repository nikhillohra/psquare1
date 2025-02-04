const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected Successfully");
  } catch (err) {
    console.error("Database Connection Failed", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
