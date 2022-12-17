const Cliente = require("../models/cliente");
const Reparacion = require("../models/reparacion");

module.exports = {
    async reparacionesIndex(req, res) {
        let reparaciones = await Reparacion.find({}).sort("fechaIngreso");

        if (!reparaciones) {
            res.status(400).json({
                ok: false,
                err: "Reparaciones no encontradas"
            });
        }

        res.status(200).json(reparaciones);
    },

    async reparacionCreate(req, res) {
        let { id } = req.params;

        let {
            aparato,
            marca,
            modelo,
            desperfecto,
            serie,
            fechaIngreso,
            fechaEntrega,
            presupuesto,
            importe,
            observacion,
            estado
        } = req.body;

        let reparacion = new Reparacion({
            aparato,
            marca,
            modelo,
            desperfecto,
            serie,
            fechaIngreso,
            fechaEntrega,
            presupuesto,
            importe,
            observacion,
            estado,
            cliente: id
        });

        let cliente = await Cliente.findById(id);

        if (!cliente.reparaciones) {
            cliente.reparaciones = [];

            cliente.reparaciones.push(reparacion);
        } else {
            cliente.reparaciones.push(reparacion);
        }

        cliente.save();

        reparacion.save((err, reparacionDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!reparacionDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El ID es incorrecto"
                    }
                });
            }

            res.json({
                ok: true,
                reparacion: reparacionDB
            });
        });
    },

    getReparacionById(req, res) {
        let id = req.params.id;

        Reparacion.findById(id, (err, reparacionDB) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!reparacionDB) {
                res.status(500).json({
                    ok: false,
                    err: {
                        message: "El ID no es correcto"
                    }
                });
            }

            res.json({
                ok: true,
                reparacion: reparacionDB
            });
        });
    },

    async updateReparacionById(req, res) {
        // client ID
        let { id } = req.params;

        let reparacion = await Reparacion.findById(id);
        let {
            aparato,
            marca,
            modelo,
            desperfecto,
            serie,
            fechaIngreso,
            fechaEntrega,
            presupuesto,
            importe,
            observacion,
            estado
        } = req.body;

        reparacion.aparato = aparato;
        reparacion.marca = marca;
        reparacion.modelo = modelo;
        reparacion.desperfecto = desperfecto;
        reparacion.serie = serie;
        reparacion.fechaIngreso = fechaIngreso;
        reparacion.fechaEntrega = fechaEntrega;
        reparacion.presupuesto = presupuesto;
        reparacion.importe = importe;
        reparacion.observacion = observacion;
        reparacion.estado = estado;

        try {
            await reparacion.save();
            res.json({
                ok: true,
                reparacion
            });
        } catch (error) {
            res.json({
                ok: false,
                error
            });
        }
    },

    deleteReparacionById(req, res) {
        let { id } = req.params;

        Reparacion.findByIdAndRemove(id, (err, reparacionDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            if (!reparacionDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: "El ID no existe"
                    }
                });
            }

            res.json({
                ok: true,
                message: "Reparacion Borrada"
            });
        });
    }
};
