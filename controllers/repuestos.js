const Repuesto = require("../models/repuesto");
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "fede-milo",
  api_key: "811337271329754",
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = {
  async repuestosIndex(req, res) {
    let repuestos = await Repuesto.find({}).sort("nombre");

    if (!repuestos) {
      res.status(400).json({
        ok: false,
        err: "Repuestos no encontrados"
      });
    }

    res.status(200).json(repuestos);
  },

  async repuestoCreate(req, res) {
    let body = req.body;
    req.body.images = [];
    req.body.datasheet = [];

    if (req.files) {
      // handle images upload
      if (req.files.images) {
        for (let file of req.files.images) {
          let image = await cloudinary.v2.uploader.upload(file.path);
          req.body.images.push({
            url: image.secure_url,
            public_id: image.public_id
          });
        }
      }

      // handle datasheet's upload
      if (req.files.datasheet) {
        for (let file of req.files.datasheet) {
          let upload = await cloudinary.v2.uploader.upload(file.path);
          req.body.datasheet.push({
            url: upload.secure_url,
            public_id: upload.public_id
          });
        }
      }
    }

    let repuesto = new Repuesto({
      nombre: body.nombre,
      descripcion: body.descripcion,
      cantidad: body.cantidad,
      ubicacion: body.ubicacion,
      images: body.images,
      datasheet: body.datasheet
    });

    repuesto.save((err, repuestoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!repuestoDB) {
        return res.status(400).json({
          ok: false,
          err
        });
      }

      res.json({
        ok: true,
        repuesto: repuestoDB
      });
    });
  },

  getRepuestoById(req, res) {
    let id = req.params.id;

    Repuesto.findById(id, (err, repuestoDB) => {
      if (err) {
        res.status(500).json({
          ok: false,
          err
        });
      }

      if (!repuestoDB) {
        res.status(500).json({
          ok: false,
          err: {
            message: "El ID no es correcto"
          }
        });
      }

      res.json({
        ok: true,
        repuesto: repuestoDB
      });
    });
  },

  async updateRepuestoById(req, res) {
    let id = req.params.id;
    let body = req.body;
    req.body.images = [];
    req.body.datasheet = [];


    if (req.files) {
      // handle images upload
      if (req.files.images) {
        for (let file of req.files.images) {
          let image = await cloudinary.v2.uploader.upload(file.path);
          body.images.push({
            url: image.secure_url,
            public_id: image.public_id
          });
        }
      }

      // handle datasheet's upload
      if (req.files.datasheet) {
        for (let file of req.files.datasheet) {
          let upload = await cloudinary.v2.uploader.upload(file.path);
          body.datasheet.push({
            url: upload.secure_url,
            public_id: upload.public_id
          });
        }
      }
    }

    Repuesto.findByIdAndUpdate(
      id,
      body,
      { new: true },
      (err, repuestoDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          });
        }

        if (!repuestoDB) {
          return res.status(400).json({
            ok: false,
            err
          });
        }

        res.json({
          ok: true,
          repuesto: repuestoDB
        });
      }
    );
  },

  deleteRepuestoById(req, res) {
    let id = req.params.id;

    Repuesto.findByIdAndRemove(id, (err, repuestoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }

      if (!repuestoDB) {
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
