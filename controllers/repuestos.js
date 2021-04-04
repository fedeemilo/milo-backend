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
    let repuesto = await Repuesto.findById(id);

    if (req.body.deleteImages && req.body.deleteImages.length) {
      if (req.body.deleteImages.length > 1) {
        req.body.deleteImages = req.body.deleteImages.split(",");
      } else {
        req.body.deleteImages = req.body.deleteImages.split("");
      }

      console.log(req.body.deleteImages);

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

    console.log(req.files);

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
        let ds = req.files.datasheet;
        let data = await cloudinary.v2.uploader.upload(ds.path);
        repuesto.datasheet.push({
          url: data.secure_url,
          public_id: data.public_id
        });
      }
    }

    repuesto.nombre = req.body.nombre;
    repuesto.descripcion = req.body.descripcion;
    repuesto.ubicacion = req.body.ubicacion;
    repuesto.cantidad = req.body.cantidad;

    try {
      await repuesto.save();
      res.json({
        ok: true,
        repuesto
      })
    } catch (error) {
      res.json({
        ok: false,
        error
      })
    }


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
