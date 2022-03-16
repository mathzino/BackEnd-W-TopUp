const Payment = require("./model");
const Bank = require("../bank/model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find();
      res.render("admin/payment/view_payment", { payment, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      let banks = await Bank.find();
      res.render("admin/payment/create", { banks });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;
      let payment = await Payment({ banks, type });
      await payment.save();
      req.flash("alertMessage", "Berhasil Tambah Payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },

  // viewEdit: async (req, res) => {
  //   try {
  //     let { id } = req.params;

  //     let nominal = await Nominal.findOne({ _id: id });

  //     res.render("admin/nominal/edit", { nominal });
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/nominal");
  //   }
  // },
  // actionEdit: async (req, res) => {
  //   try {
  //     let { id } = req.params;
  //     let { coinQuantity, price, coinName } = req.body;
  //     await Nominal.findOneAndUpdate({ _id: id }, { coinQuantity, price, coinName });
  //     req.flash("alertMessage", "Berhasil Ubah Data Coin");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/nominal");
  //   }
  // },
  // actionDelete: async (req, res) => {
  //   try {
  //     let { id } = req.params;
  //     await Nominal.findOneAndDelete({ _id: id });
  //     req.flash("alertMessage", "Berhasil Delete Data Nominal");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", `${error.message}`);
  //     req.flash("alertStatus", `danger`);
  //     res.redirect("/nominal");
  //   }
  // },
};
