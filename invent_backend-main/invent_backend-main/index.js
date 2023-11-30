const express = require("express");
const { sequelize } = require("./models/db");
const cors = require("cors");
require("./models/asociations");
require("dotenv").config();

//Acceso a Express
const app = express();

//Middelwares
app.use(cors());

//Directorio Publico
app.use(express.static("public"));
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auths"));
app.use("/api/companies", require("./routes/companies"));
app.use("/api/shipments", require("./routes/shipments"));
app.use("/api/users", require("./routes/users"));

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);

    sequelize
        .authenticate()
        .then(() => {
            console.log("La conexión a la base de datos se ha establecido correctamente");
        })
        .catch((err) => {
            console.log("No se ha podido conectar a la base de datos:", err);
        });
});
