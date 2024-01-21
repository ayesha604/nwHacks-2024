const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    name: {
      type: String,
    },
    lat: {
      type: Number,
    },
    long : {
      type: Number,
    },
    Address: {
      type: String,
    },
    Resources: {
      wifi: Boolean,
      outlets: Boolean,
      washroom: Boolean,
      food: Boolean,
      warm: Boolean
    },
    Description: {
      gn_washroom: Boolean,
      acc_washroom: Boolean,
      Fem_hygiene: Boolean,            
    },
  },
  { timestamps: true }  
);

module.exports = mongoose.model("Pin", PinSchema);
