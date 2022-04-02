const mongoose = require("mongoose");
let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus di isi"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxLength: [225, "panjang harus antara 3-225 karakter"],
      minLength: [3, "panjang harus antara 3-225 karakter"],
    },
    userName: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxLength: [225, "panjang harus antara 3-225 karakter"],
      minLength: [3, "panjang harus antara 3-225 karakter"],
    },
    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
      maxLength: [225, "panjang harus antara 3-225 karakter"],
      minLength: [3, "panjang harus antara 3-225 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    avatar: { type: String },
    fileName: { type: String },
    phoneNumber: {
      type: String,
      require: [true, "Nomor harus diisi"],
      maxLength: [13, "panjang harus antara 9-13 karakter"],
      minLength: [9, "panjang harus antara 9-13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Player", playerSchema);
