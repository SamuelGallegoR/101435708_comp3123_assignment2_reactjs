const mongoose = require('mongoose');

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://samuelgallegorivera:jtzghA08PtTglrPC@cluster0.nkydv.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${MONGO_URI}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
