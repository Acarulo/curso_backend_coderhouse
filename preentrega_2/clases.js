class Producto {
    constructor(id, timestamp, nombre, descripcion, codigo, foto, precio, stock) {
        this.id = id;
        this.timestamp = timestamp;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}

class Carrito {
    constructor(id, timestamp) {
        this.id = id;
        this.timestamp = timestamp;
        this.productos = [];
    }
}

module.exports.Producto = Producto;
module.exports.Carrito = Carrito;