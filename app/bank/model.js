let mongoose = require("mongoose");
let bankSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama Pemilik harus di isi"],
    },
    nameBank: {
      type: String,
      require: [true, "Nama Bank harus di isi"],
    },
    noRekening: {
      type: String,
      require: [true, "Nomor rekening bank harus di isi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
