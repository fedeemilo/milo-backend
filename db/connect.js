const mongoose = require("mongoose");

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
