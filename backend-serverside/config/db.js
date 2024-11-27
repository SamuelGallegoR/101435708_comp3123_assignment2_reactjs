const mongoose = require('mongoose');
const DB_CONNECTION_STRING ="mongodb+srv://samuelgallegorivera:jtzghA08PtTglrPC@cluster0.nkydv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const DB_CONNECTION_STRING_2 ="mongodb+srv://samuelgallegorivera:jtzghA08PtTglrPC@cluster0.nkydv.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING_2);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;