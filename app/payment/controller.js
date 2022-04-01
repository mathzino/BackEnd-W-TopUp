const Payment = require("./model");
const Bank = require("../bank/model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find().populate("banks");
      res.render("admin/payment/view_payment", { payment, alert, name: req.session.user.name, title: "Halaman Payment" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      let banks = await Bank.find();
      res.render("admin/payment/create", { banks, name: req.session.user.name, title: "Halaman Payment" });
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

  viewEdit: async (req, res) => {
    try {
      let { id } = req.params;
      let banks = await Bank.find();
      let payment = await Payment.findOne({ _id: id }).populate("banks");

      res.render("admin/payment/edit", { payment, banks, name: req.session.user.name, title: "Halaman Payment" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionEdit: async (req, res) => {
    try {
      let { id } = req.params;
      let { banks, type } = req.body;
      await Payment.findOneAndUpdate({ _id: id }, { banks, type });
      req.flash("alertMessage", "Berhasil Ubah Data Payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
  actionDelete: async (req, res) => {
    try {
      let { id } = req.params;
      await Payment.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil Delete Data Payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },

  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let payment = await Payment.findOne({ _id: id });
      let status = payment.status === "Y" ? "N" : "Y";
      payment = await Payment.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );
      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/payment");
    }
  },
};
