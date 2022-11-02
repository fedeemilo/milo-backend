require("dotenv").config();
// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 8000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// ============================
//  Base de Datos
// ============================
let urlDB;

if (process.env.NODE_ENV === "dev") {
    urlDB =
        "mongodb+srv://fedeemilo:Cl2SWJRPtHwxFPoE@cluster0.9zuxs.mongodb.net/milosoft?retryWrites=true&w=majority&authSource=admin";
} else {
    urlDB = process.env.MONGODB_URI;
}

process.env.URLDB = urlDB;
