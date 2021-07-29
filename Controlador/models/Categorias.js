const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  name: { type: String },
  description: { type: String },
  user_id: { type: String },
});

module.exports = model("categories", categoriaSchema);
