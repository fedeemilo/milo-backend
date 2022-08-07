const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let clienteSchema = new Schema({
  nombre: {
    type: String
  },
  apellido: {
    type: String
  },
  direccion: {
    type: String
  },
  telefono: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Por favor, agrega un email válido."
    ]
  },
  observaciones: {
    type: String
  },
  reparaciones: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reparacion'
      }
  ]
});

module.exports = mongoose.model("Cliente", clienteSchema);
