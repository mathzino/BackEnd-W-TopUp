const Bank = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const bank = await Bank.find();
      res.render("admin/bank/view_bank", { bank, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, noRekening, nameBank } = req.body;
      let bank = await Bank({ name, noRekening, nameBank });
      await bank.save();
      req.flash("alertMessage", "Berhasil Tambah Kategori");
      req.flash("alertStatus", "success");

      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/bank");
    }
  },

  //   viewEdit: async (req, res) => {
  //     try {
  //       let { id } = req.params;

  //       let nominal = await Nominal.findOne({ _id: id });

  //       res.render("admin/nominal/edit", { nominal });
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/nominal");
  //     }
  //   },
  //   actionEdit: async (req, res) => {
  //     try {
  //       let { id } = req.params;
  //       let { coinQuantity, price, coinName } = req.body;
  //       await Nominal.findOneAndUpdate({ _id: id }, { coinQuantity, price, coinName });
  //       req.flash("alertMessage", "Berhasil Ubah Data Coin");
  //       req.flash("alertStatus", "success");
  //       res.redirect("/nominal");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/nominal");
  //     }
  //   },
  //   actionDelete: async (req, res) => {
  //     try {
  //       let { id } = req.params;
  //       await Nominal.findOneAndDelete({ _id: id });
  //       req.flash("alertMessage", "Berhasil Delete Data Nominal");
  //       req.flash("alertStatus", "success");
  //       res.redirect("/nominal");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", `danger`);
  //       res.redirect("/nominal");
  //     }
  //   },
};
