const express = require("express");
const hbs = require("express-handlebars");
const fs = require("fs");

const app = express();
app.use(express.urlencoded({extended: false}));

const port = 8080;

let arrayProductos = [
    {"titulo":"VW Gol","precio":2000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG"},
    {"titulo":"Jeep Compass","precio":5000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/7/7e/Jeep_Compass_%28MP%29_PHEV_Facelift_IMG_4979.jpg"},
    {"titulo":"Fiat 500","precio":3000000,"imagen":"https://upload.wikimedia.org/wikipedia/commons/b/b7/FIAT_500_Vintage_%2757_-_prz%C3%B3d_%28MSP15%29.JPG"}
];

let arrayProductosLength = () => {
    return arrayProductos.length > 0;
}

// Motor de plantilla HBS.
app.engine("hbs", hbs.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials"
}));

app.set("views", "./views");
app.set("view engine", "hbs");


app.listen(port, () => {
    console.log(`Escuchando al puerto ${port}`);
});

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.post("/", (request, response) => {
    const {title, price, img} = request.body;
    arrayProductos.push({titulo: title, precio: price, imagen: img});

    console.log(arrayProductos);

    response.status(200).redirect("/productos");
});

app.get("/productos", (request, response) => {
    response.render("index", {productos: arrayProductos, length: arrayProductosLength()});
});

app.post("/productos", (request, response) => {
    response.status(200).redirect("/");
});
