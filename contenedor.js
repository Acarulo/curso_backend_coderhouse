const fs = require("fs");

module.exports = class Contenedor {

    constructor(archivo) {
        this.archivo = archivo;
        this.id = 1;
    }

    async save(objeto) {
        objeto.id = this.id;
        this.id += 1;

        try {
            const file = JSON.parse(await fs.promises.readFile(this.archivo));
            file.push(objeto);
            await fs.promises.writeFile(this.archivo, JSON.stringify(file));

            return objeto.id;

        } catch (err) {
            console.log("There was an error");
            objeto = [objeto];
            await fs.promises.writeFile(this.archivo, JSON.stringify(objeto), {flag: "wx"});

            return objeto[0].id;
        }
    }

    async getById(id) {
        try {
            const file = JSON.parse(await fs.promises.readFile(this.archivo));
            const elem = file.find(item => item.id == id);
            return elem;
 
        } catch (error) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.promises.readFile(this.archivo));

        } catch(error) {
            console.log(error);
        }
    }

    async deleteById(value) {
        try {
            const file = JSON.parse(await fs.promises.readFile(this.archivo));
            const filtered = file.filter((elem) => {return elem.id != value});
            await fs.promises.writeFile(this.archivo, JSON.stringify(filtered));

        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            let file = JSON.parse(await fs.promises.readFile(this.archivo));
            file = [];
            await fs.promises.writeFile(this.archivo, JSON.stringify(file));

        } catch (error) {
            console.log(error);
        }
    }
}

/*
const productos = new Contenedor("productos.txt");

const productoUno = {titulo: "VW Gol", precio: 2000000, imagen: "https://upload.wikimedia.org/wikipedia/commons/6/69/Volkswagen_Gol_Hatchback_--_Front.JPG"}
const productoDos = {titulo: "Jeep Compass", precio: 5000000, imagen: "https://es.wikipedia.org/wiki/Jeep_Compass#/media/Archivo:Jeep_Compass_(MP)_PHEV_Facelift_IMG_4979.jpg"};
const productoTres = {titulo: "Fiat 500", precio: 3000000, imagen: "https://es.wikipedia.org/wiki/Fiat_500_%282007%29#/media/Archivo:FIAT_500_Vintage_'57_-_prz%C3%B3d_(MSP15).JPG"};


async function main() {
    await productos.save(productoUno);
    await productos.save(productoDos);
    await productos.save(productoTres);
    
    console.log("New id is:", productos.id);

    console.log(await productos.getAll());
    console.log(await productos.getById(2));

    await productos.deleteById(1);
    console.log(await productos.getAll());

    await productos.deleteAll();
    console.log(await productos.getAll());
    
}

//main();
*/
