let mongoose = require("mongoose");
let categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "nama kategori harus di isi"],
  },
});

module.exports = mongoose.model("Category", categorySchema);
