require("dotenv").config();
const express = require("express");
const sensor = require("node-dht-sensor");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/temperature", (req, res) => {
    sensor.read(22, 4, function (err, temperature, humidity) {
        temperature_f = temperature * (9 / 5) + 32;
        if (!err) {
            res.json({ temperature: temperature_f, humidity: humidity });
            //res.json({ temperature: temperature_f, humidity: humidity.toFixed(1) })
        } else {
            res.status(500).json({ error: err });
        }
    });
});

const port = process.env.PORT || 3005;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
