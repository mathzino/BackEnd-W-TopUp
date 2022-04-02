const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.find().populate("player");
      console.log("transaction >>", transaction);
      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
        name: req.session.user.name,
        title: "Halaman transaction",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/transaction");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;
      await Transaction.findByIdAndUpdate({ _id: id }, { status });
      req.flash("allertMessage", "Berhasil ubah status");
      req.flash("allertStatus", "succsess");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("allertMessage", `${error.message}`);
      req.flash("allertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
