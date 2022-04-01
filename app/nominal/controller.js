const Nominal = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", { nominal, alert, name: req.session.user.name, title: "Halaman Nominal" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create", { name: req.session.user.name, title: "Halaman Nominal" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinQuantity, price, coinName } = req.body;
      let nominal = await Nominal({ coinQuantity, price, coinName });
      await nominal.save();
      req.flash("alertMessage", "Berhasil Tambah Kategori");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },

  viewEdit: async (req, res) => {
    try {
      let { id } = req.params;

      let nominal = await Nominal.findOne({ _id: id });

      res.render("admin/nominal/edit", { nominal, name: req.session.user.name, title: "Halaman Kategori" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      let { id } = req.params;
      let { coinQuantity, price, coinName } = req.body;
      await Nominal.findOneAndUpdate({ _id: id }, { coinQuantity, price, coinName });
      req.flash("alertMessage", "Berhasil Ubah Data Coin");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionDelete: async (req, res) => {
    try {
      let { id } = req.params;
      await Nominal.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil Delete Data Nominal");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
};
