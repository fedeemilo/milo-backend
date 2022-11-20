const express = require("express");
const {
    reparacionesIndex,
    reparacionCreate,
    getReparacionById,
    updateReparacionById,
    deleteReparacionById
} = require("../controllers/reparaciones");
const router = express.Router();

// ===============================
// Mostrar todas las reparaciones
// ===============================
router.get("/", reparacionesIndex);

// ========================================
// Crear una reparación con ID del cliente
// ========================================
router.post("/:id", reparacionCreate);

// ==============================
// Obtener una reparación por ID
// ==============================
router.get("/:id", getReparacionById);

// ==========================
// Actualizar reparación ID
// ==========================
router.put("/:id", updateReparacionById);

// ==============================
// Borrar una reparación por ID
// ==============================
router.get("/:id", deleteReparacionById);

module.exports = router;
