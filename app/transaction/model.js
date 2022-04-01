const mongoose = require("mongoose");

let transactionSchema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: [true, "Nama game harus di isi"] },
      category: { type: String, require: [true, "Kategori harus di isi"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Nama koin harus di isi"] },
      coinQuantity: { type: String, require: [true, "Jumlah koin harus di isi"] },
      price: { type: Number },
    },
    historyPayment: {
      name: { type: String, require: [true, "Nama harus diisi"] },
      type: { type: String, require: [true, "Tipe harus diisi"] },
      bankName: { type: String, require: [true, "Nama Bank harus diisi"] },
      noRekening: { type: String, require: [true, "No rekening harus diisi"] },
    },
    name: {
      type: String,
      require: [true, "nama harus diisi"],
      maxLength: [225, "panjang harus antara 3-225 karakter"],
      minLength: [3, "panjang harus antara 3-225 karakter"],
    },
    accountUser: {
      type: String,
      require: [true, "nama  akun harus diisi"],
      maxLength: [225, "panjang harus antara 3-225 karakter"],
      minLength: [3, "panjang harus antara 3-225 karakter"],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },

    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    historyUser: {
      name: {
        type: String,
        require: [true, "nama player harus diisi"],
        phoneNumber: {
          type: Number,
          require: [true, "nomor hp harus diisi"],
          maxLength: [13, "panjang harus antara 9-13 karakter"],
          minLength: [9, "panjang harus antara 9-13 karakter"],
        },
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Transaction", transactionSchema);
