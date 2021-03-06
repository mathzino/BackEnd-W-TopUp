const Bank = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const bank = await Bank.find();
      res.render("admin/bank/view_bank", { bank, alert, name: req.session.user.name, title: "Halaman Bank" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", { name: req.session.user.name, title: "Halaman Bank" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, noRekening, bankName } = req.body;
      let bank = await Bank({ name, noRekening, bankName });
      await bank.save();
      req.flash("alertMessage", "Berhasil Tambah Data Rekening Bank");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },

  viewEdit: async (req, res) => {
    try {
      let { id } = req.params;

      let bank = await Bank.findOne({ _id: id });

      res.render("admin/bank/edit", { bank, name: req.session.user.name, title: "Halaman Bank" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionEdit: async (req, res) => {
    try {
      let { id } = req.params;
      let { name, bankName, noRekening } = req.body;
      await Bank.findOneAndUpdate({ _id: id }, { name, bankName, noRekening });
      req.flash("alertMessage", "Berhasil Ubah Data Rekening Bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionDelete: async (req, res) => {
    try {
      let { id } = req.params;
      await Bank.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil Delete Data Rekening Bank");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
};
