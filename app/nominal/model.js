let mongoose = require("mongoose");
let nominalSchema = mongoose.Schema({
  coinQuantuty: {
    type: Number,
    default: 0,
  },
  coinName: {
    type: String,
    require: [true, "Nama Koin harus di isi"],
  },
  price: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
