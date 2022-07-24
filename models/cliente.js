const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let clienteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del cliente es obligatorio"]
  },
  apellido: {
    type: String,
    required: [true, "El apellido del cliente es obligatorio"]
  },
  direccion: {
    type: String,
    required: [true, "La dirección del cliente es obligatoria"]
  },
  telefono: {
    type: Number,
    required: [true, "El teléfono del cliente es obligatorio"]
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
