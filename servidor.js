const express = require("express");
const Contenedor = require("./contenedor.js");

const app = express();
const port = 8080;
const productos = new Contenedor("productos.txt");

const getRandomInteger = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const server = app.listen(port, () => {
    console.log(`Servidor HTTP escuchando desde puerto ${server.address().port}`);
});

server.on("error", err => console.log(`Error en servidor: ${err}`));

app.get("/", (request, response) => {
    response.send("Bienvenido a este servidor");
});

app.get("/productos", async (request, response) => {
    response.send(await productos.getAll());
});

app.get("/productoRandom", async (request, response) => {
    let value = getRandomInteger(1, 3);
    response.send(await productos.getById(value));
});