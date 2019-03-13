const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    login: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String},
    password: { type: String,  required: true }
  },
  {
    collection: "users",
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updateAt"
    }
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
