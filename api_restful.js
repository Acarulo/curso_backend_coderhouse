/* 
GET '/api/productos'
GET '/api/productos/:id'
POST '/api/productos'
PUT '/api/productos/:id'
DELETE '/api/productos/:id'
*/

const express = require("express");
const app = express();

const {Router} = express;
const router = Router();

const port = 8080;

let productos = [
    {"id": 1, "titulo":"VW Gol","precio":2000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG","id":1},
    {"id": 2, "titulo":"Jeep Compass","precio":5000000,"imagen":"https://es.wikipedia.org/wiki/Jeep_Compass#/media/Archivo:Jeep_Compass_(MP)_PHEV_Facelift_IMG_4979.jpg","id":2},
    {"id": 3, "titulo":"Fiat 500","precio":3000000,"imagen":"https://es.wikipedia.org/wiki/Fiat_500_%282007%29#/media/Archivo:FIAT_500_Vintage_'57_-_prz%C3%B3d_(MSP15).JPG","id":3}
];

let current_id = productos.length;

const server = app.listen(port, () => {
    console.log(`Servidor HTTP escuchando desde puerto ${server.address().port}`);
});

server.on("error", err => console.log(`Error en servidor: ${err}`));

// Configuracion de router.
router.get("/", (request, response) => {
    response.json(productos);
});

router.get("/:id", (request, response) => {
    const {id} = request.params;
    const producto = productos.find(elem => elem.id == id);

    if (producto === undefined) {
        response.json({error: "producto no encontrado"});
    } else {
        response.json(producto);
    }
});

router.post("/", (request, response) => {
    const {titulo, precio, imagen} = request.query;

    current_id += 1;
    const nuevoProducto = {id: current_id, titulo: titulo, precio: precio, imagen: imagen};

    productos.push(nuevoProducto);
    response.json(nuevoProducto);
});

router.put("/:id", (request, response) => {
    // Actualiza precio 10% mas alto.
    const {id} = request.params;
    const productoIndex = productos.findIndex(elem => elem.id == id);

    if(productoIndex === undefined) {
        response.json({error: "producto no encontrado"});
    } else {
        productos[productoIndex].precio *= 1.1;
        response.json({nuevoPrecio: productos[productoIndex].precio});
    }
});

router.delete("/:id", (request, response) => {
    const {id} = request.params;
    const producto = productos.find(elem => elem.id == id);

    if (producto === undefined) {
        response.json({error: "producto no encontrado"});
    } else {
        productos = productos.filter(item => item != producto);
        response.json(producto);
    }
});

app.get("/", (request, response) => {
    response.json({welcome: "Welcome to this server"});
});

app.use("/api/productos", router);
app.use(express.static(__dirname + "/public"));
