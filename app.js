require("./config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const repuestosRoutes = require("./routes/repuestos");

app.use(cors());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

app.use("/repuestos", repuestosRoutes);

// Connect to database
mongoose.connect(
  process.env.URLDB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
  (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connection to database SUCCESFULLY");
    }
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
