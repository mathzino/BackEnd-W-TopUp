const Category = require("./model");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const category = await Category.find();
      res.render("admin/category/view_category", { category, alert, name: req.session.user.name, title: "Halaman Kategori" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create", { name: req.session.user.name, title: "Halaman Kategori" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name });
      await category.save();
      req.flash("alertMessage", "Berhasil Tambah Kategori");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res) => {
    try {
      let { id } = req.params;

      let category = await Category.findOne({ _id: id });

      res.render("admin/category/edit", { category, name: req.session.user.name, title: "Halaman Kategori" });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  actionEdit: async (req, res) => {
    try {
      let { id } = req.params;
      let { name } = req.body;
      await Category.findOneAndUpdate({ _id: id }, { name });
      req.flash("alertMessage", "Berhasil Ubah Kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
  actionDelete: async (req, res) => {
    try {
      let { id } = req.params;
      await Category.findOneAndDelete({ _id: id });
      req.flash("alertMessage", "Berhasil Delete Kategori");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/category");
    }
  },
};
