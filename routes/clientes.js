const express = require("express");
const router = express.Router();

const {
  clientesIndex,
  clienteCreate,
  getClienteById,
  updateClienteById,
  deleteClienteById
} = require("../controllers/clientes");

// =============================
// Mostrar todos los clientes
// =============================
router.get("/", clientesIndex);

// =============================
// Crear un cliente
// =============================

router.post("/", clienteCreate);

// =============================
// Obtener un cliente por ID
// =============================
router.get("/:id", getClienteById);

// =============================
// Actualizar cliente por ID
// =============================
router.put("/:id", updateClienteById);

// =============================
// Borrar un cliente por ID
// =============================
router.delete("/:id", deleteClienteById);



module.exports = router;
