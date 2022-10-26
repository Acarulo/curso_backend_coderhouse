const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");

const {options} = require("./utils/config");

const knexProductos = require("knex")(options.mysql);
const knexMensajes = require("knex")(options.sqlite3);

const {Server: HttpServer} = require("http");
const {Server: IOServer} = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const PORT = 8080;

let arrayProductos;

(async() => {
    arrayProductos = await knexProductos.from("productos").select("*");
})();

app.use(express.static("sql_node/public"));

// Motor de plantilla HBS.
app.engine("hbs", hbs.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}));

app.set("views", "sql_node/views");
app.set("view engine", "hbs");

httpServer.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
});

io.on("connection", (client) => {
    console.log("Cliente conectado");
    client.emit("productos", arrayProductos);

    client.on("new-product", async (data) => {
        console.log("Nuevo producto");

        //arrayProductos.push(data);
        await knexProductos("productos").insert(data);
        arrayProductos = await knexProductos.from("productos").select("*");

        io.sockets.emit("productos", arrayProductos);
    });

    client.on("new-message", async (data) => {
        console.log("Nuevo mensaje");

        await knexMensajes("mensajes").insert(data);
        let arrayMessages = await knexMensajes.from("mensajes").select("*");
        
        io.sockets.emit("mensajes", arrayMessages);
    });
});

app.get("/", (request, response) => {
    response.render("index", {productos: arrayProductos, mensajes: arrayMessages});
});
