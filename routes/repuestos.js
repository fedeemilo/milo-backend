const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  repuestosIndex,
  repuestoCreate,
  getRepuestoById,
  updateRepuestoById,
  deleteRepuestoById
} = require("../controllers/repuestos");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  }
});

const upload = multer({ storage }).fields([
  { name: "datasheet", maxCount: 1 },
  { name: "images", maxCount: 5 }
]);

// =============================
// Mostrar todos los repuestos
// =============================
router.get("/", repuestosIndex);

// =============================
// Crear un repuesto
// =============================

router.post("/", upload, repuestoCreate);

// =============================
// Obtener un repuesto por ID
// =============================
router.get("/:id", getRepuestoById);

// =============================
// Actualizar repuesto por ID
// =============================
router.put("/:id", upload, updateRepuestoById);

// =============================
// Borrar un repuesto por ID
// =============================
router.delete("/:id", deleteRepuestoById);

module.exports = router;
