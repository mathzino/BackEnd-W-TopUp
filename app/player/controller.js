const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Payment = require("../payment/model");
const Nominal = require("../nominal/model");
const Bank = require("../bank/model");
module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find().select("_id name status category thumbnail").populate("category");
      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findOne({ _id: id }).populate("category").populate("nominals").populate("user", "_id name phoneNumber");
      if (!voucher) {
        return res.status(404).json({ message: "voucher game tidak ditemukan" });
      }
      res.status(200).json({ data: voucher });
    } catch (err) {
      res.status(500).json({ message: err.message || "Internal server error" });
    }
  },
  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category });
    } catch (err) {
      res.status(500).json({ message: err.message || `internal server error` });
    }
  },
  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;
      const res_voucher = await Voucher.findOne({ _id: voucher }).select("name category _id thumbnail user ").populate("category").populate("user");
      if (!res_voucher) {
        return res.status(404).json({ message: "voucher game tidak ditemukan" });
      }
      const res_nominal = await Nominal.findOne({ _id: nominal });
      if (!res_nominal) {
        return res.status(404).json({ message: "nominal game tidak ditemukan" });
      }
      const res_payment = await Payment.findOne({ _id: payment });
      if (!res_payment) {
        return res.status(404).json({ message: "payment tidak ditemukan" });
      }
      const res_bank = await Bank.findOne({ _id: bank });
      if (!res_bank) {
        return res.status(404).json({ message: "bank tida ditemukan" });
      }
      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price - tax;
      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category ? res_voucher._doc.category.name : "",
          thumbnail: res_voucher._doc.thumbnail,
          price: res_voucher._doc.price,
          coinName: res_voucher._doc.coinName,
          coinQuantity: res_voucher._doc.coinQuantity,
        },
        historyPayment: {
          name: res_payment._doc.name,
          type: res_payment._doc.type,
          bankName: res_payment._doc.bankName,
          noRekening: res_payment._doc.noRekening,
        },
        name: name,
        accountUser: accountUser,
        tax: tax,
        value: value,
        // player: req.player._id,
        historyUser: {
          name: res_voucher._doc.user?._id,
          phoneNumber: res_voucher._doc.user?.phoneNumber,
        },
        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };
      res.status(201).json({
        data: payload,
      });
    } catch (err) {
      res.status(500).json({ message: err.message || `internal server error ` });
    }
  },
};
