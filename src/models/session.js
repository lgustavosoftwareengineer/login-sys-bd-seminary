const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Session = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  data: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("sessions", Session);
