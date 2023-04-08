require("dotenv").config();
const express = require("express");
const path = require("path");
const sensor = require("node-dht-sensor");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const reactBuild = path.join(__dirname, "../front-end", "dist");
console.log(reactBuild);
app.use(express.static(reactBuild));

app.get("/api/indoor", (req, res) => {
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

//dev testing
// app.get("/api/indoor", async (req, res) => {
//     try {
//         const url = "http://192.168.50.82:3000/temperature";
//         const response = await fetch(url);

//         const result = await response.json();
//         res.json({ data: result });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("could not get indoor data");
//     }
// });

app.get("/api/outdoor", async (req, res) => {
    try {
        const url = process.env.VITE_WEATHER_API_KEY;
        const response = await fetch(url);
        const result = await response.json();
        res.json({ data: result });
    } catch (error) {
        console.error(error);
        res.status(500).send("could not get outdoor data");
    }
});

app.get("*", async (req, res) => {
    res.sendFile(path.join(reactBuild, "index.html"));
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
