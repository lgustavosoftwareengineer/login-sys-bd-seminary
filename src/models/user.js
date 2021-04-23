import { Schema, model } from "mongoose";

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cellphone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model("users", User);
