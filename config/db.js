const { default: mongoose } = require("mongoose");
require("dotenv").config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected");
  } catch (error) {
    console.log("error", error.message);
  }
};

module.exports= dbConnect
