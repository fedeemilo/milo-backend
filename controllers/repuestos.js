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
    let {
      nombre,
      descripcion,
      cantidad,
      ubicacion,
      images,
      datasheet
    } = req.body;

    images = [];
    datasheet = [];

    if (req.files) {
      // handle images upload
      if (req.files.images) {
        for (let file of req.files.images) {
          let image = await cloudinary.v2.uploader.upload(file.path);
          images.push({
            url: image.secure_url,
            public_id: image.public_id
          });
        }
      }

      // handle datasheet's upload
      if (req.files.datasheet) {
        for (let file of req.files.datasheet) {
          let upload = await cloudinary.v2.uploader.upload(file.path);
          datasheet.push({
            url: upload.secure_url,
            public_id: upload.public_id
          });
        }
      }
    }

    let repuesto = new Repuesto({
      nombre,
      descripcion,
      cantidad,
      ubicacion,
      images,
      datasheet
    });

    repuesto.save((err, repuestoDB) => {
      console.log(err);

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
    let { id } = req.params;
    let repuesto = await Repuesto.findById(id);
    let { nombre, descripcion, ubicacion, cantidad } = req.body;

    console.log(req.body);

    // if there are images for deletion
    if (req.body.deleteImages && req.body.deleteImages.length) {
      if (req.body.deleteImages.length > 1) {
        req.body.deleteImages = req.body.deleteImages.split(",");
      } else {
        req.body.deleteImages = [].concat(req.body.deleteImages);
      }

      let deleteImages = req.body.deleteImages;

      for (const public_id of deleteImages) {
        await cloudinary.v2.uploader.destroy(public_id);

        for (const image of repuesto.images) {
          if (image.public_id === public_id) {
            let index = repuesto.images.indexOf(image);
            repuesto.images.splice(index, 1);
          }
        }
      }
    }

    // if there is a datasheet for deletion
    if (req.body.deleteDatasheet) {
      req.body.deleteDatasheet = [].concat(req.body.deleteDatasheet);

      let deleteDatasheet = req.body.deleteDatasheet;

      for (const public_id of deleteDatasheet) {
        await cloudinary.v2.uploader.destroy(public_id);

        for (const ds of repuesto.datasheet) {
          if (ds.public_id === public_id) {
            let index = repuesto.datasheet.indexOf(ds);
            repuesto.datasheet.splice(index, 1);
          }
        }
      }
    }

    // if there's new files to  upload
    if (req.files) {
      // check if there are new images
      if (req.files.images) {
        for (const file of req.files.images) {
          let image = await cloudinary.v2.uploader.upload(file.path);
          repuesto.images.push({
            url: image.secure_url,
            public_id: image.public_id
          });
        }
      }

      // check if there's a new datasheet
      if (req.files.datasheet) {
        if (!repuesto.datasheet.length) {
          repuesto.datasheet = [];
        }
        for (const file of req.files.datasheet) {
          let ds = await cloudinary.v2.uploader.upload(file.path);
          repuesto.datasheet.push({
            url: ds.secure_url,
            public_id: ds.public_id
          });
        }
      }
    }

    repuesto.nombre = nombre;
    repuesto.descripcion = descripcion;
    repuesto.ubicacion = ubicacion;
    repuesto.cantidad = cantidad;

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

  deleteRepuestoById(req, res) {
    let { id } = req.params;

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
