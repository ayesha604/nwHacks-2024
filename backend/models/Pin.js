const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long: {
      type: Number,
    },
    resources: {
      wifi: {
        yes: Number,
        no: Number,
      },
      outlets: {
        yes: Number,
        no: Number,
      },
      washroom: {
        yes: Number,
        no: Number,
      },
      food: {
        yes: Number,
        no: Number,
      },
      twentyfourhr: {
        yes: Number,
        no: Number,
      },
      menstrual: {
        yes: Number,
        no: Number,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);
