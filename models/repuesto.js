const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let repuestoSchema = new Schema({
  nombre: {
    type: String,
    unique: [true, "El nombre del respuesto debe ser único"],
    required: [true, "El nombre del repuesto es obligatorio"]
  },
  descripcion: {
    type: String
  },
  cantidad: {
    type: Number
  },
  ubicacion: {
    type: String,
    required: [true, "La ubicación del repuesto es obligatoria"]
  },
  datasheet: {type: Object,  url: String, public_id: String },
  images: [{ url: String, public_id: String }]
});

module.exports = mongoose.model("Repuesto", repuestoSchema);
