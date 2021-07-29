const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String },
  address: { type: String },
  birthdate: { type: Date },
  country: { type: String },
  cellphone: { type: String },
  notes: { type: String },
  email: { type: String },
  surname: { type: String },
  category_id: { type: String },
  user_id: { type: String },
});

module.exports = model("contacts", userSchema);
