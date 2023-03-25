const { model, Schema } = require("mongoose");

const authSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const authModel = model("auth", authSchema);

module.exports = authModel;
