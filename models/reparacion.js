const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reparacionSchema = new Schema({
  aparato: {
    type: String,
    required: [true, "El aparato a reparar es requerido"]
  },

  marca: {
    type: String
  },

  modelo: {
    type: String
  },

  desperfecto: {
    type: String,
    required: [true, "El desperfecto del aparato es requerido"]
  },

  serie: {
    type: String
  },

  fechaIngreso: {
    type: Date,
    default: Date.now(),
    required: [true, "La fecha de ingreso es requerida"]
  },

  fechaEntrega: {
    type: Date
  },

  presupuesto: {
    type: Number
  },

  importe: {
    type: Number
  },

  observacion: {
    type: String
  },

  estado: {
    type: String,
    default: "INGRESADO" 
  },

  cliente: {
    type: Schema.Types.ObjectId,
    ref: 'Cliente'
  }
});

module.exports = mongoose.model("Reparacion", reparacionSchema);
