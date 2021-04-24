import { Schema, model } from "mongoose";

const Session = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model("sessions", Session);
