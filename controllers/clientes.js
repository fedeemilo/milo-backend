const Cliente = require("../models/cliente");

module.exports = {
  async clientesIndex(req, res) {
    let clientes = await Cliente.find({}).sort("nombre");

    if (!clientes) {
      res.status(400).json({
        ok: false,
        err: "Clientes no encontrados"
      });
    }

    res.status(200).json(clientes);
  },

  async clienteCreate(req, res) {
    let {
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      observaciones
    } = req.body;

    let cliente = new Cliente({
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      observaciones
    });

    cliente.save((err, clienteDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!clienteDB) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        cliente: clienteDB
      });
    });
  },

  getClienteById(req, res) {
    let id = req.params.id;

    Cliente.findById(id, (err, clienteDB) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
      }

      if (!clienteDB) {
        res.status(500).json({
          ok: false,
          err: {
            message: "El ID no es correcto"
          }
        });
      }

      res.json({
        ok: true,
        repuesto: clienteDB
      });
    });
  },

  async updateClienteById(req, res) {
    let { id } = req.params;
    let cliente = await Cliente.findById(id);
    let {
      nombre,
      apellido,
      direccion,
      telefono,
      email,
      observaciones
    } = req.body;

    cliente.nombre = nombre;
    cliente.apellido = apellido;
    cliente.direccion = direccion;
    cliente.telefono = telefono;
    cliente.email = email;
    cliente.observaciones = observaciones;

    try {
      await cliente.save();
      res.json({
        ok: true,
        cliente
      });
    } catch (error) {
      res.json({
        ok: false,
        error
      });
    }
  },

  deleteClienteById(req, res) {
    let { id } = req.params;

    Cliente.findByIdAndRemove(id, (err, clienteDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!clienteDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "El ID no existe"
          }
        });
      }

      res.json({
        ok: true,
        message: "Repuesto Borrado"
      });
    });
  }
};
