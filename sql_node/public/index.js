const socket = io.connect();

console.log("Hello world");

function renderProductos(arrayProductos) {
    const listaProds = arrayProductos.map((elem, index) => {
        return(
            `<div>
                <strong>${elem.marca}</strong>
                <em>${elem.precio}</em>
                <img src=${elem.imagen} border="3" height="150" width="300"></img>
            </div>
        `)}).join(" ");
    document.getElementById("products").innerHTML = listaProds;
}

function renderMessages(arrayMessages) {
    const listaMsg = arrayMessages.map((elem, index) => {
        return(
            `<div>
                <strong>${elem.email}</strong>
                <em>${elem.time}</em>
                <p>${elem.mensaje}</p>
            </div>
        `)}).join(" ");
    document.getElementById("messagesList").innerHTML = listaMsg;
}

function addProduct(item) {
    const product = {
        marca: document.getElementById("producto").value,
        precio: document.getElementById("precio").value,
        imagen: document.getElementById("imagen").value
    }

    console.log(product.marca);
    console.log(product.precio);
    console.log(product.imagen);

    socket.emit("new-product", product);

    return false;
}

function addMessage(item) {
    let time = Date.now();
    time = new Date(time).toLocaleString();

    const message = {
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value,
        time: time
    }

    console.log(time);

    socket.emit("new-message", message);

    return false;
}

socket.on("productos", data => {
    renderProductos(data);
});

socket.on("mensajes", data => {
    renderMessages(data);
});

