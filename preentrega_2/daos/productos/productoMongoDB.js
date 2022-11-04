const mongoose = require("mongoose");

const productoCollection = "productos";

const ProductoSchema = new mongoose.Schema({
    nombre: {type: String},
    descripcion: {type: String},
    codigo: {type: String},
    foto: {type: String},
    precio: {type: Number},
    stock: {type: Number}
});

export const productos = mongoose.model(productoCollection, ProductoSchema);
