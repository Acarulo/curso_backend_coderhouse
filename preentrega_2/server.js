require("dotenv").config();

const express = require("express");
const fs = require("fs");
const {Producto, Carrito} = require("./clases.js");

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

const {Router} = express;
const routerProduct = Router();
const routerCart = Router();

const PORT = process.env.PORT;
const ADMINISTRADOR = (process.env.ADMINISTRADOR === "true");

let productoId = JSON.parse(fs.readFileSync("./preentrega_1/productos.json")).length;
let carritoId = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json")).length;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando desde puerto ${server.address().port}`);
});

server.on("error", err => console.log(`Error en servidor: ${err}`));

// Configuracion de router para productos.
routerProduct.get("/:id", (request, response) => {
    const {id} = request.params;

    const listaProductos = JSON.parse(fs.readFileSync("./preentrega_1/productos.json"));
    
    if(id == 0) {
        response.json(listaProductos);
    } else {
        response.json(listaProductos.find(item => item.id == id));
    }
});

routerProduct.post("/", (request, response) => {
    if (ADMINISTRADOR == true) {
        const {nombre, descripcion, codigo, foto, precio, stock} = request.body;

        const listaProductos = JSON.parse(fs.readFileSync("./preentrega_1/productos.json"));
        const id = productoId + 1;
        const timestamp = Date.now();

        const nuevoProducto = new Producto(id, timestamp, nombre, descripcion, codigo, foto, precio, stock);
        listaProductos.push(nuevoProducto);

        productoId += 1;

        fs.writeFileSync("./preentrega_1/productos.json", JSON.stringify(listaProductos));

        response.status(200).send("Producto agregado a listado");

    } else {
        response.json({error: -1, descripcion: "Método POST en ruta /api/productos/ no localizado"});
    }
});

routerProduct.put("/:id", (request, response) => {
    // Solo para admin.
    if (ADMINISTRADOR == true) {
        const {id} = request.params;
        const {nombre, descripcion, codigo, foto, precio, stock} = request.body;

        const listaProductos = JSON.parse(fs.readFileSync("./preentrega_1/productos.json"));

        const index = listaProductos.findIndex(item => item.id == id);
        console.log(index);

        listaProductos[index].timestamp = Date.now();
        listaProductos[index].nombre = nombre === undefined ? listaProductos[id].nombre : nombre;
        listaProductos[index].descripcion = descripcion === undefined ? listaProductos[id].descripcion : descripcion;
        listaProductos[index].codigo = codigo === undefined ? listaProductos[id].codigo : codigo;
        listaProductos[index].foto = foto === undefined ? listaProductos[id].foto : foto;
        listaProductos[index].precio = precio === undefined ? listaProductos[id].precio : precio;
        listaProductos[index].stock = stock === undefined ? listaProductos[id].stock : stock;

        fs.writeFileSync("./preentrega_1/productos.json", JSON.stringify(listaProductos));

        response.status(200).send(`Producto con id ${id} editado en el listado`);

    } else {
        response.json({error: -1, descripcion: "Método POST en ruta /api/productos/ no localizado"});
    }
});

routerProduct.delete("/:id", (request, response) => {
    // Solo para admin.
    if (ADMINISTRADOR == true) {
        const {id} = request.params;

        let listaProductos = JSON.parse(fs.readFileSync("./preentrega_1/productos.json"));
        listaProductos = listaProductos.filter(item => item.id != id);
        console.log(listaProductos);

        fs.writeFileSync("./preentrega_1/productos.json", JSON.stringify(listaProductos));

        response.status(200).send(`Producto con id ${id} eliminado del listado`);

    } else {
        response.json({error: -1, descripcion: "Método POST en ruta /api/productos/ no localizado"});
    }
});


// Configuracion de router para carrito.
routerCart.get("/:id/productos", (request, response) => {
    const {id} = request.params;

    let listaCarritos = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json"));

    const indexCarrito = listaCarritos.findIndex(item => item.id == id);
    let productos = listaCarritos[indexCarrito].productos;

    response.json(productos);
});

routerCart.post("/", (request, response) => {
    let listaCarritos = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json"));

    carritoId += 1;

    let carrito = new Carrito(carritoId, Date.now(), []);
    listaCarritos.push(carrito);

    fs.writeFileSync("./preentrega_1/carritos.json", JSON.stringify(listaCarritos));

    response.status(200).send(`Nuevo carrito con id ${carritoId} creado`);
});

routerCart.post("/:id/productos/:id_prod", (request, response) => {
    let listaCarritos = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json"));
    let listaProductos = JSON.parse(fs.readFileSync("./preentrega_1/productos.json"));

    const {id, id_prod} = request.params;
    console.log(id, id_prod);

    const indexCarrito = listaCarritos.findIndex(item => item.id == id);
    let producto = listaProductos.filter(item => item.id == id_prod);

    listaCarritos[indexCarrito].productos.push(producto[0]);

    fs.writeFileSync("./preentrega_1/carritos.json", JSON.stringify(listaCarritos));

    response.status(200).send(`Producto ${id_prod} agregado al carrito ${id}`); 
});

routerCart.delete("/:id", (request, response) => {
    const {id} = request.params;

    let listaCarritos = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json"));
    listaCarritos = listaCarritos.filter(item => item.id != id);

    fs.writeFileSync("./preentrega_1/carritos.json", JSON.stringify(listaCarritos));

    response.status(200).send(`Carrito con id ${id} eliminado del sistema`);
});

routerCart.delete("/:id/productos/:id_prod", (request, response) => {
    let listaCarritos = JSON.parse(fs.readFileSync("./preentrega_1/carritos.json"));

    const {id, id_prod} = request.params;

    const indexCarrito = listaCarritos.findIndex(item => item.id == id);

    listaCarritos[indexCarrito].productos = listaCarritos[indexCarrito].productos.filter(item => item.id != id_prod);

    fs.writeFileSync("./preentrega_1/carritos.json", JSON.stringify(listaCarritos));

    response.status(200).send(`Producto ${id_prod} eliminado del carrito ${id}`);
});


app.use("/api/productos", routerProduct);
app.use("/api/carrito", routerCart);