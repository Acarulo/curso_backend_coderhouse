const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");

const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;

let arrayProductos = [
    {"titulo":"VW Gol","precio":2000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG"},
    {"titulo":"Jeep Compass","precio":5000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/7/7e/Jeep_Compass_%28MP%29_PHEV_Facelift_IMG_4979.jpg"},
    {"titulo":"Fiat 500","precio":3000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/b/b7/FIAT_500_Vintage_%2757_-_prz%C3%B3d_%28MSP15%29.JPG"}
];

app.use(express.static("websockets/public"));

// Motor de plantilla HBS.
app.engine("hbs", hbs.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}));

app.set("views", "websockets/views");
app.set("view engine", "hbs");

httpServer.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});

io.on("connection", (client) => {
    console.log("Cliente conectado");
    client.emit("productos", arrayProductos);

    client.on("new-product", data => {
        console.log("Nuevo producto");

        arrayProductos.push(data);
        io.sockets.emit("productos", arrayProductos);
    });

    client.on("new-message", data => {
        console.log("Nuevo mensaje");

        let arrayMessages = JSON.parse(fs.readFileSync("websockets/messages.json"));

        arrayMessages.push(data);
        fs.writeFileSync("websockets/messages.json", JSON.stringify(arrayMessages));

        io.sockets.emit("mensajes", arrayMessages);
    });
});

app.get("/", (request, response) => {
    response.render("index", {productos: arrayProductos, mensajes: arrayMessages});
});
