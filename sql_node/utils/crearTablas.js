const {options} = require("./config");

const knexProductos = require("knex")(options.mysql);
const knexMensajes = require("knex")(options.sqlite3);

// Tabla de productos en MariaDB
knexProductos.schema.createTable(
    "productos", table => {
        table.increments("id")
        table.string("marca")
        table.integer("precio"),
        table.string("imagen")
    })
    .then(() => console.log("Tabla de productos creada"))
    .catch(err => {
        console.log(err);
        throw err;
    })
    .finally(() => knexProductos.destroy());

// Agregamos los tres productos iniciales en la tabla Productos.
const arrayProductos = [
    {"marca":"VW Gol","precio":2000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG"},
    {"marca":"Jeep Compass","precio":5000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/7/7e/Jeep_Compass_%28MP%29_PHEV_Facelift_IMG_4979.jpg"},
    {"marca":"Fiat 500","precio":3000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/b/b7/FIAT_500_Vintage_%2757_-_prz%C3%B3d_%28MSP15%29.JPG"}
];

(async () => {
    await knexProductos("productos").insert(arrayProductos);
    knexProductos.destroy();
})();

// Tabla de mensajes en SQlite3
knexMensajes.schema.createTable(
    "mensajes", table => {
        table.increments("id")
        table.string("email")
        table.string("mensaje")
        table.timestamp("time")
    })
    .then(() => console.log("Tabla de mensajes creada"))
    .catch(err => {
        console.log(err);
        throw err;
    })
    .finally(() => knexMensajes.destroy());
