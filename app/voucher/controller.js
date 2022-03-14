const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config");
module.exports = {
  index: async (req, res) => {
    try {
      let alertMessage = req.flash("alertMessage");
      let alertStatus = req.flash("alertStatus");
      let alert = { message: alertMessage, status: alertStatus };

      const voucher = await Voucher.find().populate("nominals").populate("category");
      res.render("admin/voucher/view_voucher", { voucher, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", { category, nominal });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      if (req.file) {
        console.log(req.file);
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let fileName = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);
        console.log("dest: ", dest);
        src.pipe(dest);

        src.on("end", async () => {
          try {
            console.log("src:", src);
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnail: fileName,
            });
            await voucher.save();
            req.flash("alertMessage", "Berhasil Tambah Voucher");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (error) {
            console.log(error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });
        await voucher.save();
        req.flash("alertMessage", "Berhasil Tambah Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },

  viewEdit: async (req, res) => {
    try {
      let { id } = req.params;
      const category = await Category.find();
      const nominal = await Nominal.find();
      let voucher = await Voucher.findOne({ _id: id }).populate("nominals").populate("category");

      res.render("admin/voucher/edit", { voucher, nominal, category });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/nominal");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;
      const { id } = req.params;
      if (req.file) {
        console.log(req.file);
        let tmp_path = req.file.path;
        let originaExt = req.file.originalname.split(".")[req.file.originalname.split(".").length - 1];
        let fileName = req.file.filename + "." + originaExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${fileName}`);

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id });

            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await Voucher.findByIdAndUpdate(
              {
                _id: id,
              },
              {
                name,
                category,
                nominals,
                thumbnail: fileName,
              }
            );

            req.flash("alertMessage", "Berhasil Ubah Voucher");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (error) {
            console.log(error);
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", `danger`);
            res.redirect("/voucher");
          }
        });
      } else {
        await Voucher.findByIdAndUpdate(
          {
            _id: id,
          },
          {
            name,
            category,
            nominals,
          }
        );

        req.flash("alertMessage", "Berhasil Ubah Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", `danger`);
      res.redirect("/voucher");
    }
  },
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
