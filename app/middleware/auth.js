module.exports = {
  isLoginAdmin: (req, res, next) => {
    if (req.session.user == null || req.session == undefined) {
      req.flash("alertMessage", `mohon maaf session anda telah habis mohon login kembali`);
      req.flash("alertStatus", `danger`);
      res.redirect("/");
    } else {
      next();
    }
  },
};
