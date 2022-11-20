require("./config");
const express = require("express");
const app = express();
const cors = require("cors");

const repuestosRoutes = require("./routes/repuestos");
const clientesRoutes = require("./routes/clientes");
const reparacionesRoutes = require("./routes/reparaciones");

app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

app.use("/repuestos", repuestosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/reparaciones", reparacionesRoutes);

// Connect to database
require("./db/connect");

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
