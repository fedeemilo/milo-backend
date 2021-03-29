const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
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
  { name: "datasheet", maxCount: 3 },
  { name: "images", maxCount: 3 },
]);

// =============================
// Mostrar todos los repuestos
// =============================
router.get("/", repuestosIndex);

// =============================
// Cargar un repuesto
// =============================

router.post("/", upload, repuestoCreate);

// =============================
// Mostrar un repuesto por ID
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
