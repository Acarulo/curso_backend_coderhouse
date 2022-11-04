const mongoose = require("mongoose");

const carritoCollection = "carrito";

const carritoSchema = new mongoose.Schema({
    productos: {type: Array}
});

export const carritos = mongoose.model(carritoCollection, carritoSchema);
