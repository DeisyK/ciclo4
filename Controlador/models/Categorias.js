const { Schema, model } = require("mongoose");

const categoriaSchema = new Schema({
  nombres: { type: String },
  apellidos: { type: String },
  fecha_de_nacimiento: { type: Date },
  pais: { type: String },
  ciudad: { type: String },
  localidad: { type: String },
  direccion: { type: String },
  telefono_fijo: { type: String },
  telefono_movil: { type: String },
  profesion: { type: String },
  notas: { type: String },
  email: { type: String },
  usuario: { type: Number },
});

module.exports = model("categories", categoriaSchema);
