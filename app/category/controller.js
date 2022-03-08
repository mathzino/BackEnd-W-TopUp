module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "ExpressJs",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
